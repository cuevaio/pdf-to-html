import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { schemaTask, logger, metadata } from "@trigger.dev/sdk/v3";
import { z } from "zod";
import { promises } from "node:fs";

export const generateHtmlTask = schemaTask({
	id: "generate-html",
	schema: z.object({
		pages: z.array(
			z.object({
				pageIndex: z.number(),
				imageUrl: z.string(),
				markdown: z.string(),
			}),
		),
	}),
	run: async (payload) => {
		const { pages } = payload;

		const systemPrompt = await promises.readFile(
			"src/prompts/generate-html.md",
			"utf-8",
		);

		logger.info(systemPrompt);

		const result = streamText({
			model: openai("gpt-4.1"),
			maxTokens: 32000,
			messages: [
				{
					role: "system",
					content: systemPrompt,
				},
				{
					role: "user",
					content: pages.flatMap((item) => [
						{
							type: "text",
							text: item.markdown,
						},
						{
							type: "image",
							image: item.imageUrl,
						},
					]),
				},
			],
		});

		const stream = await metadata.stream("openai", result.textStream);

		let text = "";

		for await (const chunk of stream) {
			text += chunk;
		}

		return text;
	},
});
