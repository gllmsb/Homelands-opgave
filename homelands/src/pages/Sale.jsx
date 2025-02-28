import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { PropertyCard } from "../components/PropertyCard/PropertyCard";
import styles from "./Sale.module.scss";

export const Sale = () => {
  // Fetch properties
  const { data: properties, isLoading, error } = useFetch("https://api.mediehuset.net/homelands/homes");

  // Daynamic max price
  const maxPrice = properties ? Math.max(...properties.map((property) => property.price)) : 5000000;

  // Sorting states
  const [priceRange, setPriceRange] = useState([0, maxPrice]); 
  const [selectedType, setSelectedType] = useState(""); 

  // Properties loaded before sorting
  const filteredProperties = properties
    ? properties
        .filter((property) => property.price >= priceRange[0] && property.price <= priceRange[1])
        .filter((property) => (selectedType ? property.type === selectedType : true))
    : [];

  return (
    <div className={styles.saleContainer}>
      {/* h1 + Filters on One Line */}
      <div className={styles.saleHeader}>
        <h1 className={styles.saleTitle}>Boliger til salg</h1>

        {/* Sorting Controls */}
        <div className={styles.filters}>
          {/* Price Slider */}
          <div className={styles.priceFilter}>
            <label>Sorter efter prisniveau:</label>
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
            <span>{priceRange[1].toLocaleString()} DKK</span>
          </div>

          {/* Type Dropdown */}
          <div className={styles.typeFilter}>
            <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
              <option value="">Sorter efter type</option>
              <option value="Villa">Villa</option>
              <option value="Ejerlejlighed">Ejerlejlighed</option>
              <option value="Villalejlighed">Villalejlighed</option>
              <option value="Andelsbolig">Andelsbolig</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className={styles.propertyGrid}>
        {filteredProperties.length > 0 ? (
          filteredProperties.slice(0, 15).map((property) => (
            <PropertyCard
              key={property.id}
              images={property.images}
              address={property.address}
              zipcode={property.zipcode}
              city={property.city}
              type={property.type}
              energyLabel={property.energy_label_name}
              price={property.price}
            />
          ))
        ) : (
          <p>Ingen ejendomme fundet.</p>
        )}
      </div>
    </div>
  );
};
