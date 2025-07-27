import { schemaTask, batch, logger } from "@trigger.dev/sdk/v3";
import { z } from "zod";
import { UTApi } from "uploadthing/server";

import type { getScreenshotsTask } from "./get-screenshots.task";
import { generateHtmlTask } from "./generate-html.task";
import type { getMarkdownTask } from "./get-markdown.task";

import { redis } from "@/lib/redis";

const utapi = new UTApi();

export const processPdfTask = schemaTask({
  id: "process-pdf",
  schema: z.object({
    url: z.string(),
  }),
  run: async (payload, { ctx }) => {
    const { url } = payload;

    const results = await batch.triggerAndWait<
      typeof getScreenshotsTask | typeof getMarkdownTask
    >([
      {
        id: "get-screenshots",
        payload: { url },
        options: {
          tags: ctx.run.tags,
        },
      },
      {
        id: "get-markdown",
        payload: { url },
        options: {
          tags: ctx.run.tags,
        },
      },
    ]);

    let screenshots: {
      pageIndex: number;
      url: string;
    }[] = [];
    let markdown: {
      pageIndex: number;
      markdown: string;
    }[] = [];

    for (const result of results.runs) {
      if (result.ok) {
        if (result.taskIdentifier === "get-screenshots") {
          screenshots = result.output;
        } else if (result.taskIdentifier === "get-markdown") {
          markdown = result.output;
        }
      }
    }
    logger.log(JSON.stringify(screenshots, null, 2));
    logger.log(JSON.stringify(markdown, null, 2));

    if (screenshots.length !== markdown.length) {
      throw new Error(
        `Screenshots and markdown have different lengths: ${screenshots.length} !== ${markdown.length}`,
      );
    }

    const html = await generateHtmlTask.triggerAndWait(
      {
        pages: screenshots.map((screenshot) => ({
          pageIndex: screenshot.pageIndex,
          imageUrl: screenshot.url,
          markdown:
            markdown.find((m) => m.pageIndex === screenshot.pageIndex)
              ?.markdown || "",
        })),
      },
      {
        tags: ctx.run.tags,
      },
    );

    await utapi.deleteFiles(
      // biome-ignore lint/style/noNonNullAssertion: screenshot.url is not null
      screenshots.map((screenshot) => screenshot.url.split("/").pop()!),
    );

    if (html.ok) {
      await redis.set(ctx.run.tags[0], html.output);
    }

    return html;
  },
});
