import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { useSelector } from "react-redux";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Link } from 'react-router-dom'


const PersonalChatWidget = ({ userId }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const actualUser = useSelector((state) => state.user)

  if (userId === actualUser?._id) {
    return null; // Do not render the widget if it's the same user
  }

  return (
    <WidgetWrapper >
       {/* <FlexBetween > */}
        <div>
       <Typography color={dark} variant="h5" fontWeight="500" >
          Connect Personally  
        </Typography>
        </div>
        <div>
        <Link to={`/chat/${userId}`}><button  style={{
              padding: '8px 15px',
              fontSize: '16px',
              marginRight:'100px',
              backgroundColor: '#3498db',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '15px',
            }}>Chat Now !</button></Link>
            </div>
       {/* </FlexBetween> */}
     {/* <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:7000/assets/project.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Yedu Krishnan</Typography>
        <a href="https://yedu.is-a.dev" target="blank" style={{ textDecoration: "none" }}>   <Typography  color={medium}>yedu.is-a.dev</Typography> </a>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      "Discover the world through my code: Join me on a journey of learning, exploring, and creating!"
      </Typography> */} 
    </WidgetWrapper>
  );
};

export default PersonalChatWidget;
