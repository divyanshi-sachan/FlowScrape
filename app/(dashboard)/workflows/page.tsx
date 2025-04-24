import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'
import { GetWorkFlowsForUser } from '@/actions/workflows/getWorkflowsForUser';
import { Alert,AlertDescription,AlertTitle } from '@/components/ui/alert';
import { AlertCircle, InboxIcon, Workflow } from 'lucide-react';
import CreateWorkflowDialog from './_components/CreateWorkflowDialog';
import WorkflowCard from './_components/WorkflowCard';
function page() {
  return (
    <div className='flex-1 flex flex-col h-full'>
        <div className='flex justify-between'>
            <div className='flex flex-col'>
                <h1 className='text-3xl font-bold ml-20'>Workflows</h1>
                <p className='text-muted-foreground ml-20'>Manage your workflows</p>
            </div>
            <CreateWorkflowDialog/>
        </div>
        <div className='h-full py-6'>
            <Suspense fallback= {<UserWorkFlowsSkeleton />}>
            <UserWorkFlows />
            </Suspense>
        </div>
        </div>
  )
}
function UserWorkFlowsSkeleton(){
    return (<div className='space-y-2'>
        {[1,2,3,4].map((i) => (
            <Skeleton key={i} className='h-32 w-full' />
        ))}
    </div>
    );
}
async function UserWorkFlows(){
    try {
        const workflows = await GetWorkFlowsForUser();
        console.log(workflows);
        if(workflows.length == 0){
            return <div className='flex flex-col gap-4 h-full items-center justiify-center'>
                <div className='rounded-full hg-accent w-20 h-20 flex items-center justify center'>
                    <InboxIcon size={40} className='stroke-primary' />
                </div>
                <div className='flex flex-col gap-1 text-center'>
                    <p className='font-bold'>No workflow created yet</p>
                    <p className='text-sm text-muted-foreground'>
                        Click the button below to create your first workflows
                    </p>
                </div>
                <CreateWorkflowDialog triggerText="Create your first workflow" />
    
            </div>
        }
        return(
            <div className='grid grid-cols-1 gap-4'>
                {workflows.map((workflow) => (
                    <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
                </div>
        )
    } catch (error) {
            return (
                <Alert variant={"destructive"}>
                <AlertCircle className='w-4 h-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                {(error as Error)?.message || "Something went wrong. Please try again later."}
                </AlertDescription>
            </Alert>
            )
    }
}
export default page

