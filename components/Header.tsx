"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "assets/post-title.png";
import Link from "next/link";
import styles from "./header.module.scss";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/store";
import useMediaQuery from "@/hooks/useMediaQuery";
import { clsx } from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const router = useRouter();
  const { setCurrentPage } = useGlobalContext();
  const [toggleSideNav, setToggleSideNav] = useState(false);

  const mediumSize = useMediaQuery("(max-width: 860px)");

  let menuRef = useRef<HTMLInputElement>();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setToggleSideNav(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <header className={styles.header}>
      <Link onClick={() => setCurrentPage(1)} href="/">
        <Image src={logo} alt="Site logo" height={mediumSize ? 15 : 20} />
      </Link>

      <nav
        className={clsx(styles.header__nav, {
          [styles.active]: mediumSize,
          [styles.open]: toggleSideNav,
        })}
        ref={menuRef}
      >
        <ul>
          {mediumSize && (
            <li>
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "#ced4de", fontSize: "1.2rem" }}
                onClick={() => setToggleSideNav(false)}
              />
            </li>
          )}
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
          {mediumSize && <button className={styles.button}>Subscribe</button>}
        </ul>
      </nav>

      {!mediumSize && <button className={styles.button}>Subscribe</button>}
      {mediumSize && (
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setToggleSideNav(true)}
          style={{ color: "#ced4de", fontSize: "1.2rem" }}
        />
      )}
    </header>
  );
};
