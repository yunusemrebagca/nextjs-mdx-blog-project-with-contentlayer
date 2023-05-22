import React from "react";
import styles from "./hero.module.scss";

interface Props {
  title: string;
}
export const Hero = (props: Props) => {
  return (
    <div className={styles.hero}>
      <p>Hello</p>
      <h1>
        {props.title ||
          `Insights about my personal and work life, and the in-betweens`}
      </h1>
    </div>
  );
};
