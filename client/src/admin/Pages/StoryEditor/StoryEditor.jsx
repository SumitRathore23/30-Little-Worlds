import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  getAdminStories,
  createStory,
  updateStory,
} from "../../Utils/adminApi";

import "./StoryEditor.css";

function StoryEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    theme: "Love",
    readingTime: 5,
    coverImage: "",
    content: "",
    featured: false,
    published: false,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

/* =========================================
   LOAD STORY FOR EDITING
========================================= */

useEffect(() => {
  if (!isEditing) {
    return;
  }

  const loadStory = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminStories();

      const story = (data.stories || []).find(
        (item) => item._id === id
      );

      if (!story) {
        setError("Story not found.");
        return;
      }

      setForm({
        title: story.title || "",
        excerpt: story.excerpt || "",
        theme: story.theme || "Love",
        readingTime: story.readingTime || 5,
        coverImage: story.coverImage || "",
        content: story.content || "",
        featured: Boolean(story.featured),
        published: Boolean(story.published),
      });
    } catch (error) {
      console.error(
        "Failed to load story:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        navigate("/admin/login");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to load story."
      );
    } finally {
      setLoading(false);
    }
  };

  loadStory();
}, [id, isEditing, navigate]);


  /* =========================================
     FORM CHANGE
  ========================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================================
     FILE SELECT
  ========================================= */

  const handleFileSelect = (file) => {
    setError("");

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, PNG and WEBP images are allowed."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image must be smaller than 5 MB."
      );
      return;
    }

    setSelectedFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setCoverPreview(previewUrl);
  };

  const handleFileInput = (event) => {
    const file =
      event.target.files?.[0];

    if (file) {
      handleFileSelect(file);
    }
  };

  /* =========================================
     DRAG & DROP
  ========================================= */

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      handleFileSelect(file);
    }
  };

  /* =========================================
     REMOVE COVER
  ========================================= */

  const handleRemoveCover = () => {
    setSelectedFile(null);
    setCoverPreview("");

    setForm((current) => ({
      ...current,
      coverImage: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================
     UPLOAD COVER
  ========================================= */

  const uploadCoverImage = async () => {
    if (!selectedFile) {
      return form.coverImage;
    }

    const token =
      localStorage.getItem("adminToken");

    if (!token) {
      throw new Error(
        "Your admin session has expired. Please login again."
      );
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append(
        "image",
        selectedFile
      );

      const response = await fetch(
        "http://localhost:5000/api/uploads/image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Image upload failed."
        );
      }

      setForm((current) => ({
        ...current,
        coverImage: data.image.url,
      }));

      setSelectedFile(null);

      return data.image.url;
    } finally {
      setUploading(false);
    }
  };

  /* =========================================
     SAVE STORY
  ========================================= */

  const handleSubmit = async (publish) => {
    setError("");

    if (!form.title.trim()) {
      setError(
        "Please enter a story title."
      );
      return;
    }

    if (!form.content.trim()) {
      setError(
        "Please write the story content."
      );
      return;
    }

    try {
      setSaving(true);

      let coverImage =
        form.coverImage;

      if (selectedFile) {
        coverImage =
          await uploadCoverImage();
      }

      const storyData = {
        ...form,

        title: form.title.trim(),

        excerpt:
          form.excerpt.trim(),

        content:
          form.content.trim(),

        readingTime:
          Number(form.readingTime),

        coverImage,

        published: publish,
      };

      if (isEditing) {
        await updateStory(
          id,
          storyData
        );
      } else {
        await createStory(
          storyData
        );
      }

      navigate(
        "/admin/dashboard"
      );
    } catch (error) {
      console.error(
        "Failed to save story:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to save story. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const busy =
    saving || uploading;

  return (
    <main className="story-editor-page">

      {/* =========================================
          NAVBAR
      ========================================= */}

      <header className="editor-navbar">

        <Link
          to="/admin/dashboard"
          className="editor-back"
        >
          <span>←</span>
          <span>BACK TO STUDIO</span>
        </Link>

        <Link
          to="/admin/dashboard"
          className="editor-logo"
        >
          <span>30</span>
          LITTLE WORLDS
        </Link>

        <div className="editor-author">
          <small>AUTHOR</small>
          <span>
            DIPANSHU THAKUR
          </span>
        </div>

      </header>


      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <section className="editor-header">

        <motion.p
          className="editor-eyebrow"
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
          AUTHOR'S STUDIO
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 45,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
        >
          {isEditing
            ? "Edit story."
            : "A new little world."}
        </motion.h1>

        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
        >
          Write something worth remembering.
        </motion.span>

      </section>


      {/* =========================================
          EDITOR
      ========================================= */}

      <section className="story-editor-container">

        {error && (
          <motion.div
            className="editor-error"
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <span>!</span>
            {error}
          </motion.div>
        )}


        <div className="editor-layout">

          {/* =====================================
              MAIN COLUMN
          ===================================== */}

          <div className="editor-main">

            {/* TITLE */}

            <section className="editor-section">

              <div className="editor-section-heading">
                <span>01</span>

                <div>
                  <small>
                    STORY DETAILS
                  </small>

                  <h2>
                    Give it a name.
                  </h2>
                </div>
              </div>

              <label className="editor-field">

                <span>TITLE</span>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Sparrow and the Eagle"
                />

              </label>


              <label className="editor-field">

                <span>EXCERPT</span>

                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="A short introduction to your story..."
                  rows="4"
                />

              </label>

            </section>


            {/* COVER */}

            <section className="editor-section">

              <div className="editor-section-heading">
                <span>02</span>

                <div>
                  <small>
                    STORY COVER
                  </small>

                  <h2>
                    Give it a face.
                  </h2>
                </div>
              </div>

              <div className="editor-field">

                <span>COVER IMAGE</span>

                <div
                  className={`cover-upload ${
                    dragActive
                      ? "drag-active"
                      : ""
                  } ${
                    coverPreview ||
                    form.coverImage
                      ? "has-image"
                      : ""
                  }`}
                  onDragOver={
                    handleDragOver
                  }
                  onDragLeave={
                    handleDragLeave
                  }
                  onDrop={handleDrop}
                >

                  {coverPreview ||
                  form.coverImage ? (

                    <div className="cover-upload-preview">

                      <img
                        src={
                          coverPreview ||
                          form.coverImage
                        }
                        alt="Story cover preview"
                      />

                      <div className="cover-upload-overlay">

                        <button
                          type="button"
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                        >
                          CHANGE COVER
                        </button>

                        <button
                          type="button"
                          onClick={
                            handleRemoveCover
                          }
                          className="remove-cover"
                        >
                          REMOVE
                        </button>

                      </div>

                    </div>

                  ) : (

                    <div className="cover-upload-empty">

                      <div className="cover-upload-icon">
                        ↑
                      </div>

                      <h3>
                        Upload Cover
                      </h3>

                      <p>
                        Drag & drop your cover image here
                      </p>

                      <small>
                        JPG • PNG • WEBP • Maximum 5 MB
                      </small>

                      <button
                        type="button"
                        className="choose-cover-button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                      >
                        CHOOSE IMAGE
                      </button>

                    </div>

                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={
                      handleFileInput
                    }
                    hidden
                  />

                </div>

              </div>

            </section>


            {/* STORY */}

            <section className="editor-section">

              <div className="editor-section-heading">
                <span>03</span>

                <div>
                  <small>
                    THE STORY
                  </small>

                  <h2>
                    Open the world.
                  </h2>
                </div>
              </div>

              <label className="editor-field story-content-field">

                <span>
                  STORY CONTENT
                </span>

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Begin writing your story..."
                  rows="22"
                />

                <small className="editor-writing-note">
                  Separate paragraphs with an empty line.
                </small>

              </label>

            </section>

          </div>


          {/* =====================================
              SIDEBAR
          ===================================== */}

          <aside className="editor-sidebar">

            {/* STORY SETTINGS */}

            <section className="editor-sidebar-card">

              <div className="editor-card-heading">

                <small>
                  04 · SETTINGS
                </small>

                <h3>
                  Story details
                </h3>

              </div>


              <label className="editor-field">

                <span>THEME</span>

                <select
                  name="theme"
                  value={form.theme}
                  onChange={handleChange}
                >
                  <option value="Love">
                    Love
                  </option>

                  <option value="Memories">
                    Memories
                  </option>

                  <option value="Life">
                    Life
                  </option>

                  <option value="Heartbreak">
                    Heartbreak
                  </option>

                  <option value="Dreams">
                    Dreams
                  </option>

                  <option value="Hope">
                    Hope
                  </option>
                </select>

              </label>


              <label className="editor-field">

                <span>
                  READING TIME
                </span>

                <div className="reading-time-input">

                  <input
                    type="number"
                    name="readingTime"
                    min="1"
                    max="120"
                    value={
                      form.readingTime
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <span>
                    MIN
                  </span>

                </div>

              </label>

            </section>


            {/* FEATURE */}

            <section className="editor-sidebar-card">

              <div className="editor-card-heading">

                <small>
                  05 · COLLECTION
                </small>

                <h3>
                  Visibility
                </h3>

              </div>


              <label className="featured-toggle">

                <input
                  type="checkbox"
                  name="featured"
                  checked={
                    form.featured
                  }
                  onChange={
                    handleChange
                  }
                />

                <span className="toggle-ui" />

                <div>
                  <strong>
                    Feature this story
                  </strong>

                  <small>
                    Show this story in the featured area.
                  </small>
                </div>

              </label>

            </section>


            {/* SAVE */}

            <section className="editor-publish-card">

              <div className="editor-publish-symbol">
                ✦
              </div>

              <small>
                READY TO SHARE?
              </small>

              <h3>
                Give this world
                <br />
                a place to live.
              </h3>

              <p>
                Save it privately as a draft,
                or publish it for your readers.
              </p>


              <div className="editor-actions">

                <motion.button
                  type="button"
                  className="draft-button"
                  disabled={busy}
                  onClick={() =>
                    handleSubmit(false)
                  }
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  {uploading
                    ? "UPLOADING..."
                    : saving
                      ? "SAVING..."
                      : "SAVE DRAFT"}
                </motion.button>


                <motion.button
                  type="button"
                  className="publish-button"
                  disabled={busy}
                  onClick={() =>
                    handleSubmit(true)
                  }
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  {uploading
                    ? "UPLOADING..."
                    : saving
                      ? "PUBLISHING..."
                      : "PUBLISH STORY →"}
                </motion.button>

              </div>

            </section>


            {/* BACK */}

            <Link
              to="/admin/dashboard"
              className="editor-cancel-link"
            >
              ← Return to your collection
            </Link>

          </aside>

        </div>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="editor-footer">

        <span>
          30 LITTLE WORLDS
        </span>

        <span>
          DIPANSHU THAKUR · AUTHOR'S STUDIO
        </span>

      </footer>

    </main>
  );
}

export default StoryEditor;