import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "./Book.css";

function Book() {
  return (
    <main className="book-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="book-hero">

        <motion.p
          className="book-eyebrow"
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
          THE COLLECTION
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
          30
          <br />
          Little Worlds
        </motion.h1>

        <motion.p
          className="book-subtitle"
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
          A collection of stories,
          <br />
          memories & imagination.
        </motion.p>

      </section>


      {/* =================================
          BOOK INTRODUCTION
      ================================= */}

      <section className="book-introduction">

        <motion.div
          className="book-introduction-inner"
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

          <div className="book-label">
            <span>01</span>
            <span>THE BOOK</span>
          </div>

          <div className="book-copy">

            <h2>
              A world made
              <br />
              of little worlds.
            </h2>

            <div className="book-text">

              <p>
                <em>30 Little Worlds</em> is a
                collection of stories, memories
                and imagination by
                <strong> Dipanshu Thakur</strong>.
              </p>

              <p>
                Every story opens a different
                door — into a moment, a feeling,
                a memory or a world that exists
                only for a while.
              </p>

              <p>
                Take your time. Open a story.
                Stay as long as you like.
              </p>

            </div>

          </div>

        </motion.div>

      </section>


      {/* =================================
          BOOK EXPERIENCE
      ================================= */}

      <section className="book-experience">

        <motion.div
          className="book-experience-inner"
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
            amount: 0.25,
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          <span className="book-quote-mark">
            “
          </span>

          <h2>
            Thirty little worlds.
            <br />
            Infinite ways to feel them.
          </h2>

          <span className="book-symbol">
            ✦
          </span>

        </motion.div>

      </section>


      {/* =================================
          AUTHOR
      ================================= */}

      <section className="book-author">

        <motion.div
          className="book-author-inner"
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
            duration: 0.9,
          }}
        >

          <div className="book-author-number">
            02
          </div>

          <div className="book-author-content">

            <p className="book-section-label">
              THE AUTHOR
            </p>

            <h2>
              Dipanshu
              <br />
              Thakur
            </h2>

            <p>
              The author behind
              <em> 30 Little Worlds</em>.
            </p>

            <Link
              to="/about"
              className="book-author-link"
            >
              About the author
              <span>→</span>
            </Link>

          </div>

        </motion.div>

      </section>


      {/* =================================
          EXPLORE STORIES
      ================================= */}

      <section className="book-explore">

        <motion.div
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

          <p className="book-section-label">
            BEGIN READING
          </p>

          <h2>
            Open a little world.
          </h2>

          <p className="book-explore-text">
            Explore the collection and discover
            a story waiting for you.
          </p>

          <Link
            to="/stories"
            className="book-explore-button"
          >
            <span>Explore the stories</span>
            <span>→</span>
          </Link>

        </motion.div>

      </section>


      {/* =================================
          FOOTER NOTE
      ================================= */}

      <motion.section
        className="book-footer-note"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
      >

        <span>✦</span>

        <p>
          30 LITTLE WORLDS
        </p>

        <span>✦</span>

      </motion.section>

    </main>
  );
}

export default Book;