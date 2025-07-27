import { redis } from "@/lib/redis";

export default async function ViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const html = (await redis.get(id)) as string;

  return (
    <iframe
      srcDoc={html}
      title="HTML Viewer"
      style={{
        width: "100%",
        minHeight: "100vh",
        border: "none",
        display: "block",
      }}
    />
  );
}
