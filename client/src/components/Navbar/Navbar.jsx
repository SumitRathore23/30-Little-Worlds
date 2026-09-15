import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <motion.header
      className="navbar"
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
        delay: 1.2,
      }}
    >
      <div className="navbar-inner">

        <Link to="/" className="navbar-logo">
          30 LITTLE WORLDS
        </Link>

        <nav className="navbar-links">
          <motion.div whileHover={{ y: -2 }}>
            <Link to="/stories">
              Stories
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }}>
            <Link to="/about">
              About
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }}>
            <Link to="/book">
              Book
            </Link>
          </motion.div>
        </nav>

      </div>
    </motion.header>
  );
}

export default Navbar;