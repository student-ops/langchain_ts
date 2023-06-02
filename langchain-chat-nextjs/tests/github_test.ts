import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
async function main() {
  const loader = new GithubRepoLoader(
    "https://github.com/hwchase17/langchainjs",
    { branch: "main", recursive: false, unknown: "warn" }
  );
  const docs = await loader.load();
  console.log(docs)
  
  // const model = new OpenAI({});
  // const memory = new BufferMemory({ memoryKey: "chat_history", returnMessages: true});
  // const chain = new ConversationChain({ llm: model, memory: memory });
  // const res1 = await chain.call({ input: "Hi! I'm a chatbot." });
  // console.log(res1);
  
  // const res2 = await chain.call({ input: "How can I help you?" });
  // console.log(res2);
}


main()
