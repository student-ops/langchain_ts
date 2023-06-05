import { OpenAI } from "langchain/llms/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";

import * as fs from "fs";

async function run() {
  const loader = new GithubRepoLoader(
    "https://github.com/hwchase17/langchainjs",
    { branch: "main", recursive: false, unknown: "warn" }
  );
  const docs = await loader.load();
  return docs;
};

async function main() {
  const model = new OpenAI({ temperature: 0 });

  // Load in the file you want to do question answering over
  const text = fs.readFileSync("file.txt", "utf8");

  // Split the text into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  const github_res = await run();
  console.log(docs);
  console.log(github_res);

  // Create the vector store
  // const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  // // Create the chain
  // const chain = VectorDBQAChain.fromLLM(model, vectorStore);

  // Use the chain as a tool in your agent
  // const chainTool = new ChainTool({
  //   name: "my-chain-tool",
  //   description: "My Chain Tool",
  //   returnDirect: false,
  //   chain: chain,
  // });
  // const tools = [chainTool];

  // const executor = await initializeAgentExecutorWithOptions(tools, model, {
  //   agentType: "zero-shot-react-description",
  // });

  // // Call the agent with your input
  // const input = "What did graham do growing up?";
  // const result = await executor.call({ input });
  // console.log(result.output);
}
main();