import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  motion,
  useScroll,
} from "framer-motion";

import { getStory } from "../../utils/api";

function StoryDetail() {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     READING PROGRESS
  ========================= */

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const loadStory = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getStory(slug);

        setData(result);
      } catch (error) {
        console.error(
          "Failed to load story:",
          error
        );

        setError("Unable to open this story.");
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [slug]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="story-loading-page">
        <motion.div
          className="story-loader"
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

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          Opening a little world...
        </motion.p>
      </main>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error || !data?.story) {
    return (
      <main className="story-error-page">
        <div>
          <p className="story-error-small">
            THE WORLD COULD NOT BE FOUND
          </p>

          <h1 className="serif">
            Story not found
          </h1>

          <Link to="/stories">
            ← Back to stories
          </Link>
        </div>
      </main>
    );
  }

  const {
    story,
    navigation = {},
  } = data;

  return (
    <main className="story-reading-page">

      {/* =========================
          READING PROGRESS
      ========================= */}

      <motion.div
        className="reading-progress"
        style={{
          scaleX: scrollYProgress,
        }}
      />

      {/* =========================
          BACK TO COLLECTION
      ========================= */}

      <motion.div
        className="story-back-link"
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
      >
        <Link to="/stories">
          <span>←</span>
          <span>Back to collection</span>
        </Link>
      </motion.div>

      {/* =========================
          STORY HEADER
      ========================= */}

      <motion.header
        className="story-header"
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
      >

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
        >
          {story.theme}
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 1,
          }}
        >
          {story.title}
        </motion.h1>

        <motion.p
          className="story-meta"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
            duration: 0.8,
          }}
        >
          By {story.author || "Dipanshu Thakur"}
          {" · "}
          {story.readingTime} min read
        </motion.p>

      </motion.header>

      {/* =========================
          STORY COVER
      ========================= */}

      {story.coverImage && (
        <motion.figure
          className="story-detail-cover"
          initial={{
            opacity: 0,
            y: 70,
            scale: 0.94,
            clipPath:
              "inset(8% 8% 8% 8% round 4px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath:
              "inset(0% 0% 0% 0% round 4px)",
          }}
          transition={{
            delay: 0.5,
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.img
            src={story.coverImage}
            alt={`${story.title} cover`}
            className="story-detail-cover-image"
            initial={{
              scale: 1.08,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              delay: 0.5,
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          <figcaption>
            {story.title}
          </figcaption>
        </motion.figure>
      )}

      {/* =========================
          STORY CONTENT
      ========================= */}

      <motion.div
        className="story-content"
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.9,
          duration: 1.2,
          ease: "easeOut",
        }}
      >

        {story.content
          .split("\n\n")
          .map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: index * 0.05,
              }}
            >
              {paragraph}
            </motion.p>
          ))}

      </motion.div>

      {/* =========================
          STORY END
      ========================= */}

      <motion.div
        className="story-ending"
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
          amount: 0.4,
        }}
        transition={{
          duration: 1,
        }}
      >

        <div className="ending-line" />

        <span className="ending-symbol">
          ✦
        </span>

        <p>
          You have reached the end of this
          little world.
        </p>

        <span className="ending-symbol">
          ✦
        </span>

        <div className="ending-line" />

      </motion.div>

      {/* =========================
          STORY NAVIGATION
      ========================= */}

      <section className="story-navigation">

        {navigation.previous ? (
          <motion.div
            className="story-nav-card story-nav-previous"
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            whileHover={{
              x: -6,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <Link
              to={`/stories/${navigation.previous.slug}`}
            >
              <small>
                PREVIOUS STORY
              </small>

              <span className="story-nav-arrow">
                ←
              </span>

              <strong>
                {navigation.previous.title}
              </strong>

              <span className="story-nav-read">
                Read previous
              </span>
            </Link>
          </motion.div>
        ) : (
          <div />
        )}

        {navigation.next ? (
          <motion.div
            className="story-nav-card story-nav-next"
            initial={{
              opacity: 0,
              x: 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            whileHover={{
              x: 6,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <Link
              to={`/stories/${navigation.next.slug}`}
            >
              <small>
                NEXT STORY
              </small>

              <span className="story-nav-arrow">
                →
              </span>

              <strong>
                {navigation.next.title}
              </strong>

              <span className="story-nav-read">
                Read next
              </span>
            </Link>
          </motion.div>
        ) : (
          <div />
        )}

      </section>

      {/* =========================
          BACK TO STORIES
      ========================= */}

      <motion.div
        className="story-bottom-link"
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
        <Link to="/stories">
          <span>30 LITTLE WORLDS</span>

          <small>
            Return to the collection
          </small>
        </Link>
      </motion.div>

    </main>
  );
}

export default StoryDetail;