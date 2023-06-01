import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

async function main(){
  const model = new OpenAI({ streaming: true });
  const memory = new BufferMemory();
  const chain = new ConversationChain({ llm: model, memory: memory });
  const res1 = await chain.call({ input: "Hi! I'm Jim." });
  console.log(res1);
  const res2 = await chain.call({ input: "What's my name?" });
  console.log(res2);
}

main()