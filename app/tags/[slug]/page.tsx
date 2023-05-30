// app/posts/[slug]/page.tsx
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import styles from "../../page.module.scss";
import parameterize from "parameterize-js";
import { compareDesc, format } from "date-fns";

import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";

export async function generateStaticParams() {
  const allTags = [];

  allPosts.forEach((post) => {
    allTags.push(...post.tags);
  });

  const allTagLinks = allTags.map((item) => parameterize(item));

  function removeDuplicates(arr) {
    return arr.filter((element, index) => arr.indexOf(element) === index);
  }

  const newArray = removeDuplicates(allTagLinks);

  return newArray.map((tag) => ({
    slug: tag,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.

  const posts = allPosts.filter((post) =>
    post.tags.some((tag) => parameterize(tag) === params.slug)
  );

  // 404 if the post does not exist.
  if (!posts) notFound();

  // Parse the MDX file via the useMDXComponent hook.

  return (
    <>
      <Hero title={`Tag : ${params.slug}`} />
      <main className={styles.main}>
        <h2>Posts</h2>
        <section className={styles.cards}>
          {posts.map((post, idx) => (
            <article className={styles.card} key={idx}>
              <div className={styles.article__right}>
                <div className={styles.article__title}>
                  <ul className={styles.tags}>
                    {post.tags.map((tag, idx) => (
                      <li className={styles.tag} key={idx}>
                        <Link href={`/tags/${parameterize(tag)}`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={post._raw.flattenedPath.split("/").pop() || ""}>
                    <h4>{post.title}</h4>
                  </Link>
                  <p>{format(new Date(post.date), "EEEE, MMMM do, yyyy")}</p>
                </div>
                <p className={styles.clamp}>{post.description}</p>
              </div>
              <Image
                alt={post.description}
                src={post.imageUrl}
                width={300}
                height={300}
                style={{ objectFit: "cover" }}
              ></Image>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
