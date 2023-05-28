import React from "react";
import styles from "./hero.module.scss";

interface Props {
  title: string;
  postImage?: string;
}
export const Hero = (props: Props) => {
  return (
    <>
      <div className={styles.hero}>
        <p>Hello</p>
        <h1>
          {props.title ||
            `Insights about my personal and work life, and the in-betweens`}
        </h1>
      </div>
      {props.postImage && (
        <div className={styles.image}>
          <img src={props.postImage} alt="img" />
        </div>
      )}
    </>
  );
};
