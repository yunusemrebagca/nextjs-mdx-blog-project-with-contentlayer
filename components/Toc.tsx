"use client";

import React, { useRef, useState } from "react";
import parameterize from "parameterize-js";
import clsx from "clsx";
import Link from "next/link";
import s from "../app/[slug]/page.module.scss";
import { useMousedown } from "@/hooks/useMousedown";

export const Toc = ({ slug, headings }) => {
  const [toggleToc, setToggleToc] = useState(false);
  let tocRef = useRef<HTMLInputElement>();

  let handler = (e) => {
    if (!tocRef.current.contains(e.target)) {
      setToggleToc(false);
    }
  };

  useMousedown(handler);

  return (
    <>
      <div ref={tocRef} className={clsx(s.toc__div, { [s.active]: toggleToc })}>
        <ul className={s.toc}>
          {headings.map((heading, idx) => {
            return (
              <li key={idx}>
                <Link
                  href={`/${slug}#${parameterize(heading.text)}`}
                  onClick={() => {
                    setToggleToc(false);
                  }}
                >
                  {heading.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={s.button} onClick={() => setToggleToc(!toggleToc)}>
        Table of Contents
      </div>
    </>
  );
};
