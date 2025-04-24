import {  ExecutionEnvironment } from "@/types/executor";
import { PagetoHtmlTask } from "../task/PagetoHtml";
import { FillInputTask } from "../task/FillInput";
import { waitFor } from "@/lib/helper/waitfor";
export async function FillInputExecutor(environment:ExecutionEnvironment<typeof  FillInputTask>):Promise<boolean>{
    try{
        const selector = environment.getInput("Selector");
        if(!selector){
            environment.log.error("input->selector not defined");
        }
        const value = environment.getInput("Value");
        if(!value){
            environment.log.error("input->value not defined");
        }
        await environment.getPage()!.type(selector,value);
        return true;
    }catch(error:any){
        environment.log.error(error.message);
        return false;
    }
}