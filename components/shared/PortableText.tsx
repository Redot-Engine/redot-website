"use client";

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
  toPlainText,
} from "next-sanity";
import Link from "next/link";
import { cn, generateHeadingId } from "@/lib/utils";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

interface CodeBlockValue {
  _type: "code";
  code: string;
  language?: string;
  filename?: string;
  _key: string;
}

interface ImageComponentProps {
  value: {
    _type: "image";
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  isInline?: boolean;
}

const ImageComponent = ({ value, isInline }: ImageComponentProps) => {
  const { width, height } = getImageDimensions(value);
  const imageWidth = isInline ? 100 : 800;
  const imageHeight = Math.round((height * imageWidth) / width);

  return (
    <Image
      src={urlBuilder(client)
        .image(value)
        .width(imageWidth)
        .fit("max")
        .auto("format")
        .url()}
      alt={value.alt ?? "Image Of Changelog"}
      width={imageWidth}
      height={imageHeight}
      loading="lazy"
      style={{
        display: isInline ? "inline-block" : "block",
        aspectRatio: width / height,
      }}
    />
  );
};

const CodeBlock = ({ value }: Readonly<{ value: CodeBlockValue }>) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="my-6">
      {value.filename && (
        <div className="rounded-t-lg border-b border-border bg-muted px-4 py-2 font-mono text-sm">
          {value.filename}
        </div>
      )}
      <SyntaxHighlighter
        language={value.language ?? "text"}
        style={isDark ? oneDark : oneLight}
        className={`${value.filename ? "!rounded-t-none" : ""} !mt-0`}
        showLineNumbers
        suppressHydrationWarning
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  );
};

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children, value }) => {
      const id = generateHeadingId(toPlainText(value));
      return <h1 id={id}>{children}</h1>;
    },
    h2: ({ children, value }) => {
      const id = generateHeadingId(toPlainText(value));
      return <h2 id={id}>{children}</h2>;
    },
    h3: ({ children, value }) => {
      const id = generateHeadingId(toPlainText(value));
      return <h3 id={id}>{children}</h3>;
    },
    h4: ({ children, value }) => {
      const id = generateHeadingId(toPlainText(value));
      return <h4 id={id}>{children}</h4>;
    },
    h5: ({ children, value }) => {
      const id = generateHeadingId(toPlainText(value));
      return <h5 id={id}>{children}</h5>;
    },
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <Link href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
  },
  types: {
    image: ImageComponent,
    code: ({ value }: { value: CodeBlockValue }) => <CodeBlock value={value} />,
  },
};

interface CustomPortableTextProps {
  className?: string;
  value: PortableTextBlock[];
}

export default function CustomPortableText({
  className,
  value,
}: Readonly<CustomPortableTextProps>) {
  return (
    <article
      className={cn(
        "prose max-w-max dark:prose-invert sm:prose-base md:prose-lg prose-blockquote:rounded-r-lg prose-blockquote:border-muted prose-blockquote:bg-muted/20 prose-blockquote:p-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-figure:relative prose-figcaption:mb-2 prose-figcaption:mt-1 prose-li:marker:text-muted-foreground dark:prose-blockquote:border-muted-foreground dark:prose-blockquote:bg-muted-foreground/20 dark:prose-li:marker:text-muted-foreground",
        className
      )}
    >
      <PortableText components={portableTextComponents} value={value} />
    </article>
  );
}
