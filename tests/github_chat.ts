import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { VectorDBQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChainTool } from "langchain/tools";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";

import * as fs from "fs";

async function main() {
  const model = new OpenAI({ temperature: 0 });


  const loader = new GithubRepoLoader(
      "https://github.com/hwchase17/langchainjs",
      { branch: "main", recursive: false, unknown: "warn" }
    );
  const docs = await loader.load();

  // Create the vector store
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  await vectorStore.save("data");

  // Create the chain
  const chain = VectorDBQAChain.fromLLM(model, vectorStore);

  // Wrap the chain in a ChainTool object
  const chainTool = new ChainTool({
    name: "my-chain-tool",
    description: "My Chain Tool",
    returnDirect: false,
    chain: chain,
  });
  
  // Use the chain tool in your agent
  const tools = [chainTool];
  
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
  });
  
  console.log("Loaded agent.");
  
  const input = `describe about this branch`;
  
  console.log(`Executing with input "${input}"...`);
  
  const result = await executor.call({ input });
  
  console.log(`Got output ${result.output}`);
}
main();