import prisma from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { timingSafeEqual } from "crypto";
import parser from "cron-parser";
function isValidSecret(secret:string){
    const API_SECRET = process.env.API_SECRET;
    if(!API_SECRET) return false;
    try{
        return timingSafeEqual(Buffer.from(secret),Buffer.from(API_SECRET))
    }
    catch(error){
        return false;
    }
}

export async function GET(request:Request){
    const {userId} = await auth()
    console.log(userId);
    if(!userId){
        return Response.json({error:"Unauthenticated"})
    }

    const {searchParams} = new URL(request.url);
    const workflowId = searchParams.get("workflowId");
    if(!workflowId){
        return Response.json({error:"Bad request"},{status:400});
    }
    const workflow = await prisma.workflow.findUnique({
        where:{id:workflowId},
    })
    if(!workflow){
        return Response.json({error:"Bad request"},{status:400});
    }
    const executionPlan = JSON.parse(workflow.executionPlan!) as WorkflowExecutionPlan;
    if(!executionPlan){
        return  Response.json({error:"Bad request"},{status:400});
    }
    try{
        const cron = parser.parse(workflow.cron!);
        const nextRun = cron.next().toDate();
        const execution = await prisma.workflowExecution.create({
            data:{
                workflowId,
                userId:workflow.userId,
                definition:workflow.definition,
                status:WorkflowExecutionStatus.PENDING,
                startedAt: new Date(),
                trigger: WorkflowExecutionTrigger.CRON,
                 phases:{
                                create:executionPlan.flatMap((phase)=>{
                                    return phase.nodes.flatMap((node)=>{
                                        return{
                                            userId:workflow.userId,
                                            status: ExecutionPhaseStatus.CREATED,
                                            number: phase.phase,
                                            node: JSON.stringify(node),
                                            name:TaskRegistry[node.data.type].label,
                                        };
                                    });
                                }),
                            },
            }
        })
        await ExecuteWorkflow(execution.id,nextRun);
        return new Response(null,{status:200})
    }catch(error){
        return  Response.json({error:"Internal server error"},{status:500});
    }

}