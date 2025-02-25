import React from "react";
import styles from "./PropertyCard.module.scss";

export const PropertyCard = ({ image, address, zipcode, city, type, energyLabel, price }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={address} className={styles.cardImage} />

      <div className={styles.cardContent}>
        <h3>{address}</h3>
        <p>{zipcode} {city}</p>
        <p><strong>{type}</strong></p>

        <div className={styles.cardFooter}>
          <span className={styles.energyLabel}>{energyLabel}</span>
          <p className={styles.price}>{price.toLocaleString()} DKK</p>
        </div>
      </div>
    </div>
  );
};
