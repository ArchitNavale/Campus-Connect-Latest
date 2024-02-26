import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar/index";
import { useDispatch } from "react-redux";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import { setLogin } from "state";
import { useEffect } from "react";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  // const { _id, picturePath } = useSelector((state) => state.user);
  const userval = JSON.parse(localStorage.getItem('user'));
  const userdata = userval.user;
  console.log(userdata)
  const mylogin = async () => {
    const loggedInResponse = await fetch("http://localhost:7000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email: userdata.email, password: userdata.password}),
    });
    const loggedIn = await loggedInResponse.json();
    // console.log('d', loggedIn)
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
  }
  }
  useEffect(() => {
    mylogin();
  }, []);
  // console.log('uservv',userval)
  const user = useSelector((state) => state.user);
  const userId = user?._id; 
  const { _id, picturePath } = user || {};
  console.log("from home",user)
  return (
    <Box>
      <Navbar />
       <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id || ''} picturePath={user?.picture} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user?.picture || ''} />
          <PostsWidget userId={_id || ''} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box> 
    </Box>
  );
};

export default HomePage;
