import React from "react";
import { useFetch } from "../hooks/useFetch";
import { Slideshow } from "../components/Slideshow/Slideshow";
import { PropertyCard } from "../components/PropertyCard/PropertyCard";
import { CenterTitle } from "../components/CenterTitle/CenterTitle";
import { StaffCard } from "../components/StaffCard/StaffCard";
import styles from "./Home.module.scss";

export const Home = () => {
  // Fetch properties
  const { data: properties, isLoading, error } = useFetch("https://api.mediehuset.net/homelands/homes");

  // Fetch staff data
  const { data: staff, isLoading: staffLoading, error: staffError } = useFetch("https://api.mediehuset.net/homelands/staff");

  if (isLoading || staffLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (staffError) return <p>{staffError}</p>;

  // Get 3 random properties
  const getRandomProperties = (arr, num) => {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomProperties = getRandomProperties(properties, 3);

  // Get 4 staff members
  const getLimitedStaff = (arr, num) => {
    if (!arr || arr.length === 0) return [];
    return arr.slice(0, num);
  };

  const staffList = getLimitedStaff(staff, 4);

  return (
    <>
      <Slideshow />
      <div className={styles.propertyList}>
        {randomProperties.length > 0 ? (
          randomProperties.map((property) => (
            <PropertyCard
              key={property.id}
              image={property.image} // Using the default image from the homes API
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
      
      <div className="staff-list">
        {staffList.length > 0 ? (
          staffList.map((member) => (
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
