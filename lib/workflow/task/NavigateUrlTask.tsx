import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { Link2Icon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";
export const NavigateUrlTask= {
    type:TaskType.NAVIGATE_URL,
    label:"Navigate URL",
    icon:(props)=>(
        <Link2Icon className="stroke-orange-400" {...props} />
    ),
    isEntryPoint:false,
    credits:1,
    inputs:[
        {
            name:"Web page",
            type:TaskParamType.BROWSER_INSTANCE,
            required:true,
        },
        {
            name:"URL",
            type:TaskParamType.STRING,
            required:true,
        }
    ] as const ,
    outputs:[
        {
            name:"Web page",
            type:TaskParamType.BROWSER_INSTANCE,
        },
    ] as const,
} satisfies WorkflowTask;