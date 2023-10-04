import { remark } from "remark";
import html from "remark-html";

export default async function Markdown(params: { data: string }) {
  const processedContent = await remark().use(html).process(params.data);

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
    />
  );
}
