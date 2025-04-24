import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, LucideProps } from "lucide-react";

export const HtmlToCodeTask = {
  type: TaskType.HTML_TO_CODE,
  label: "Convert HTML to Code using AI",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-green-500" {...props} />
  ),
  isEntryPoint: false,
  credits: 5,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      helperText: "HTML string extracted from the webpage",
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Generated Code",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
