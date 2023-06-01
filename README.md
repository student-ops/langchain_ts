# Note

ⓘ Note, if you are using Azure OpenAI make sure to also set the environment variables

> AZURE_OPENAI_API_INSTANCE_NAME, AZURE_OPENAI_API_DEPLOYMENT_NAME and AZURE_OPENAI_API_VERSION.

## 型情報

```
(alias) class ChatOpenAI
import ChatOpenAI
Wrapper around OpenAI large language models that use the Chat endpoint.

To use you should have the openai package installed, with the OPENAI_API_KEY environment variable set.

To use with Azure you should have the openai package installed, with the AZURE_OPENAI_API_KEY, AZURE_OPENAI_API_INSTANCE_NAME, AZURE_OPENAI_API_DEPLOYMENT_NAME and AZURE_OPENAI_API_VERSION environment variable set.

@remarks
Any parameters that are valid to be passed to * https://platform.openai.com/docs/api-reference/chat/create | * openai.createCompletion} can be passed through modelKwargs, even if not explicitly available on this class.

```

## Model + Prompt = LLMChain

This pattern of asking for the completion of a formatted prompt is quite common, so we introduce the next piece of the puzzle: LLMChain

## 概観

### Quickstart, using Chat Models

**注目ポイント**
modelに複数のメッセージを並列で入力できるっぽい。systemとuserを定義可能。