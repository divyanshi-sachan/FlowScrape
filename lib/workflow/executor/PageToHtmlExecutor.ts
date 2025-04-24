import {  ExecutionEnvironment } from "@/types/executor";
import { PagetoHtmlTask } from "../task/PagetoHtml";
export async function PageToHtmlExecutor(environment:ExecutionEnvironment<typeof  PagetoHtmlTask>):Promise<boolean>{
    try{
        const html = await environment.getPage()!.content();
        environment.setOutput("Html",html);
        return true;
    }catch(error:any){
        environment.log.error(error.message);
        return false;
    }
}