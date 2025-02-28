import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid property ID");
      setLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://api.mediehuset.net/homelands/homes/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }

        const data = await response.json();
        setProperty(data.item);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); 

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{property.address}</h1>
      <p>City: {property.city}</p>
      <p>Type: {property.type}</p>
      <p>Price: {property.price} DKK</p>
      <img src={property.images[0]?.filename.medium} alt={property.address} />
    </div>
  );
};
