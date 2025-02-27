import React, { useState } from "react";
import styles from "./StaffCard.module.scss";

export const StaffCard = ({ image, firstname, lastname, position, email, phone }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.staffCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={`${firstname} ${lastname}`} className={styles.staffImage} />

      {/* Default info at the bottom */}
      <div className={styles.staffInfo}>
        <h3>{firstname} {lastname}</h3>
        <p>{position}</p>
      </div>

      {/* Hover overlay with full details */}
      <div className={`${styles.overlay} ${isHovered ? styles.showOverlay : ""}`}>
        <h3>{firstname} {lastname}</h3>
        <p>{position}</p>
        <p>Email: {email}</p>
        <p>Mobil: {phone}</p>
      </div>
    </div>
  );
};
