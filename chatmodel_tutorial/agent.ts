import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain, LLMChain } from "langchain/chains";
const chat = new ChatOpenAI({ temperature: 0 });
import {
  AgentActionOutputParser,
  AgentExecutor,
  LLMSingleActionAgent,
  ChatAgent
} from "langchain/agents";
import { SerpAPI, Tool } from "langchain/tools";
import { BufferMemory } from "langchain/memory";




async function main() {
 // Define the list of tools the agent can use
  // const tools = [
  //   new SerpAPI(process.env.SERPAPI_API_KEY, {
  //     location: "Austin,Texas,United States",
  //     hl: "en",
  //     gl: "us",
  //   }),
  // ];
  // // Create the agent from the chat model and the tools
  // const agent = ChatAgent.fromLLMAndTools(new ChatOpenAI(), tools);
  // // Create an executor, which calls to the agent until an answer is found
  // const executor = AgentExecutor.fromAgentAndTools({ agent, tools });

  // const responseG = await executor.run(
  //   "How many people live in canada as of 2023?"
  // );
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
  
  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    prompt: chatPrompt,
    llm: chat,
  });

  const responseH = await chain.call({
    input: "hi from London, how are you doing today",
  });
  
  console.log(responseH);
  const responseI = await chain.call({
    input: "Do you know where I am?",
  });
  
  console.log(responseI);
}

main()