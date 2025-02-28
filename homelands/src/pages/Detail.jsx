import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import styles from "./Detail.module.scss";

export const Detail = () => {
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("Property ID is undefined"); // Debugging log
      return;
    }

    const fetchProperty = async () => {
      try {
        console.log(`Fetching property with ID: ${id}`); // Debugging log
        const response = await fetch(`https://api.mediehuset.net/homelands/homes/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Property:", data); // Debugging log
        setProperty(data.item);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (!id) return <p>Error: Property ID is missing.</p>;
  if (loading) return <p>Loading property details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!property) return <p>No property found.</p>;

  return (
    <div className={styles.detailContainer}>
      <h1>{property.address}</h1>
      <p>{property.zipcode} {property.city}</p>
      <p>{property.type} | {property.floor_space} m² | {property.num_rooms} værelser</p>
      <p>Set {property.num_clicks} gange</p>

      {/* Display Image */}
      {property.images?.length > 0 && (
        <img src={property.images[0].filename.large} alt={property.address} />
      )}

      <p>Price: {parseInt(property.price).toLocaleString()} DKK</p>
    </div>
  );
};
