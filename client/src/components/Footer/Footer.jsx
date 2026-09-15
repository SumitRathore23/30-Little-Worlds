import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-inner">

        {/* BRAND */}

        <div className="footer-brand">

          <Link to="/">
            30 LITTLE WORLDS
          </Link>

          <p>
            A collection of stories,
            <br />
            memories & imagination.
          </p>

        </div>

        {/* LINKS */}

        <div className="footer-links">

          <nav className="footer-navigation">

            <Link to="/stories">
              Stories
            </Link>

            <Link to="/about">
              About
            </Link>

            <Link to="/book">
              Book
            </Link>

          </nav>

          {/* AUTHOR LOGIN */}

          <motion.div
            className="author-login-wrapper"
            whileHover={{ x: 5 }}
          >

            <Link
              to="/admin/login"
              className="author-login"
            >
              <span>AUTHOR LOGIN</span>

              <strong>→</strong>
            </Link>

          </motion.div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} Dipanshu Thakur
        </span>

        <span>
          Website designed & developed by{" "}
          <strong>Sumit Rathore</strong>
        </span>

      </div>

    </footer>
  );
}

export default Footer;