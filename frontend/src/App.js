import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Home from './components/Home';
import Registerstudent from "./components/Registerstudent";
import Loginstudent from "./components/Loginstudent";
import Userhome from "./components/Userhome";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";
import ViewAnnoucements from "./components/ViewAnnoucements";
import Groupchat from "./components/Groupchat";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import AdminPage from "scenes/adminPage";
import ChatPage from "scenes/chatPage";
import HomePage from "scenes/homePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import SuperAdmin from "components/SuperAdmin";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="/socialmedia" element={<HomePage />} />
            {/* <Route
              path="/chat"
              element={isAuth ? <ChatPage /> : <Navigate to="/" />}
            /> */}
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route
              path="/admin"
              element={isAuth ? <AdminPage /> : <Navigate to="/" />}
            />
            <Route exact path="/" element={<Loginstudent />} />
            <Route exact path="/register" element={<Registerstudent />} />
            <Route exact path="/user-home" element={<Userhome />} />
            <Route
              exact
              path="/viewAnnoucements/:club"
              element={<ViewAnnoucements />}
            />
            <Route exact path="/groupchat/:club" element={<Groupchat />} />
            <Route exact path="/sa" element={<SuperAdmin />} />,
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

// const App = () => {
//   // Inside this component, you can use useRoutes() or define routes using Route components.
//   return (
//     <BrowserRouter>
//      <Routes>
//       {/* <Route element={<Navbar/>}/> */}
//       <Route exact path="/" element={<Loginstudent />} />
//       <Route exact path="/register" element={<Registerstudent />} />
//       <Route exact path="/user-home" element={<Userhome />} />
//       <Route exact path = '/viewAnnoucements/:club'  element={<ViewAnnoucements />} />
//       <Route exact path="/groupchat/:club" element={<Groupchat />} />
//     </Routes>

//     </BrowserRouter>
//   );
// }
export default App;
