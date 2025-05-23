import { TaskType } from "@/types/task";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PagetoHtmlTask } from "./PagetoHtml";
import { WorkflowTask } from "@/types/workflow";
import { FillInputTask } from "./FillInput";
import { ClickElementTask } from "./ClickElement";
import { WaitForElementTask } from "./WaitForElement";
import { DeliverViaWebhookTask } from "./DeliverViaWebhook";
import { ExtractDataWithAiTask } from "./ExtractDataWithAi";
import { ReadPropertyFromJSONTask } from "./ReadPropertyFromJson";
import { AddPropertyToJSONTask } from "./AddPropertyToJSON";
import { HtmlToCodeTask } from "./HtmlToCode";
import { NavigateUrlTask } from "./NavigateUrlTask";
import { ScrollElementTask } from "./ScrollElement";
type Registry = {
    [K in TaskType] : WorkflowTask & {type : K}
}
export const TaskRegistry: Registry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML:PagetoHtmlTask,
    EXTRACT_TEXT_FROM_ELEMENT:ExtractTextFromElementTask,
    FILL_INPUT:FillInputTask,
    CLICK_ELEMENT:ClickElementTask,
    WAIT_FOR_ELEMENT:WaitForElementTask,
    DELIVER_VIA_WEBHOOK:DeliverViaWebhookTask,
    EXTRACT_DATA_WITH_AI:ExtractDataWithAiTask,
    READ_PROPERTY_FROM_JSON:ReadPropertyFromJSONTask,
    ADD_PROPERTY_TO_JSON:AddPropertyToJSONTask,
    HTML_TO_CODE:HtmlToCodeTask,
    NAVIGATE_URL:NavigateUrlTask,
    SCROLL_ELEMENT:ScrollElementTask,
}