import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { VectorDBQAChain } from "langchain/chains";
import { ChainTool } from "langchain/tools";
import * as fs from "fs";


export const run = async () => {
  const loader = new GithubRepoLoader(
    "https://github.com/student-ops/testdir-",
    { branch: "main", recursive: false, unknown: "warn" }
  );
  const docs = await loader.load();
  console.log({ docs });
  return docs;
};

async function main() {
  const docs = await run();
  console.log(docs[0]);
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings()); 
  await vectorStore.save("data");
  const chain = VectorDBQAChain.fromLLM(model, vectorStore);

  // Use the chain as a tool in your agent
  const chainTool = new ChainTool({
    name: "my-chain-tool",
    description: "My Chain Tool",
    returnDirect: false,
    chain: chain,
  });
  const tools = [chainTool];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
  });

  // Call the agent with your input
  const input = "describe about the branch";
  const result = await executor.call({ input });
  console.log(result.output);
}

main()