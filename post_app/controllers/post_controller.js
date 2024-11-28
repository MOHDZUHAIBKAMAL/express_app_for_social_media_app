const PostService = require('../services/post_service');
const PostView = require('../views/post_view');

class PostController {
  static async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      if (!posts || posts.length === 0) {
        return res.status(404).json(PostView.renderError('No posts available'));
      }
      return res.status(200).json(PostView.renderPosts(posts));
    } catch (error) {
      return res.status(500).json(PostView.renderError('Failed to fetch posts'));
    }
  }

  static async explore(req, res) {
    try {
      const { user_id } = req.body;
      if (!user_id) {
        return res.status(400).json(PostView.renderError('Missing user_id in request data'));
      }

      const explorePosts = await PostService.explore(user_id);
      if (!explorePosts || explorePosts.length === 0) {
        return res.status(404).json(PostView.renderError('No posts found in explore'));
      }
      return res.status(200).json(PostView.renderPosts(explorePosts));
    } catch (error) {
      return res.status(500).json(PostView.renderError('Failed to fetch explore posts'));
    }
  }

  static async getPost(req, res) {
    try {
      const { post_id } = req.params;
      const post = await PostService.getPostById(post_id);
      if (!post) {
        return res.status(404).json(PostView.renderError('Post not found'));
      }
      return res.status(200).json(PostView.renderPost(post));
    } catch (error) {
      return res.status(500).json(PostView.renderError('Failed to fetch post'));
    }
  }

  static async createPost(req, res) {
    try {
      const { user_id, content, visibility = 'public' } = req.body;
      if (!user_id || !content) {
        return res.status(400).json(PostView.renderError('Missing required fields: user_id, content'));
      }

      const post = await PostService.createPost(user_id, content, visibility);
      if (!post) {
        return res.status(500).json(PostView.renderError('Failed to create post'));
      }
      return res.status(201).json(PostView.renderSuccess('Post created successfully', post.post_id));
    } catch (error) {
      return res.status(500).json(PostView.renderError('Failed to create post'));
    }
  }

  static async updatePost(req, res) {
    try {
      const { post_id } = req.params;
      const { content } = req.body;
      if (!content) {
        return res.status(400).json(PostView.renderError('Missing content in request data'));
      }

      const post = await PostService.updatePost(post_id, content);
      if (!post) {
        return res.status(404).json(PostView.renderError('Post not found'));
      }
      return res.status(200).json(PostView.renderSuccess('Post updated successfully', post.post_id));
    } catch (error) {
      return res.status(500).json(PostView.renderError('Failed to update post'));
    }
  }

  static async deletePost(req, res) {
    try {
      const { post_id } = req.params;
      const post = await PostService.deletePost(post_id);
      if (!post) {
        return res.status(404).json(PostView.renderError('Post not found'));
      }
      return res.status(200).json(PostView.renderSuccess('Post deleted successfully', post.post_id));
    } catch (error) {
      return res.status(500).json(PostView.renderError('Failed to delete post'));
    }
  }
}

module.exports = PostController;


        