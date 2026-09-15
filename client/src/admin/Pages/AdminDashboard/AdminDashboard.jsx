import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  getAdminStories,
  deleteStory,
} from "../../Utils/adminApi";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
  );

  const loadStories = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminStories();

      setStories(data.stories || []);
    } catch (error) {
      console.error(
        "Failed to load admin stories:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        navigate("/admin/login");
        return;
      }

      setError("Unable to load stories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  const handleDelete = async (story) => {
    const confirmed = window.confirm(
      `Delete "${story.title}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(story._id);

      await deleteStory(story._id);

      setStories((currentStories) =>
        currentStories.filter(
          (item) => item._id !== story._id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete story:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete story."
      );
    } finally {
      setDeleting(null);
    }
  };

  const publishedCount = stories.filter(
    (story) => story.published
  ).length;

  const draftCount = stories.filter(
    (story) => !story.published
  ).length;

  const featuredCount = stories.filter(
    (story) => story.featured
  ).length;

  return (
    <main className="admin-dashboard">

      {/* ================= NAVBAR ================= */}

      <header className="admin-navbar">

        <Link
          to="/admin/dashboard"
          className="admin-logo"
        >
          <span>30</span>
          LITTLE WORLDS
        </Link>

        <div className="admin-navbar-right">

          <div className="admin-user">
            <span className="admin-user-label">
              AUTHOR
            </span>

            <span className="admin-user-name">
              {admin.name || "Dipanshu"}
            </span>
          </div>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            LOGOUT
          </button>

        </div>

      </header>


      {/* ================= CONTENT ================= */}

      <section className="admin-dashboard-content">

        {/* ================= WELCOME ================= */}

        <motion.section
          className="admin-welcome"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div>

            <p className="admin-eyebrow">
              AUTHOR'S STUDIO
            </p>

            <h1>
              Welcome,
              <br />
              {admin.name || "Dipanshu"}.
            </h1>

            <span className="admin-welcome-note">
              Your stories. Your little worlds.
            </span>

          </div>

          <Link
            to="/admin/stories/new"
            className="admin-hero-button"
          >
            <span>CREATE A STORY</span>
            <span>→</span>
          </Link>

        </motion.section>


        {/* ================= STATS ================= */}

        <section className="admin-stats">

          <motion.div
            className="admin-stat"
            whileHover={{
              y: -5,
            }}
          >
            <span>{stories.length}</span>
            <p>TOTAL STORIES</p>
          </motion.div>

          <motion.div
            className="admin-stat"
            whileHover={{
              y: -5,
            }}
          >
            <span>{publishedCount}</span>
            <p>PUBLISHED</p>
          </motion.div>

          <motion.div
            className="admin-stat"
            whileHover={{
              y: -5,
            }}
          >
            <span>{draftCount}</span>
            <p>DRAFTS</p>
          </motion.div>

          <motion.div
            className="admin-stat"
            whileHover={{
              y: -5,
            }}
          >
            <span>{featuredCount}</span>
            <p>FEATURED</p>
          </motion.div>

        </section>


        {/* ================= STORIES HEADER ================= */}

        <section className="admin-stories-header">

          <div>
            <p className="admin-section-label">
              YOUR COLLECTION
            </p>

            <h2>
              Stories
            </h2>

            <span>
              {stories.length === 1
                ? "1 little world"
                : `${stories.length} little worlds`}
            </span>
          </div>

          <Link
            to="/admin/stories/new"
            className="new-story-button"
          >
            <span>+</span>
            NEW STORY
          </Link>

        </section>


        {/* ================= ERROR ================= */}

        {error && (
          <motion.div
            className="admin-error"
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            {error}
          </motion.div>
        )}


        {/* ================= LOADING ================= */}

        {loading && (
          <div className="admin-loading">

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
              Opening your collection...
            </p>

          </div>
        )}


        {/* ================= EMPTY ================= */}

        {!loading &&
          stories.length === 0 && (
            <motion.div
              className="admin-empty"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <span className="admin-empty-number">
                01
              </span>

              <h3>
                Your little worlds
                <br />
                are waiting.
              </h3>

              <p>
                Create your first story
                to begin the collection.
              </p>

              <Link to="/admin/stories/new">
                CREATE FIRST STORY
                <span>→</span>
              </Link>

            </motion.div>
          )}


        {/* ================= STORY LIST ================= */}

        {!loading &&
          stories.length > 0 && (
            <section className="admin-story-list">

              {/* TABLE HEADER */}

              <div className="admin-story-list-header">

                <span>STORY</span>
                <span>STATUS</span>
                <span>ACTIONS</span>

              </div>


              {stories.map((story, index) => (
                <motion.article
                  key={story._id}
                  className="admin-story-row"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >

                  {/* NUMBER */}

                  <div className="admin-story-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>


                  {/* COVER */}

                  <div className="admin-story-cover">

                    {story.coverImage ? (
                      <img
                        src={story.coverImage}
                        alt={`${story.title} cover`}
                      />
                    ) : (
                      <div className="admin-story-cover-placeholder">
                        <span>30</span>
                      </div>
                    )}

                  </div>


                  {/* STORY INFO */}

                  <div className="admin-story-main">

                    <div className="admin-story-title-row">

                      <h3>
                        {story.title}
                      </h3>

                      {story.featured && (
                        <span className="admin-featured">
                          FEATURED
                        </span>
                      )}

                    </div>

                    <div className="admin-story-meta">

                      <span>
                        {story.theme}
                      </span>

                      <span>
                        {story.readingTime || 1} min read
                      </span>

                    </div>

                  </div>


                  {/* STATUS */}

                  <div className="admin-story-status">

                    <span
                      className={
                        story.published
                          ? "published"
                          : "draft"
                      }
                    >
                      <i />
                      {story.published
                        ? "Published"
                        : "Draft"}
                    </span>

                  </div>


                  {/* ACTIONS */}

                  <div className="admin-story-actions">

                    <Link
                      to={`/admin/stories/edit/${story._id}`}
                      className="admin-edit-button"
                    >
                      EDIT
                    </Link>

                    {story.published &&
                      story.slug && (
                        <Link
                          to={`/stories/${story.slug}`}
                          className="admin-view-button"
                        >
                          VIEW
                        </Link>
                      )}

                    <button
                      className="admin-delete-button"
                      onClick={() =>
                        handleDelete(story)
                      }
                      disabled={
                        deleting === story._id
                      }
                    >
                      {deleting === story._id
                        ? "..."
                        : "DELETE"}
                    </button>

                  </div>

                </motion.article>
              ))}

            </section>
          )}


        {/* ================= FOOTER ================= */}

        <footer className="admin-dashboard-footer">

          <span>
            30 LITTLE WORLDS
          </span>

          <span>
            Author's private studio
          </span>

          <button onClick={handleLogout}>
            LOGOUT →
          </button>

        </footer>

      </section>

    </main>
  );
}

export default AdminDashboard;