import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // PDF uploader for document processing
  pdfUploader: f({
    "application/pdf": {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // This code runs on your server before upload
      // For now, we'll allow all uploads - you can add auth later

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { uploadedAt: new Date().toISOString() };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for file:", file.name);
      console.log("file url", file.ufsUrl);

      // Return data to the client
      return {
        url: file.ufsUrl,
        uploadedAt: metadata.uploadedAt,
        name: file.name,
        size: file.size,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
