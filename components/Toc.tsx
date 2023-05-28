"use client";

import React, { useRef, useState } from "react";
import parameterize from "parameterize-js";
import clsx from "clsx";

import s from "../app/[slug]/page.module.scss";
import { useMousedown } from "@/hooks/useMousedown";

export const Toc = ({ slug, headings }) => {
  const [toggleToc, setToggleToc] = useState(false);
  let tocRef = useRef<HTMLInputElement>();
  let buttonRef = useRef<HTMLInputElement>();

  let handler = (e) => {
    if (
      !tocRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
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
              <li
                key={idx}
                style={heading.level == 3 ? { marginLeft: "1rem" } : {}}
              >
                <a
                  href={`/${slug}#${parameterize(heading.text)}`}
                  onClick={() => {
                    setToggleToc(false);
                  }}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        ref={buttonRef}
        className={s.button}
        onClick={() => setToggleToc(!toggleToc)}
      >
        Table of Contents
      </div>
    </>
  );
};
