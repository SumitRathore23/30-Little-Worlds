import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { getFeaturedStory } from "../../utils/api";

import "./Home.css";

function Home() {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedStory = async () => {
      try {
        const data = await getFeaturedStory();

        setStory(data.story);
      } catch (error) {
        console.error(
          "Failed to load featured story:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedStory();
  }, []);

  return (
    <main>
      {/* ================= HERO ================= */}

      <section className="hero">

        <motion.div
          className="hero-moon"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}

        <div className="hero-particles">
          {Array.from({ length: 18 }).map((_, index) => (
            <motion.span
              key={index}
              className="particle"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                y: -120,
              }}
              transition={{
                duration: 4 + (index % 4),
                repeat: Infinity,
                delay: index * 0.35,
                ease: "easeOut",
              }}
              style={{
                left: `${(index * 17) % 100}%`,
                bottom: `${10 + (index % 5) * 8}%`,
              }}
            />
          ))}
        </div>

        <div className="hero-content">

          <motion.p
            className="hero-eyebrow"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
          >
            THE WRITINGS OF DIPANSHU THAKUR
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 70,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.4,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span>30</span>
            <span>LITTLE</span>
            <span>WORLDS</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.8,
            }}
          >
            A collection of stories, memories
            <br />
            & imagination.
          </motion.p>

          <p className="home-new-chapters">
            📖 New Chapters. Every Sunday. New Emotions. Every Story.
          </p>

          <motion.a
            href="#featured"
            className="hero-button"
            initial={{
              opacity: 0,
          }}
          animate={{
            opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 1.3,
        }}
        whileHover={{
          scale: 1.05,
          y: -4,
          letterSpacing: "0.3em",
          boxShadow: "0 12px 35px rgba(201, 169, 110, 0.18)",
        }}
        whileTap={{
          scale: 0.96,
          y: 0,
        }}
          >
            ENTER THE WORLDS

            <motion.span
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              ↓
            </motion.span>
          </motion.a>

        </div>

        <div className="hero-scroll">
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* ================= INTRO ================= */}

      <motion.section
        className="intro container"
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 1,
        }}
      >
        <p className="intro-small">
          A PLACE FOR STORIES
        </p>

        <h2>
          Every story carries
          <br />
          <em>a little world within it.</em>
        </h2>
      </motion.section>

      {/* ================= FEATURED STORY ================= */}

      <section
        id="featured"
        className="featured container"
      >
        <motion.div
          className="section-label"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          <span>01</span>
          <span>FEATURED STORY</span>
        </motion.div>

        {/* Loading */}

        {loading && (
          <div className="story-loading">

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ◌
            </motion.div>

            <span>
              Opening a little world...
            </span>

          </div>
        )}

        {/* Featured story */}

        {!loading && story && (
          <motion.article
            className="featured-story"
            initial={{
              opacity: 0,
              y: 80,
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
            }}
          >

            <motion.div
                className="featured-cover"
                whileHover={{
                  scale: 1.035,
                  y: -6,
                  rotateZ: 0.4,
                }}
        transition={{
            duration: 0.6,
        }}
>
  {story.coverImage ? (
    <img
      src={story.coverImage}
      alt={`${story.title} cover`}
      className="featured-cover-image"
    />
  ) : (
    <div className="featured-cover-fallback">
      <div className="placeholder-glow" />

      <span>30</span>

      <span>
        LITTLE WORLDS
      </span>
    </div>
  )}
</motion.div>

            <div className="featured-info">

              <motion.p
                className="story-theme"
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
              >
                {story.theme}
              </motion.p>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.15,
                }}
              >
                {story.title}
              </motion.h2>

              <motion.p
                className="story-excerpt"
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
                  delay: 0.3,
                }}
              >
                {story.excerpt}
              </motion.p>

              <p className="reading-time">
                {story.readingTime} min read
              </p>

              <motion.div
                whileHover={{
                  x: 8,
                }}
              >
                <Link
                  to={`/stories/${story.slug}`}
                  className="read-button"
                >
                  READ STORY →
                </Link>
              </motion.div>

            </div>

          </motion.article>
        )}

        {/* No featured story */}

        {!loading && !story && (
          <p className="loading">
            No featured story available.
          </p>
        )}

      </section>
    </main>
  );
}

export default Home;