import { getPostBySlug, getPosts } from "@/lib/blog";
import { ArticleSplashNew } from "@/components/blog/ArticleSplashNew";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { Post } from "@/sanity/schemaTypes/postType";
import { getLanguage } from "@/actions/language";
import { getSettings } from "@/actions/settings";
import { ArticleSplashOld } from "@/components/blog/ArticleSplashOld";

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
      title: postData.title.value,
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
      title: postData.title.value,
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
  const settings = await getSettings();
  const layout = settings.blogLayout;

  return (
    <div className="px-5 py-12 lg:px-40">
      <div className="flex flex-col items-center justify-center">
        {layout === "new" ? (
          <ArticleSplashNew article={postData} />
        ) : (
          <ArticleSplashOld article={postData} />
        )}
        <div className="max-w-[720px] md:w-[720px]">
          <ArticleContent article={postData} />
        </div>
      </div>
    </div>
  );
}
