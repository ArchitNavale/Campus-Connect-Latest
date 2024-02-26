import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" , isPost = false}) => {
  if(!image?.includes('cloudinary')) {
    isPost = true;
  }
  const img = isPost ? `http://localhost:7000/assets/${image}` : image;
  // console.log(`rendering ${isPost}`, img)
  return (
    <Box width={size} height={size} style={{
        borderRadius: "50%",
        overflow: "hidden",
      }}>
      <img
        style={{ objectFit: "cover",overflow: "hidden",width: "100%",
        height: "100%", borderRadius: "50%" }}
        alt="user"
        src={img}
      
      />
    </Box>
  );
};

export default UserImage;

