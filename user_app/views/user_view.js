class UserView {
  static renderUsers(users) {
    return { users };
  }

  static renderUser(user) {
    return {
      user: {
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        bio: user.bio,
      },
    };
  }

  static renderSuccess(message, id) {
    return { message, id };
  }

  static renderError(message) {
    return { error: message };
  }

  static renderFollowedIds(follows) {
    return { follows };
  }
}

module.exports = UserView;
