import { getAppUrl } from "@/lib/helper/url";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
export async function GET(req: Request) {
  if (process.env.VERCEL && process.env.NEXT_PHASE === "phase-production-build") {
    return new Response("Build-time call blocked", { status: 403 });
  }

  const now = new Date();
  const workflows = await prisma.workflow.findMany({
    select: { id: true },
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: { not: null },
      nextRunAt: { lte: now },
    }
  });

  for (const workflow of workflows) {
    await triggerWorkflow(workflow.id);
  }

  return Response.json({ workflowsToRun: workflows.length }, { status: 200 });
}


async function  triggerWorkflow(workflowId: string) {
    const triggerApiUrl = getAppUrl(`api/workflows/execute?workflowId=${workflowId}`);

  
    return fetch(triggerApiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.API_SECRET}`,
        "Content-Type": "application/json"
      },
      cache: "no-cache",
    })
    .then(response => {
      if (!response.ok) {
        console.error(`Error response: ${response.status} ${response.statusText}`);
        return response.text().then(text => {
          console.error("Response body:", text);
          throw new Error(`Request failed with status ${response.status}`);
        });
      }
      console.log(`Successfully triggered workflow: ${workflowId}`);
      return response;
    })
    .catch(error => {
      console.error(`Error triggering workflow with id ${workflowId}:`, error.message);
      throw error;
    });
  }