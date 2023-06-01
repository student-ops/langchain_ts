import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";


const chat = new ChatOpenAI({ temperature: 0 });

async function main() {
  const translationPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "You are a helpful assistant that translates {input_language} to {output_language}."
    ),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
  ]);
  const chain = new LLMChain({
    prompt: translationPrompt,
    llm: chat,
  });
  console.log(chain)
  // const responseA = await chat.generatePrompt([
  //   await translationPrompt.formatPromptValue({
  //     input_language: "English",
  //     output_language: "French",
  //     text: "I love programming.",
  //   }),
  // ]);
  const responseB = await chain.call({
    input_language: "English",
    output_language: "French",
    text: "I love programming.",
  });
  
  console.log(responseB);
  // console.log(responseA.generations);
  // console.log(responseA.generations[0][0].text);
}

main()