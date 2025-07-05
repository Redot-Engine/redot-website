import { useEffect, useState } from "react";
import { getRandomQuote } from "@/lib/blog";
import Link from "next/link";
import { Post } from "@/sanity/schemaTypes/postType";
import { bricolageGrotesque } from "@/app/fonts";
import { formatDate } from "@/lib/utils";
import { Tag } from "@/sanity/schemaTypes/tagType";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

const colors: string[] = [
  "#DCEDB9",
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
];

export const BlogRandomQuote = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    const fetchQuote = async () => {
      const randomQuote = await getRandomQuote();
      setPost(randomQuote);
    };

    fetchQuote();
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  if (!post) {
    return null;
  }

  return (
    <div
      className="z-50 rounded-md px-6 py-8"
      style={{ backgroundColor: bgColor }}
    >
      <div className="dark rounded border-2 border-black p-12">
        <div className="mb-12 flex w-full justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag: Tag) => (
              <Badge variant="secondary" key={tag.slug.current}>
                {tag.name}
              </Badge>
            ))}
          </div>
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/blog/${post.slug}`}>
              Read more <IconArrowRight />
            </Link>
          </Button>
        </div>
        <div className="grid place-items-end gap-10 lg:grid-cols-3">
          <h3
            className={`${bricolageGrotesque.className} col-span-2 text-pretty text-5xl font-thin text-primary-foreground before:content-['“'] after:content-['”']`}
          >
            {post.quote}
          </h3>
          <div className="col-span-1 place-content-end text-primary-foreground">
            <p className="text-lg font-medium">{post.author.name}</p>
            <p className="text-sm">{formatDate(post.publishedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
