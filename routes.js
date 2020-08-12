//Global

const Home = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Boards

const BOARD = "/board";
const UPLOAD = "/upload";
const POSTS_DETAIL = "/:id";
const EDIT_POST = "/:id/edit";
const DELETE_POST = "/:id/delete";

//GITHUB

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//naver

const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

const routes = {
  home: Home,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  board: BOARD,
  upload: UPLOAD,
  postDetail: (id) => {
    if (id) {
      return `/board/${id}`;
    } else {
      return POSTS_DETAIL;
    }
  },
  editPost: (id) => {
    if (id) {
      return `/board/${id}/edit`;
    } else {
      return EDIT_POST;
    }
  },
  deletePost: (id) => {
    if (id) {
      return `/board/${id}/delete`;
    } else {
      return DELETE_POST;
    }
  },

  github: GITHUB,
  githubcallback: GITHUB_CALLBACK,
  naver: NAVER,
  navercallback: NAVER_CALLBACK,
};

export default routes;
