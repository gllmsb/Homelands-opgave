import React from "react";
import styles from "./PropertyCard.module.scss";

const fallbackImage = "https://via.placeholder.com/300?text=No+Image";

export const PropertyCard = ({ images, address, zipcode, city, type, energyLabel, price }) => {
  
  const mainImage = images?.find(img => img.is_main === "1")?.filename.medium ||
                    images?.[0]?.filename.medium || 
                    fallbackImage; 

  return (
    <div className={styles.card}>
      <img src={mainImage} alt={address} className={styles.cardImage} />

      <div className={styles.cardContent}>
        <h3>{address}</h3>
        <p>{zipcode} {city}</p>
        <p><strong>{type}</strong></p>

        <div className={styles.cardFooter}>
          <span className={styles.energyLabel}>{energyLabel}</span>
          <p className={styles.price}>{parseInt(price).toLocaleString()} DKK</p>
        </div>
      </div>
    </div>
  );
};
