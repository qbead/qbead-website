import { json } from "@sveltejs/kit";

export const GET = async (request) => {
  const allLessons = import.meta.glob("/src/routes/lessons/*.md");
  const pages = await Promise.all(
    Object.entries(allLessons).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      return {
        metadata,
        path: path.replace("/src/routes", "").replace(".md", ""),
      };
    }),
  );
  return json(pages);
};
