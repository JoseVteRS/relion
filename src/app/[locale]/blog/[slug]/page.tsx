import markdownToHtml from "@/lib/markdown-to-html";
import { getAllPosts, getPostBySlug } from "@/lib/metadata-mdx";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import markdownStyles from "../markdown-styles.module.css";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <div>
        <article className="mb-32">
          <header>
            <h1>{post.title}</h1>
          </header>
          <div className="max-w-2xl mx-auto">
            <div
              className={markdownStyles["markdown"]}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </article>
      </div>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

// export async function generateMetadata(props: Params): Promise<Metadata> {
//   const params = await props.params;
//   const post = getPostBySlug(params.slug);

//   if (!post) {
//     return notFound();
//   }

//   const title = `${post.title} | Next.js Blog Example with`;

//   return {
//     title,
//     openGraph: {
//       title,
//       images: [post.ogImage.url],
//     },
//   };
// }

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
