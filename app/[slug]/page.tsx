// app/posts/[slug]/page.tsx
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import type { MDXComponents } from "mdx/types";
import s from "./page.module.scss";
import parameterize from "parameterize-js";
import { Metadata } from "next";

import "highlight.js/scss/arta.scss";

import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Toc } from "@/components/Toc";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.split("/").pop(),
  }));
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `${params.slug}`,
  };
};

const mdxComponents: MDXComponents = {
  // Override the default <a> element to use the next/link component.
  a: ({ href, children }) => (
    <Link className={s.a} href={href as string}>
      {children}
    </Link>
  ),
  // Add a custom component.
  p: ({ children }) => <p className={s.paragraph}>{children}</p>,
  h2: ({ children }) => (
    <h2
      id={parameterize(typeof children === "string" ? children : "")}
      className={s.h2}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={parameterize(typeof children === "string" ? children : "")}
      className={s.h3}
    >
      {children}
    </h3>
  ),
  img: (props) => <img className={s.img} {...props}></img>,
  li: (props) => (
    <li className={s.li} {...props}>
      {props.children}
    </li>
  ),
  ul: (props) => (
    <ul className={s.ul} {...props}>
      {props.children}
    </ul>
  ),
  ol: (props) => (
    <ul className={s.ol} {...props}>
      {props.children}
    </ul>
  ),
  pre: (props) => (
    <pre className={s.pre} {...props}>
      {props.children}
    </pre>
  ),
  hr: (props) => <hr className={s.hr} {...props} />,
  br: (props) => (
    <>
      <br />
      <br />
    </>
  ),
  strong: (props) => (
    <strong className={s.strong} {...props}>
      {props.children}
    </strong>
  ),
  iframe: (props) => <iframe {...props} className={s.iframe} />,
};

export default function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.

  const post = allPosts.find(
    (post) => post._raw.flattenedPath.split("/").pop() === params.slug
  );

  // 404 if the post does not exist.
  if (!post) notFound();

  function getHeadings(source) {
    // Get each line individually, and filter out anything that
    // isn't a heading.
    const headingLines = source.split("\n").filter((line) => {
      return line.match(/^###*\s/);
    });

    // Transform the string '## Some text' into an object
    // with the shape '{ text: 'Some text', level: 2 }'
    return headingLines.map((raw) => {
      const text = raw.replace(/^###*\s/, "");
      // I only care about h2 and h3.
      // If I wanted more levels, I'd need to count the
      // number of #s.
      const level = raw.slice(0, 3) === "###" ? 3 : 2;

      return { text, level };
    });

    return headingLines;
  }

  const headings = getHeadings(post.body.raw);
  const headingLinks = headings.map((heading) => {
    return parameterize(heading.text);
  });

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Hero title={post.title} postImage={post.imageUrl} />
      <Toc slug={params.slug} headings={headings} />
      <div className={s.content}>
        <MDXContent components={mdxComponents} />
      </div>
    </>
  );
}
