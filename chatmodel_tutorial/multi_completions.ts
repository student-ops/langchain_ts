import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

const chat = new ChatOpenAI({ temperature: 0 });

async function main() {
  const responseC = await chat.generate([
    [
      new SystemChatMessage(
        "You are a helpful assistant that translates English to French."
      ),
      new HumanChatMessage(
        "Translate this sentence from English to French. I love programming."
      ),
    ],
    [
      new SystemChatMessage(
        "You are a helpful assistant that translates English to French."
      ),
      new HumanChatMessage(
        "Translate this sentence from English to japanese. I love artificial intelligence."
      ),
    ],
  ]);
  
  responseC.generations.forEach((generation) => {
    console.log(generation[0].text)
  });
}

main();
