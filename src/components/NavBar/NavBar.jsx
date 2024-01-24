import React from "react";
import styles from "./NavBar.module.css";
import {ReactComponent as Logo} from "../../assets/logo.svg"

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <div className={styles.logoContainer}>
        <Logo className={styles.logo} />
      </div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#consultation">Consultation</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
