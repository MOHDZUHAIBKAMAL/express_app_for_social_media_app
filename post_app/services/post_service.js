const Post = require('../../shared/models/post_model');
const Follow = require('../../shared/models/user_follow_model');

class PostService {
  static async createPost(user_id, content, visibility) {
    try {
      const newPost = new Post({ user_id, content, visibility });
      await newPost.save();
      return newPost;
    } catch (error) {
      throw new Error('Failed to create post');
    }
  }

  static async getPostById(post_id) {
    try {
      return await Post.findById(post_id);
    } catch (error) {
      throw new Error('Failed to fetch post');
    }
  }

  static async getPostsByUser(user_id) {
    try {
      return await Post.find({ user_id });
    } catch (error) {
      throw new Error('Failed to fetch posts by user');
    }
  }

  static async explore(user_id) {
    try {
      const publicPosts = await Post.find({ visibility: 'public' });
      const followersOnlyPosts = await Post.find({
        visibility: 'followers_only',
        user_id: { 
          $in: await Follow.find({ follower_id: user_id }).followed_id 
        }
      });

      const allPosts = [...publicPosts, ...followersOnlyPosts];
      if (allPosts.length > 0) {
        const randomPost = allPosts[Math.floor(Math.random() * allPosts.length)];
        return randomPost;
      }
      return null;
    } catch (error) {
      throw new Error('Failed to fetch explore posts');
    }
  }

  static async getAllPosts() {
    try {
      return await Post.find().sort({ created_at: -1 });
    } catch (error) {
      throw new Error('Failed to fetch all posts');
    }
  }

  static async updatePost(post_id, new_content) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        post_id,
        { content: new_content },
        { new: true } // Return the updated document
      );
      return updatedPost;
    } catch (error) {
      throw new Error('Failed to update post');
    }
  }

  static async deletePost(post_id) {
    try {
      const deletedPost = await Post.findByIdAndDelete(post_id);
      return deletedPost;
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  }
}

module.exports = PostService;
