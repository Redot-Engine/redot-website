import { getPostBySlug, getPosts } from "@/lib/blog";
import { ArticleSplash } from "@/components/blog/ArticleSplash";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { Post } from "@/sanity/schemaTypes/postType";
import { getLanguage } from "@/actions/language";

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post: Post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata(props: {
  readonly params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = await params.slug;
  const post = await getPostBySlug(slug, "en");

  if (!post || post.length === 0) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  const postData = post[0];

  return {
    title: postData.title ?? "Untitled Post",
    description: postData.excerpt ?? "No description provided.",
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      images: postData.imageUrl ? [{ url: postData.imageUrl }] : [],
      url: `https://www.redotengine.org//blog/${slug}`,
      type: "article",
      siteName: "Redot Engine",
      publishedTime: postData.publishedAt
        ? new Date(postData.publishedAt).toISOString()
        : undefined,
      authors: postData.author ? [postData.author.name] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.excerpt,
      images: postData.imageUrl ? [postData.imageUrl] : [],
    },
  };
}

export default async function Article({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const post = await getPostBySlug(slug, await getLanguage());

  if (!post || post.length === 0) {
    notFound();
  }

  const postData = post[0];

  return (
    <div className="mb-24 px-5 lg:px-40">
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-[800px] md:w-[800px]">
          <ArticleSplash article={postData} />
          <ArticleContent article={postData} />
        </div>
      </div>
    </div>
  );
}
