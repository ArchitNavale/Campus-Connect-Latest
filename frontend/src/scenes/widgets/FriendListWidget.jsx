import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  console.log(userId)
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  
  const friends = useSelector((state) => (state.user || {}).friends || []);
  // console.log(friends)


  const getFriends = async () => {
    // if (!userId) {
    //   return; // Add a check to ensure userId is defined
    // }
    const response = await fetch(
      `http://localhost:7000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log("API Response:", data);
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log("friend",friend)
  console.log("friends",friends)
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map((friend) => (
          // console.log("Friend Picture:", friend.picture);
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={friend.name}
            subtitle={friend.occupation}
            userPicturePath={friend.picture}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
