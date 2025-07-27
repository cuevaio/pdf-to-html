"use client";

import { Link, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster, toast } from "sonner";
import { triggerProcessPdfTaskAction } from "@/actions/trigger-process-pdf-task.action";
import { PDFUpload } from "@/components/pdf-upload";

export default function Home() {
  const [inputMode, setInputMode] = React.useState<"url" | "upload">("url");
  const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string>("");

  const [state, formAction, isPending] = React.useActionState(
    triggerProcessPdfTaskAction,
    {
      input: {
        url: "",
      },
      output: {
        success: false,
        error: "",
      },
    },
  );

  const router = useRouter();

  React.useEffect(() => {
    if (state.output.success) {
      router.push(
        `/pdf/${state.output.data.id}?publicAccessToken=${state.output.data.publicAccessToken}`,
      );
    }
  }, [state, router]);

  React.useEffect(() => {
    if (state.output.success === false && state.output.error) {
      toast.error(state.output.error);
    }
  }, [state]);

  const handleUploadComplete = (url: string) => {
    setUploadedFileUrl(url);
    toast.success("PDF uploaded successfully! Click 'Convert PDF' to process.");
  };

  const isProcessing =
    isPending || (inputMode === "upload" && !uploadedFileUrl);

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-background text-foreground font-mono">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-16">
              <p className="text-lg opacity-80 font-sans">
                Convert PDF documents to clean HTML
              </p>
            </div>

            {/* Input Mode Toggle */}
            <div className="mb-8">
              <div className="flex border-2 border-foreground">
                <button
                  type="button"
                  onClick={() => setInputMode("url")}
                  className={`flex-1 py-3 px-4 font-bold text-sm tracking-wide uppercase transition-colors ${
                    inputMode === "url"
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-foreground/10"
                  }`}
                >
                  <Link className="w-4 h-4 inline mr-2" />
                  PDF URL
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("upload")}
                  className={`flex-1 py-3 px-4 font-bold text-sm tracking-wide uppercase transition-colors ${
                    inputMode === "upload"
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-foreground/10"
                  }`}
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload File
                </button>
              </div>
            </div>

            {/* Main Form */}
            <div className="border-2 border-foreground bg-background shadow-[8px_8px_0px_0px] shadow-foreground/20">
              <div className="p-8">
                <form action={formAction} className="space-y-6">
                  {inputMode === "url" ? (
                    <div>
                      <label
                        htmlFor="pdf-url"
                        className="block text-sm font-bold mb-3 tracking-wide uppercase"
                      >
                        PDF URL
                      </label>
                      <input
                        id="pdf-url"
                        type="url"
                        name="url"
                        placeholder="https://example.com/document.pdf"
                        className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground font-mono text-lg focus:outline-none focus:ring-0 focus:border-foreground placeholder:text-foreground/50"
                        disabled={isPending}
                        required
                      />
                    </div>
                  ) : (
                    <div>
                      <PDFUpload
                        onUploadComplete={handleUploadComplete}
                        disabled={isPending}
                      />
                      {uploadedFileUrl && (
                        <p className="mt-2 text-xs text-foreground/60 font-mono">
                          ✓ File uploaded successfully
                        </p>
                      )}
                      <input type="hidden" name="url" value={uploadedFileUrl} />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 border-2 border-foreground bg-foreground text-background font-bold text-lg tracking-wide uppercase transition-all duration-200 hover:bg-background hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-foreground disabled:hover:text-background"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-pulse">●</span>
                        Processing...
                        <span className="animate-pulse">●</span>
                      </span>
                    ) : inputMode === "upload" && !uploadedFileUrl ? (
                      "Upload PDF First"
                    ) : (
                      "Convert PDF"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-12 text-center">
              <div className="inline-block border border-foreground/30 px-4 py-2">
                <p className="text-sm opacity-60 font-sans">
                  {inputMode === "url"
                    ? "Supports public PDF URLs • Max 32MB"
                    : "Upload PDF files • Max 32MB"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
