class PostView {
  static renderPost(post) {
    return {
      post_id: post._id, // Assuming MongoDB ObjectId is stored in `_id`
      user_id: post.user_id,
      content: post.content,
      created_at: post.created_at,
      updated_at: post.updated_at,
      visibility: post.visibility
    };
  }

  static renderPosts(posts) {
    return posts.map(PostView.renderPost);
  }

  static renderError(message) {
    return { error: message };
  }

  static renderSuccess(message, post_id = null) {
    const response = { message };
    if (post_id) {
      response.post_id = post_id;
    }
    return response;
  }
}

module.exports = PostView;
