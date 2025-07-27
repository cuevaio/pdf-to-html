import { Mistral } from "@mistralai/mistralai";
import { schemaTask } from "@trigger.dev/sdk/v3";
import { z } from "zod";

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

export const getMarkdownTask = schemaTask({
  id: "get-markdown",
  schema: z.object({
    url: z.string(),
  }),
  run: async (payload: { url: string }) => {
    const { url } = payload;

    const resp = await mistral.ocr.process({
      model: "mistral-ocr-latest",
      document: {
        type: "document_url",
        documentUrl: url,
      },
      includeImageBase64: false,
    });

    return resp.pages.map((page) => ({
      pageIndex: page.index,
      markdown: page.markdown,
    }));
  },
});
