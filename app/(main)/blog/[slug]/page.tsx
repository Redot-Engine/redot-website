import { getPostBySlug, getPosts } from "@/lib/blog";
import { PostSplash } from "@/components/sections/blog/PostSplash";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostContentLegacy } from "@/components/sections/blog/PostContentLegacy";
import { Post } from "@/sanity/schemaTypes/postType";
import { getLanguage } from "@/actions/language";
import { getSettings } from "@/actions/settings";
import { PostSplashLegacy } from "@/components/sections/blog/PostSplashLegacy";
import { GoToTop } from "@/components/blog/GoToTop";
import CustomPortableText from "@/components/shared/PortableText";
import { getBaseUrl } from "@/lib/base-url";
import { Tag } from "@/sanity/schemaTypes/tagType";

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  readonly params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  const post = await getPostBySlug(slug, "en");

  if (!post || post.length === 0) {
    return {
      title: "Post Not Found",
      description:
        "The blog post you are looking for does not exist or has been moved. It might have been relocated, deleted, or the URL might be incorrect. Browse our latest blog posts or return to the homepage.",
      robots: {
        index: false,
        follow: false,
        noarchive: true,
        nosnippet: true,
        noimageindex: true,
      },
      openGraph: {
        title: "Post Not Found",
        description:
          "The blog post you are looking for does not exist or has been moved.",
        siteName: "Redot Engine",
        type: "website",
        url: "https://www.redotengine.org/blog/404",
        images: [
          {
            url: "https://image.redotengine.org/not-found.png",
            width: 1200,
            height: 630,
            alt: "Redot Engine - Blog Post Not Found",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Post Not Found",
        description:
          "The blog post you are looking for does not exist or has been moved.",
        site: "@Redot_Engine",
        images: ["https://image.redotengine.org/not-found.png"],
      },
      alternates: {
        canonical: "https://www.redotengine.org/blog/404",
      },
      other: {
        "revisit-after": "30 days",
        "content-language": "en",
      },
    };
  }

  const postUrl = `${getBaseUrl()}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags?.map((tag: Tag) => tag.name).join(", "),
    authors: post.author ? [{ name: post.author.name }] : [],
    creator: post.author?.name,
    publisher: "Redot Engine",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
      url: postUrl,
      type: "article",
      siteName: "Redot Engine",
      publishedTime: post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : undefined,
      authors: post.author ? [post.author.name] : [],
      tags: post.tags?.map((tag: Tag) => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const [post, settings] = await Promise.all([
    getPostBySlug(slug, await getLanguage()),
    getSettings(),
  ]);

  if (!post || post.length === 0) {
    notFound();
  }
  const layout = settings.blogLayout ?? "new";

  return (
    <div className="px-5 py-12 lg:px-40">
      <div className="flex flex-col items-center justify-center">
        {layout === "new" ? (
          <PostSplash {...post} />
        ) : (
          <PostSplashLegacy {...post} />
        )}
        <div className="max-w-[720px] md:w-[720px]">
          {post.isLegacy ? (
            <PostContentLegacy {...post} />
          ) : (
            <CustomPortableText
              className="first-letter:text-3xl sm:first-letter:text-5xl"
              value={post.content}
            />
          )}
          <GoToTop />
        </div>
      </div>
    </div>
  );
}
