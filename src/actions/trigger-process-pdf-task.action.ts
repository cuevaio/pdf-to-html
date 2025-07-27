"use server";

import { z } from "zod";
import { processPdfTask } from "@/trigger/process-pdf.task";
import { nanoid } from "@/lib/nanoid";
import { auth } from "@trigger.dev/sdk/v3";

export type TriggerProcessPDFTaskActionState = {
  input: {
    url: string;
  };
  output:
    | { success: true; data: { id: string; publicAccessToken: string } }
    | { success: false; error?: string };
};

export async function triggerProcessPdfTaskAction(
  _prev: TriggerProcessPDFTaskActionState,
  formData: FormData,
): Promise<TriggerProcessPDFTaskActionState> {
  try {
    const rawUrl = formData.get("url") as string;

    const url = z.string().url().parse(rawUrl);
    const id = nanoid();

    await processPdfTask.trigger(
      {
        url,
      },
      { tags: [id] },
    );

    const publicAccessToken = await auth.createPublicToken({
      scopes: {
        read: {
          tags: [id],
        },
      },
    });

    return {
      input: {
        url,
      },
      output: {
        success: true,
        data: {
          id,
          publicAccessToken,
        },
      },
    };
  } catch (error) {
    return {
      input: {
        url: formData.get("url") as string,
      },
      output: {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}
