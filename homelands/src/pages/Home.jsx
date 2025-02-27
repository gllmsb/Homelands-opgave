import React from "react";
import { useFetch } from "../hooks/useFetch";
import { Slideshow } from "../components/Slideshow/Slideshow";
import { PropertyCard } from "../components/PropertyCard/PropertyCard";
import { CenterTitle } from "../components/CenterTitle/CenterTitle";
import { StaffCard } from "../components/StaffCard/StaffCard";
import styles from "./Home.module.scss";

export const Home = () => {
  //Fetch properties
  const { data: properties, isLoading, error } = useFetch("https://api.mediehuset.net/homelands/homes");

  //Fetch staff data
  const { data: staff, isLoading: staffLoading, error: staffError } = useFetch("https://api.mediehuset.net/homelands/staff");

  if (isLoading || staffLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (staffError) return <p>{staffError}</p>;

  //Prevent error when properties is null
  if (!properties) return <p>Loading properties...</p>;

  //Get 3 random proerties
  const getRandomProperties = (arr, num) => {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomProperties = getRandomProperties(properties, 3);

  return (
    <>
      <Slideshow />
      <div className={styles.propertyList}>
        {randomProperties.length > 0 ? (
          randomProperties.map((property) => (
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
          <p>No properties found.</p>
        )}
      </div>
      
      <CenterTitle title="Det siger kunderne:" />
      <CenterTitle title="Mød vores ansatte" />
      
      <div className={styles.staffList}>
        {staff?.length > 0 ? (
          staff.map((member) => (
            <StaffCard
              key={member.id}
              image={member.image}
              firstname={member.firstname}
              lastname={member.lastname}
              position={member.position}
              email={member.email}
              phone={member.phone}
            />
          ))
        ) : (
          <p>No staff found.</p>
        )}
      </div>
    </>
  );
};
