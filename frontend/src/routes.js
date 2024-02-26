import Registerstudent from "./components/Registerstudent";
import Loginstudent from './components/Loginstudent'
import Groupchat from "./components/Groupchat";
export const routes = [
  {
    path: "/",
    element: <Loginstudent />,
  },
  {
    path: "/register",
    element: <Registerstudent />,
  },
  {
    path: "/groupchat/:club",
    element: <Groupchat />,
  },
  
];
