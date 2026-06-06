import { inngest, gpt4omini } from "./inngest-client.js";

export const summarizeThenTranslate = inngest.createFunction(
  {
    id: "chai-summarize-then-translate",

    triggers: [{ event: "chai.summarize-then-translate" }],
  },

  async ({ event, step }) => {
    const sum = await step.ai.infer("summarize", {
      model: gpt4omini,
      body: {
        input: [
          {
            role: "user",
            content:
              "Summarize the following text in 1 line: " + event.data.text,
          },
        ],
      },
    });

    const summary = sum.output[0].content[0].text;

    const tr = await step.ai.infer("translate", {
      model: gpt4omini,
      body: {
        input: [
          {
            role: "user",
            content: `Translate the following text to Punjabi Gurmukhi: ${summary}`,
          },
        ],
      },
    });

    const translation = tr.output[0].content[0].text;

    return translation;
  },
);
