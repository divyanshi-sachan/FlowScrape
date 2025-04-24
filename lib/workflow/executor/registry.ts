import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { ExecutionEnvironment } from "@/types/executor";
import { WorkflowTask } from "@/types/workflow";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor } from "./ClickElementExecutor";
import { WaitForElementExecutor } from "./WaitForElementExecutor";
import { DeliverViaWebhookExecutor } from "./DeliverViaWebhookExecutor";
import { ExtractDataWithAiExecutor } from "./ExtractDataWithAiExecutor";
import { ReadPropertiesFromJSONExecutor } from "./ReadPropertyFromJSON";
import { AddPropertyToJSONExecutor } from "./AddPropertyToJSON";
import { HtmlToCodeExecutor } from "./HtmlToCodeExecutor";
import { NavigateUrlExecutor } from "./NavigateUrlExecutor";
import { ScrollElementExecutor } from "./ScrollElement";
type ExecutorFn<T extends WorkflowTask> = (environment:ExecutionEnvironment<T>) => Promise<boolean>;
type Registrytype = {
    [K in TaskType] : ExecutorFn<WorkflowTask & {type:K}>;
}
export const ExecutorRegistry : Registrytype = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
    FILL_INPUT:FillInputExecutor,
    CLICK_ELEMENT:ClickElementExecutor,
    WAIT_FOR_ELEMENT:WaitForElementExecutor,
    DELIVER_VIA_WEBHOOK:DeliverViaWebhookExecutor,
    EXTRACT_DATA_WITH_AI:ExtractDataWithAiExecutor,
    READ_PROPERTY_FROM_JSON:ReadPropertiesFromJSONExecutor,
    ADD_PROPERTY_TO_JSON:AddPropertyToJSONExecutor,
    HTML_TO_CODE:HtmlToCodeExecutor,
    NAVIGATE_URL:NavigateUrlExecutor,
    SCROLL_ELEMENT:ScrollElementExecutor,
};