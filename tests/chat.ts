import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { VectorDBQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChainTool } from "langchain/tools";
import * as fs from "fs";

async function main() {
  const model = new OpenAI({ temperature: 0 });

  // Load in the file you want to do question answering over
  const text = fs.readFileSync("file.txt", "utf8");

  // Split the text into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);

  // Create the vector store
  // const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());


  // Create the chain
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
  const input = "What did graham do growing up?";
  const result = await executor.call({ input });
  console.log(result.output);
}
main();