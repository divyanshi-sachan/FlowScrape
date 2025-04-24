import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { ArrowUp01Icon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";
export const ScrollElementTask= {
    type:TaskType.SCROLL_ELEMENT,
    label:"Scroll Element",
    icon:(props)=>(
        <ArrowUp01Icon className="stroke-orange-400" {...props} />
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
            name:"Selector",
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