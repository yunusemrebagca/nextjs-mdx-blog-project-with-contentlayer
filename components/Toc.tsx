"use client";

import React, { useState } from "react";
import parameterize from "parameterize-js";
import clsx from "clsx";
import Link from "next/link";
import s from "../app/[slug]/page.module.scss";

export const Toc = ({ slug, headings }) => {
  const [toggleToc, setToggleToc] = useState(false);
  return (
    <>
      <div className={clsx(s.toc__div, { [s.active]: toggleToc })}>
        <ul className={s.toc}>
          {headings.map((heading, idx) => {
            return (
              <li key={idx}>
                <Link href={`/${slug}/#${parameterize(heading.text)}`}>
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
