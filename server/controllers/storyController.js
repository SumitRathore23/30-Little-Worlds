const Story = require("../models/Story");

// Convert title into URL-friendly slug
const createSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Escape search text for MongoDB regex
const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * GET /api/stories
 * Public - Get all published stories
 */
const getStories = async (req, res) => {
  try {
    const { theme, search } = req.query;

    const filter = {
      published: true,
    };

    if (theme && theme !== "all") {
      filter.theme = {
        $regex: `^${escapeRegex(theme)}$`,
        $options: "i",
      };
    }

    if (search) {
      const searchRegex = {
        $regex: escapeRegex(search),
        $options: "i",
      };

      filter.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { theme: searchRegex },
      ];
    }

    const stories = await Story.find(filter)
      .select("-content")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: stories.length,
      stories,
    });
  } catch (error) {
    console.error("Get stories error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stories",
    });
  }
};

/**
 * GET /api/stories/featured
 * Public - Get featured published story
 */
const getFeaturedStory = async (req, res) => {
  try {
    const story = await Story.findOne({
      featured: true,
      published: true,
    }).select("-content");

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "No featured story found",
      });
    }

    res.status(200).json({
      success: true,
      story,
    });
  } catch (error) {
    console.error("Get featured story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch featured story",
    });
  }
};

/**
 * GET /api/stories/:slug
 * Public - Get full story
 * Includes previous, next and recommended stories
 */
const getStoryBySlug = async (req, res) => {
  try {
    const story = await Story.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    // Previous story
    const previous = await Story.findOne({
      published: true,
      createdAt: { $lt: story.createdAt },
    })
      .select("title slug excerpt coverImage theme createdAt")
      .sort({ createdAt: -1 });

    // Next story
    const next = await Story.findOne({
      published: true,
      createdAt: { $gt: story.createdAt },
    })
      .select("title slug excerpt coverImage theme createdAt")
      .sort({ createdAt: 1 });

    // Recommended stories from same theme
    const recommended = await Story.find({
      published: true,
      theme: story.theme,
      _id: { $ne: story._id },
    })
      .select("title slug excerpt coverImage theme readingTime createdAt")
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      story,
      navigation: {
        previous,
        next,
      },
      recommended,
    });
  } catch (error) {
    console.error("Get story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch story",
    });
  }
};

/**
 * GET /api/stories/admin/all
 * Admin - Get published + draft stories
 */
const getAdminStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: stories.length,
      stories,
    });
  } catch (error) {
    console.error("Get admin stories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin stories",
    });
  }
};

/**
 * POST /api/stories
 * Admin only - Create story
 */
const createStory = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      theme,
      coverImage,
      readingTime,
      featured,
      published,
    } = req.body;

    if (!title || !excerpt || !content || !theme) {
      return res.status(400).json({
        success: false,
        message: "Title, excerpt, content and theme are required",
      });
    }

    let slug = createSlug(title);

    // Prevent duplicate slug
    const existingStory = await Story.findOne({ slug });

    if (existingStory) {
      slug = `${slug}-${Date.now()}`;
    }

    // If this story is featured, remove featured from other stories
    if (featured === true) {
      await Story.updateMany(
        { featured: true },
        { $set: { featured: false } }
      );
    }

    const story = await Story.create({
      title,
      slug,
      excerpt,
      content,
      theme,
      coverImage: coverImage || "",
      readingTime: readingTime || 5,
      featured: featured || false,
      published: published || false,
    });

    res.status(201).json({
      success: true,
      message: "Story created successfully",
      story,
    });
  } catch (error) {
    console.error("Create story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create story",
    });
  }
};

/**
 * PUT /api/stories/:id
 * Admin only - Update story
 */
const updateStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    const {
      title,
      excerpt,
      content,
      theme,
      coverImage,
      readingTime,
      featured,
      published,
    } = req.body;

    if (title) {
      story.title = title;

      const newSlug = createSlug(title);

      const slugExists = await Story.findOne({
        slug: newSlug,
        _id: { $ne: story._id },
      });

      story.slug = slugExists
        ? `${newSlug}-${Date.now()}`
        : newSlug;
    }

    if (excerpt !== undefined) story.excerpt = excerpt;
    if (content !== undefined) story.content = content;
    if (theme !== undefined) story.theme = theme;
    if (coverImage !== undefined) story.coverImage = coverImage;
    if (readingTime !== undefined) story.readingTime = readingTime;
    if (published !== undefined) story.published = published;

    if (featured === true) {
      await Story.updateMany(
        {
          _id: { $ne: story._id },
          featured: true,
        },
        {
          $set: { featured: false },
        }
      );

      story.featured = true;
    } else if (featured === false) {
      story.featured = false;
    }

    await story.save();

    res.status(200).json({
      success: true,
      message: "Story updated successfully",
      story,
    });
  } catch (error) {
    console.error("Update story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update story",
    });
  }
};

/**
 * DELETE /api/stories/:id
 * Admin only - Delete story
 */
const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findByIdAndDelete(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.error("Delete story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete story",
    });
  }
};

module.exports = {
  getStories,
  getFeaturedStory,
  getStoryBySlug,
  getAdminStories,
  createStory,
  updateStory,
  deleteStory,
};