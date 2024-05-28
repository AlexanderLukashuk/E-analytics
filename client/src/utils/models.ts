import { GPT_MODEL } from "../openai/constants.ts";
import { promptTemplate, promptGPT35TurboTemplate } from "../openai/template.ts";

export const getPromptModel = (model: string) => {
  let promptModel = "";
  switch (model) {
    case GPT_MODEL.GPT_35_TURBO:
      promptModel = promptGPT35TurboTemplate;
      break;
    default:
      promptModel = promptTemplate;
  };
  return promptModel;
};