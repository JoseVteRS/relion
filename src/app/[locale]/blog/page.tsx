import { getAllPosts } from "@/lib/metadata-mdx";
import Link from "next/link";

export default function BlogPage() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Blog Page</h1>
      {allPosts.map((post) => (
        <div key={post.slug} className="mb-6 p-4 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            <Link href={`/es/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="text-gray-700">{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
