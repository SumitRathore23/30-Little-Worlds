import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "./About.css";

function About() {
  return (
    <main className="about-page">

      {/* HERO */}

      <section className="about-hero">

        <motion.p
          className="about-eyebrow"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          THE AUTHOR
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Dipanshu
          <br />
          Thakur
        </motion.h1>

        <motion.p
          className="about-intro"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
        >
          The person behind
          <br />
          these little worlds.
        </motion.p>

      </section>


      {/* ABOUT AUTHOR */}

      <section className="about-introduction">

        <motion.div
          className="about-introduction-inner"
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          <div className="about-label">
            <span>01</span>
            <span>ABOUT THE AUTHOR</span>
          </div>

          <div className="about-copy">

            <h2>
              Stories, memories
              <br />
              & imagination.
            </h2>

            <div className="about-text">

              <p>
                <strong>Dipanshu Thakur</strong> is the
                author behind <em>30 Little Worlds</em> —
                a collection of stories, memories and
                imagination.
              </p>

              <p>
                Each story is its own little world,
                carrying its own emotions, moments and
                meaning.
              </p>

              <p>
                This collection is a place for those
                worlds to live, be remembered and be
                shared with readers.
              </p>

            </div>

          </div>

        </motion.div>

      </section>


      {/* QUOTE */}

      <section className="about-quote">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 1.2,
          }}
        >

          <span className="about-quote-mark">
            “
          </span>

          <p>
            Every story creates a little world.
            Some are remembered.
            Some are imagined.
            Some simply need to be told.
          </p>

          <span className="about-quote-symbol">
            ✦
          </span>

        </motion.div>

      </section>


      {/* COLLECTION */}

      <section className="about-collection">

        <motion.div
          className="about-collection-number"
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          02
        </motion.div>

        <motion.div
          className="about-collection-content"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
          }}
        >

          <p className="about-section-label">
            THE COLLECTION
          </p>

          <h2>
            30 Little Worlds
          </h2>

          <p>
            A collection of stories,
            memories & imagination.
          </p>

          <Link
            to="/stories"
            className="about-stories-link"
          >
            Explore the stories
            <span>→</span>
          </Link>

        </motion.div>

      </section>


      {/* WEBSITE CREDIT */}

      <section className="about-credit">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <p className="about-credit-label">
            THE WEBSITE
          </p>

          <p className="about-credit-text">
            Designed & developed by
          </p>

          <h3>
            Sumit Rathore
          </h3>

          <p className="about-credit-note">
            A digital home for Dipanshu's stories.
          </p>

        </motion.div>

      </section>

    </main>
  );
}

export default About;