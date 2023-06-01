import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";


const chat = new ChatOpenAI({ temperature: 0 });

async function main() {
  const response = await chat.call([
    new HumanChatMessage(
      "Translate this sentence from English to japanese. I love programming."
    ),
  ]);
  console.log(response);
}

main();
