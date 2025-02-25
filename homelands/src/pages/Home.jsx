import React from "react";
import { useFetch } from "../hooks/useFetch";
import { Slideshow } from "../components/Slideshow/Slideshow";
import { PropertyCard } from "../components/PropertyCard/PropertyCard";
import { CenterTitle } from "../components/CenterTitle/CenterTitle";

export const Home = () => {
  const { data: properties, isLoading, error } = useFetch("https://api.mediehuset.net/homelands/homes");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const getRandomProperties = (arr, num) => {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomProperties = getRandomProperties(properties, 3);

  return (
    <>
      <Slideshow />
      <div className="property-list">
        {randomProperties.length > 0 ? (
          randomProperties.map((property) => (
            <PropertyCard
              key={property.id}
              image={property.image}
              address={property.address}
              zipcode={property.zipcode}
              city={property.city}
              type={property.type}
              energyLabel={property.energy_label_name}
              price={property.price}
            />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
      <CenterTitle title="Det siger kunderne:" />
      <CenterTitle title="Mød vores ansatte" />
    </>
  );
};
