import Main from "../../../pages/Main/components/Main/Main";
import PostInfo from "../../../pages/PostInfo/components/PostInfo/PostInfo";

const ROUTES = [
  {
    path: '/posts/:postID',
    element: <PostInfo />,
  },
  {
    path: '/',
    element: <Main />,
  }
];

export default ROUTES;