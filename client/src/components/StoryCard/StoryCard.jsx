import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "./StoryCard.css";

function StoryCard({ story, index }) {
  return (
    <motion.article
      className="story-card"
      initial={{
        opacity: 0,
        y: 60,
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
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -8,
      }}
    >
      <Link to={`/stories/${story.slug}`}>
        <div className="story-card-image">
          {/* Actual uploaded story cover */}
          {story.coverImage ? (
            <motion.img
              src={story.coverImage}
              alt={`${story.title} cover`}
              className="story-card-cover-image"
              whileHover={{
                scale: 1.04,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            />
          ) : (
            <motion.div
              className="story-card-orb"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Dark cinematic overlay */}
          <div className="story-card-overlay" />

          <div className="story-card-number">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="story-card-brand">
            30 LITTLE WORLDS
          </div>
        </div>

        <div className="story-card-content">
          <p className="story-card-theme">
            {story.theme}
          </p>

          <h2>{story.title}</h2>

          <p className="story-card-excerpt">
            {story.excerpt}
          </p>

          <div className="story-card-footer">
            <span>
              {story.readingTime} min read
            </span>

            <span className="story-card-arrow">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default StoryCard;