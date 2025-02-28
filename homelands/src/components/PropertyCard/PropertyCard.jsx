import React from "react";
import { Link } from "react-router-dom"; 
import styles from "./PropertyCard.module.scss";

export const PropertyCard = ({ id, images, address, zipcode, city, type, energyLabel, price }) => {
  
  const imageUrl = images?.length > 0 ? images[0].filename.medium : "https://via.placeholder.com/300?text=No+Image";

  return (
    <div className={styles.card}>
      <Link to={`/property/${id}`} className={styles.cardLink}>
        <img src={imageUrl} alt={address} className={styles.cardImage} />
      </Link>

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
