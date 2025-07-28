import { logger, schemaTask } from "@trigger.dev/sdk/v3";
import { pdf } from "pdf-to-img";
import { UTApi, UTFile } from "uploadthing/server";
import { z } from "zod";

const utapi = new UTApi();

export const getScreenshotsTask = schemaTask({
  id: "get-screenshots",
  schema: z.object({
    url: z.string(),
  }),
  run: async (payload: { url: string }) => {
    const { url } = payload;
    const scale = 3;

    logger.log(`Downloading PDF from: ${url}`);

    // Download the PDF
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to download PDF: ${response.status} ${response.statusText}`,
      );
    }

    const pdfBuffer = await response.arrayBuffer();
    const pdfData = new Uint8Array(pdfBuffer);

    logger.log("Converting PDF to images...");

    // Convert PDF to images
    const document = await pdf(pdfData, { scale });

    // Validate page count - maximum 5 pages allowed
    if (document.length > 5) {
      throw new Error(
        `PDF has ${document.length} pages. Maximum of 5 pages allowed. Please use a shorter PDF document.`,
      );
    }

    logger.log(`PDF has ${document.length} pages (within the 5-page limit)`);

    let counter = 0;
    const filesToUpload: UTFile[] = [];

    // Prepare all images for upload
    for await (const image of document) {
      const filename = `page-${counter}.png`;
      const customId = `page-${counter}-${Date.now()}`;

      const file = new UTFile([image], filename, { customId });
      filesToUpload.push(file);

      logger.log(`Prepared: ${filename} for upload`);
      counter++;
    }

    logger.log(`\nUploading ${filesToUpload.length} images to UploadThing...`);

    // Upload all files to UploadThing
    const uploadResponse = await utapi.uploadFiles(filesToUpload);

    const files: {
      pageIndex: number;
      url: string;
    }[] = [];

    for (const file of uploadResponse) {
      const pageIndex = file.data?.customId?.split("-")[1];
      const url = file.data?.ufsUrl;
      if (pageIndex && url) {
        files.push({
          pageIndex: parseInt(pageIndex),
          url: url,
        });
      }
    }

    return files;
  },
});
