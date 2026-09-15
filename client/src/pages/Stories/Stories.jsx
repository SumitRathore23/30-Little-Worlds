import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { getStories } from "../../utils/api";

import StoryCard from "../../components/StoryCard/StoryCard";

import "./Stories.css";

function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("all");
  const [search, setSearch] = useState("");

  const { scrollYProgress } = useScroll();

const heroY = useTransform(
  scrollYProgress,
  [0, 0.3],
  [0, -100]
);

const heroOpacity = useTransform(
  scrollYProgress,
  [0, 0.25],
  [1, 0]
);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const params = {};

        if (theme !== "all") {
          params.theme = theme;
        }

        if (search.trim()) {
          params.search = search.trim();
        }

        const data = await getStories(params);

        setStories(data.stories || []);
      } catch (error) {
        console.error(
          "Failed to load stories:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [theme, search]);

  const themes = [
    "all",
    "Love",
    "Memories",
    "Life",
    "Heartbreak",
    "Dreams",
  ];

  return (
    <main className="stories-page">

      {/* HEADER */}

      <section className="stories-hero">

        <motion.p
          className="stories-eyebrow"
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
          }}
        >
          Little Worlds
        </motion.h1>

        <motion.p
          className="stories-description"
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
          Stories of love, memories,
          <br />
          loss, hope and everything between.
        </motion.p>

      </section>

      {/* FILTERS */}

      <section className="stories-controls container">

        <div className="theme-filter">
          {themes.map((item) => (
            <button
              key={item}
              className={
                theme === item
                  ? "active"
                  : ""
              }
              onClick={() => setTheme(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="story-search">
          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

      </section>

      {/* STORIES */}

      <section className="stories-grid container">

        {loading && (
          <div className="stories-loading">
            <motion.span
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ◌
            </motion.span>

            <p>
              Opening the worlds...
            </p>
          </div>
        )}

        {!loading && stories.length === 0 && (
          <div className="no-stories">
            <h2>No stories found.</h2>

            <p>
              Try another theme or search.
            </p>
          </div>
        )}

        {!loading &&
          stories.map((story, index) => (
            <StoryCard
              key={story._id}
              story={story}
              index={index}
            />
          ))}

      </section>

    </main>
  );
}

export default Stories;