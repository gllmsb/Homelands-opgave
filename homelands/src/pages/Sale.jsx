import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { PropertyCard } from "../components/PropertyCard/PropertyCard";
import styles from "./Sale.module.scss";
import { useLocation } from "react-router-dom";

export const Sale = () => {
  // Fetch properties
  const { data: properties, isLoading, error } = useFetch("https://api.mediehuset.net/homelands/homes");

  // Sorting states
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedType, setSelectedType] = useState(""); 

  // Get search term from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  // Filters
  const filteredProperties = properties
    ? properties
        .filter((property) => property.price >= priceRange[0] && property.price <= priceRange[1])
        .filter((property) => (selectedType ? property.type === selectedType : true))
        .filter((property) =>
          searchQuery
            ? property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
              property.city.toLowerCase().includes(searchQuery.toLowerCase())
            : true
        )
    : [];

  return (
    <div className={styles.saleContainer}>
      
      {/* Sale Header with Title Filters in One Row */}
      <div className={styles.saleHeader}>
        <h1 className={styles.saleTitle}>Boliger til salg</h1>

        <div className={styles.filters}>
          {/* Price Filter */}
          <div className={styles.priceFilter}>
            <label>Sorter efter pris:</label>
            <input
              type="range"
              min="0"
              max="5000000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
            <span>{priceRange[1].toLocaleString()} DKK</span>
          </div>

          {/* Type Filter */}
          <div className={styles.typeFilter}>
            <label>Sorter efter type:</label>
            <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
              <option value="">Alle typer</option>
              <option value="Villa">Villa</option>
              <option value="Ejerlejlighed">Ejerlejlighed</option>
              <option value="Villalejlighed">Villalejlighed</option>
              <option value="Andelsbolig">Andelsbolig</option>
            </select>
          </div>
        </div>
      </div>

      {/* Show Search Term if Searching */}
      {searchQuery && <p className={styles.searchResult}>Søgeresultater for: <strong>{searchQuery}</strong></p>}

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
