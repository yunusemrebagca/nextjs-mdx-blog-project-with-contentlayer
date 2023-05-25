"use client";

import Image from "next/image";
import styles from "./page.module.scss";

import { allPosts } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { useGlobalContext } from "../context/store";

export default function Home() {
  const searchParams = useSearchParams();
  const { currentPage, setCurrentPage } = useGlobalContext();
  const itemPerPage = 2;
  const pageCount = Math.ceil(allPosts.length / itemPerPage);

  const lastItem = currentPage * itemPerPage;
  const firstItem = lastItem - itemPerPage;

  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const elementItems = [];

  for (let i = 1; i <= pageCount; i++) {
    elementItems.push(
      <div
        className={currentPage == i ? styles.active : ""}
        onClick={() => setCurrentPage(i)}
        key={i}
        style={{ cursor: "pointer", padding: "1rem" }}
      >
        <Link href={`/?page=${i}`}>Page {i}</Link>
      </div>
    );
  }

  return (
    <>
      <Hero title="" />
      <main className={styles.main}>
        <h2>Posts</h2>
        <section className={styles.cards}>
          {posts.slice(firstItem, lastItem).map((post, idx) => (
            <article className={styles.card} key={idx}>
              <div className={styles.article__right}>
                <div className={styles.article__title}>
                  <p className={styles.tags}>
                    {post._raw.flattenedPath.split("/").pop()}
                  </p>
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
        <div className={styles.pagination}>{elementItems}</div>
      </main>
    </>
  );
}
