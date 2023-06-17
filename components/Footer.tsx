import React from "react";
import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <div className={styles.div}>
      <h4>Subscribe to my blog.</h4>
      <p>I post fresh content every week.</p>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};
