// import {  ExecutionEnvironment } from "@/types/executor";
// import { ExtractDataWithAiTask } from "../task/ExtractDataWithAi";
// import prisma from "@/lib/prisma";
// import OpenAi from "openai";
// import { GoogleGenerativeAI} from "@google/generative-ai";
// import { symmetricDecrypt } from "@/lib/encryption";
// export async function ExtractDataWithAiExecutor(environment:ExecutionEnvironment<typeof  ExtractDataWithAiTask>):Promise<boolean>{
//     try{
//         const credentials = environment.getInput("Credentials");
//         if(!credentials){
//             environment.log.error("input->credentials not defined");
//         }
//         const prompt = environment.getInput("Prompt");
//         if(!prompt){
//             environment.log.error("Input-> prompt not defined");
//         }
//         const content = environment.getInput("Content");
//         if(!content){
//             environment.log.error(" Input-> Content not defined")
//         }
//         const credential = await prisma.credential.findUnique({
//             where:{id:credentials},
//         });
//         if(!credential){
//             environment.log.error("credential not found");
//             return false;
//         }
//         const plainCredentialValue = symmetricDecrypt(credential.value);
//         if(!plainCredentialValue){
//             environment.log.error("cannot decrypt credential")
//             return false;
//         }
//         const openai = new OpenAi({
//             apiKey:plainCredentialValue,
//         });
//         const response = await openai.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages: [
//               {
//                 role: "system",
//                 content: `You are a webscraper helper that extracts data from html or text.
//           You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract.
//           The response should be only the extracted data as a JSON array or object, without any additional words or explanation.
//           Analyse the input carefully and extract data precisely based on the prompt.
//           If no data is found, return an empty JSON array.
//           Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text.`,
//               },
//               {
//                 role:"user",
//                 content:content,
//               },
//               {role:"user",content:prompt}
//             ],
//             temperature:1,
//           });
//           environment.log.info(`Prompt tokens : ${response.usage?.prompt_tokens}`)
//           environment.log.info(`Completetion  tokens : ${response.usage?.completion_tokens}`)
//           const result = response.choices[0].message?.content;
//           if(!result){
//             environment.log.error("Empty response from ai");
//             return false;
//           }
//           environment.setOutput("Extracted data",result);

//         return true;
//     }catch(error:any){
//         environment.log.error(error.message);
//         return false;
//     }
// }
import { ExecutionEnvironment } from "@/types/executor";
import { ExtractDataWithAiTask } from "../task/ExtractDataWithAi";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function ExtractDataWithAiExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("input->credentials not defined");
      return false;
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("Input-> prompt not defined");
      return false;
    }

    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("Input-> content not defined");
      return false;
    }

    const credential = await prisma.credential.findUnique({
      where: { id: credentials },
    });

    if (!credential) {
      environment.log.error("credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    console.log("@PLAIN",plainCredentialValue);
    if (!plainCredentialValue) {
      environment.log.error("cannot decrypt credential");
      return false;
    }
    const genAI = new GoogleGenerativeAI(plainCredentialValue);
    const model = genAI.getGenerativeModel({ model:"gemini-1.5-flash"});
    const response = await model.generateContent([
        { text: `You are a webscraper helper that extracts data from HTML or text.
      You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract.
      The response should be only the extracted data as a JSON array or object, without any additional words or explanation.
      If no data is found, return an empty JSON array.
      Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text.` },
        { text: content },
        { text: prompt }
      ]);
    const result = response.response.text();
    const cleanedJson = result.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1");
    console.log("a",cleanedJson);
    const parsed = JSON.parse(cleanedJson);
    if (!result) {
      environment.log.error("Empty response from Gemini");
      return false;
    }
    environment.setOutput("Extracted data", cleanedJson);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
