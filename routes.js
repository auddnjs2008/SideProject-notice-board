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

const routes = {
  home: Home,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  board: BOARD,
  upload: UPLOAD,
  postDetail: POSTS_DETAIL,
  editPost: EDIT_POST,
  deletePost: DELETE_POST,
};

export default routes;
