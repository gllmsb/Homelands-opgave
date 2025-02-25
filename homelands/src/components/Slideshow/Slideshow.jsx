import React, { useState, useEffect } from "react";
import styles from "./Slideshow.module.scss";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

// Importing images
import HeaderImage1 from "../../assets/header.png";
import HeaderImage2 from "../../assets/header.png";
import HeaderImage3 from "../../assets/header.png";

export const Slideshow = () => {
  const images = [HeaderImage1, HeaderImage2, HeaderImage3]; 

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-play the slideshow every 7 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000); // Change every 7 seconds
    return () => clearInterval(interval); // Cleanup to avoid memory leaks
  }, []);

  return (
    <div className={styles.slideshow}>
      <div className={styles.slides}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className={styles.prev} onClick={prevSlide}>
        <IoIosArrowDropleft size={40} />
      </button>
      <button className={styles.next} onClick={nextSlide}>
        <IoIosArrowDropright size={40} />
      </button>
    </div>
  );
};
