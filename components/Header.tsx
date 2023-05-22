"use client";

import React from "react";
import Image from "next/image";
import logo from "assets/post-title.png";
import Link from "next/link";
import styles from "./header.module.scss";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/store";

export const Header = () => {
  const router = useRouter();
  const { setCurrentPage } = useGlobalContext();
  return (
    <header className={styles.header}>
      <Image src={logo} alt="Site logo" />
      <nav className={styles.header__nav}>
        <ul>
          <li>
            <Link onClick={() => setCurrentPage(1)} href="/">
              Posts
            </Link>
          </li>
          <li>
            <Link href="/">Daily Updates</Link>
          </li>
          <li>
            <Link href="/">Tutorials</Link>
          </li>
          <li>
            <Link href="/">Library</Link>
          </li>
        </ul>
      </nav>
      <button className={styles.button}>Subscribe</button>
    </header>
  );
};
