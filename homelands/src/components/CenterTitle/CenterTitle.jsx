import React from "react";
import styles from "./CenterTitle.module.scss";

export const CenterTitle = ({ title }) => {
  return (
    <div className={styles.centerTitle}>
      <h2>{title}</h2>
    </div>
  );
};
