import React from "react";
import styles from "./Footer.module.scss";
import { FaTwitter, FaFacebookF } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section - Logo/Company Name */}
        <div className={styles.footerLeft}>
          <h2>HomeLands</h2>
        </div>

        {/* Center Section - Address */}
        <div className={styles.footerCenter}>
          <p>Øster Uttrupvej 5</p>
          <p>9000 Aalborg</p>
        </div>

        {/* Right Section - Contact Info */}
        <div className={styles.footerContact}>
          <p>Email: info@homelands.dk</p>
          <p>Telefon: +45 1122 3344</p>
        </div>

        {/* Right Section - Social Media Icons */}
        <div className={styles.footerRight}>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
        </div>
      </div>
    </footer>
  );
};
