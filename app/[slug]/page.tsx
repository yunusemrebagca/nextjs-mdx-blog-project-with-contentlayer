// app/posts/[slug]/page.tsx
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import type { MDXComponents } from "mdx/types";
import s from "./page.module.scss";

import "highlight.js/scss/arta.scss";

import Link from "next/link";
import { Hero } from "@/components/Hero";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.split("/").pop(),
  }));
}

const mdxComponents: MDXComponents = {
  // Override the default <a> element to use the next/link component.
  a: ({ href, children }) => (
    <Link className={s.a} href={href as string}>
      {children}
    </Link>
  ),
  // Add a custom component.
  p: ({ children }) => <p className={s.paragraph}>{children}</p>,
  h2: ({ children }) => <h2 className={s.h2}>{children}</h2>,
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
};

export default function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.

  const post = allPosts.find(
    (post) => post._raw.flattenedPath.split("/").pop() === params.slug
  );

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Hero title={post.title} />
      <div className={s.content}>
        {/* Some code ... */}

        <MDXContent components={mdxComponents} />
      </div>
    </>
  );
}
