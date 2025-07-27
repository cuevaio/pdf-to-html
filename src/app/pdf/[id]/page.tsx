"use client";

import type { generateHtmlTask } from "@/trigger/generate-html.task";
import type { getMarkdownTask } from "@/trigger/get-markdown.task";
import type { getScreenshotsTask } from "@/trigger/get-screenshots.task";
import type { processPdfTask } from "@/trigger/process-pdf.task";
import {
  useRealtimeRunsWithTag,
  useRealtimeRunWithStreams,
} from "@trigger.dev/react-hooks";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Page() {
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();

  console.log(searchParams);
  console.log(params);

  const { runs } = useRealtimeRunsWithTag<
    | typeof processPdfTask
    | typeof getMarkdownTask
    | typeof getScreenshotsTask
    | typeof generateHtmlTask
  >(params.id, {
    accessToken: searchParams.get("publicAccessToken") ?? "",
  });

  // Find the original PDF URL from the process-pdf task
  const processPdfRun = runs.find(
    (run) => run.taskIdentifier === "process-pdf",
  );
  const pdfUrl = processPdfRun?.payload?.url || "";

  // Find the HTML generation run
  const htmlRun = runs.find((run) => run.taskIdentifier === "generate-html");

  // Show loading state if no runs yet
  if (runs.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)] bg-background text-foreground">
        <div className="border-2 border-foreground px-6 py-3 font-mono">
          <span className="animate-pulse">●</span> Loading PDF processing...{" "}
          <span className="animate-pulse">●</span>
        </div>
      </div>
    );
  }

  // Show processing status if HTML generation hasn't started yet
  if (!htmlRun) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-background text-foreground p-8">
        <div className="max-w-4xl mx-auto">
          <div className="border-2 border-foreground px-4 py-2 mb-8 inline-block">
            <h1 className="text-xl font-bold font-mono tracking-wider">
              PROCESSING PDF
            </h1>
          </div>
          <div className="space-y-4">
            {runs.map((run) => (
              <div
                key={run.id}
                className="flex items-center gap-4 p-4 border-2 border-foreground bg-background"
              >
                <span className="font-mono text-sm border border-foreground px-2 py-1 uppercase tracking-wide">
                  {run.taskIdentifier}
                </span>
                <span
                  className={`px-3 py-1 border border-foreground font-mono text-sm uppercase tracking-wide ${
                    run.status === "EXECUTING" || run.status === "QUEUED"
                      ? "bg-foreground text-background"
                      : run.status === "FAILED" ||
                          run.status === "CRASHED" ||
                          run.status === "CANCELED"
                        ? "bg-background text-foreground"
                        : "bg-muted text-foreground"
                  }`}
                >
                  {run.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <div className="h-[calc(100vh-5rem)] flex overflow-hidden">
        {/* PDF Viewer */}
        <div className="w-1/2 border-r-4 border-foreground overflow-hidden">
          <div className="h-full overflow-hidden">
            {pdfUrl ? (
              <PDFViewer url={pdfUrl} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="border-2 border-foreground px-4 py-2 font-mono">
                  PDF URL not available
                </div>
              </div>
            )}
          </div>
        </div>

        {/* HTML Viewer */}
        <div className="w-1/2 overflow-hidden">
          <div className="h-full overflow-hidden">
            <HTMLViewer
              run_id={htmlRun.id}
              publicAccessToken={searchParams.get("publicAccessToken") ?? ""}
              pdfId={params.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PDFViewer({ url }: { url: string }) {
  return (
    <iframe
      src={url}
      className="w-full h-full border-0"
      title="Original PDF"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}

function HTMLViewer({
  run_id,
  publicAccessToken,
  pdfId,
}: {
  run_id: string;
  publicAccessToken: string;
  pdfId: string;
}) {
  const { streams, run } = useRealtimeRunWithStreams<typeof generateHtmlTask>(
    run_id,
    {
      accessToken: publicAccessToken,
    },
  );

  const htmlContent = run?.output ?? (streams.openai?.join("") || "");

  // Show loading state only when no content at all
  if (!htmlContent) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <div className="border-2 border-foreground px-4 py-2 font-mono">
          <span className="animate-pulse">●</span> Loading HTML content...{" "}
          <span className="animate-pulse">●</span>
        </div>
      </div>
    );
  }

    return (
    <div className="w-full h-full bg-background text-foreground flex flex-col overflow-hidden">
      <Tabs defaultValue="rendered" className="flex flex-col h-full overflow-hidden">
        <div className="border-b-2 border-foreground p-2 flex-shrink-0">
          <TabsList className="bg-background border-2 border-foreground">
            <TabsTrigger 
              value="rendered" 
              className="data-[state=active]:bg-foreground data-[state=active]:text-background border border-foreground mr-1 font-mono text-xs uppercase tracking-wider"
            >
              RENDERED
            </TabsTrigger>
            <TabsTrigger 
              value="code" 
              className="data-[state=active]:bg-foreground data-[state=active]:text-background border border-foreground font-mono text-xs uppercase tracking-wider"
            >
              CODE
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="rendered" className="flex-1 m-0 p-0 overflow-hidden relative">
          {htmlContent && (
            <div className="absolute top-2 right-2 z-10">
              <Link
                href={`/view/${pdfId}`}
                className="px-3 py-1 bg-white border-2 border-black text-black font-mono text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                VIEW FULL PAGE
              </Link>
            </div>
          )}
          <div className="w-full h-full overflow-auto bg-white">
            <iframe
              key={run?.output ? "final" : "streaming"} // Only reload when switching from streaming to final
              srcDoc={htmlContent}
              className="w-full border-0 block"
              title="Generated HTML Content"
              sandbox="allow-scripts allow-same-origin"
              style={{
                width: "100%",
                height: "200vh", // Large height to ensure iframe shows full content
                minHeight: "100vh",
                border: "none",
                display: "block",
              }}
              onLoad={(e) => {
                // Auto-resize iframe to fit content
                const iframe = e.currentTarget;
                try {
                  const iframeDoc =
                    iframe.contentDocument || iframe.contentWindow?.document;
                  if (iframeDoc) {
                    const height = Math.max(
                      iframeDoc.body?.scrollHeight || 0,
                      iframeDoc.documentElement?.scrollHeight || 0,
                    );
                    if (height > 0) {
                      iframe.style.height = `${height}px`;
                    }
                  }
                } catch (error) {
                  // Ignore cross-origin errors
                  console.log("Could not auto-resize iframe:", error);
                }
              }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="flex-1 m-0 p-0 overflow-hidden">
          <div className="w-full h-full bg-background relative overflow-hidden">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(htmlContent).then(() => {
                  // Simple visual feedback - could be enhanced with a toast
                  const button = document.querySelector('.copy-button') as HTMLButtonElement;
                  if (button) {
                    const originalText = button.textContent;
                    button.textContent = 'COPIED!';
                    setTimeout(() => {
                      button.textContent = originalText;
                    }, 1000);
                  }
                }).catch((err) => {
                  console.error('Failed to copy to clipboard:', err);
                });
              }}
              className="copy-button absolute top-2 right-2 z-10 px-3 py-1 bg-background border-2 border-foreground text-foreground font-mono text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
            >
              COPY
            </button>
            <pre className="h-full overflow-auto p-4 font-mono text-sm border-2 border-foreground bg-background text-foreground whitespace-pre-wrap">
              {htmlContent}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
