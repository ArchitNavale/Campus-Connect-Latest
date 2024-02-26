import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,

  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
  const [isSearchDropdownVisible, setIsSearchDropdownVisible] = useState(false);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [renderList, setRenderList] = useState([]);
  const [val, setVal] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = user ? `${user.name}` : '';
  useEffect(() => {
    if (val.trim() === "") {
      setRenderList([]);
      return;
    }
    fetch(`/searching/${val}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then((res) => {
        // if (res.status !== 200) {
        //   return []
        // }
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json()
      })
      .then((result) => {
        setRenderList(result);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [val])
  // console.log('hmya', renderList);
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/socialmedia")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Campus Connect
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase  placeholder="Search..." onChange={(e) => {
              setVal(e.target.value);
              setIsSearchDropdownVisible(true);
            }} />
            {/* <IconButton className=" flex-col text-left absolute top-32 right-60 shadow-lg z-999999 bg-white h-10">
              
              <div className="flex-col">
                {renderList?.map((ele, i) => {
                  return (
                    <>
                      <p className="bg-white w-96 p-4 ">
                        <Link to={`/profile/${ele._id}`} className='bg-gray-400 '>  <p className="bg-white " key={i} > {ele.name} </p> </Link>
                      </p>
                    </>)
                })}
              </div>
            </IconButton> */}
            {isSearchDropdownVisible && renderList.length > 0 &&(
            <IconButton
              className="flex-col text-left absolute top-32 right-60 shadow-lg z-999999 bg-white h-10"
              style={{ zIndex: 999999 }}
            >
              <div className="flex-col ">
                {renderList?.map((ele, i) => (
                  <p className="bg-white " key={i}>
                    <Link to={`/profile/${ele._id}`} className="bg-gray-400">
                      <p className="bg-white w-70 p-4">{ele.name}</p>
                    </Link>
                  </p>
                ))}
              </div>
            </IconButton>
          )}


          </FlexBetween>
        )}
      </FlexBetween>


      {/* DESKTOP NAV */}
      {
        isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            {/* <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton> */}
            {/* <Message sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}   onClick={() => navigate("/chat")}/> */}

            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
              // input={<InputBase />}
              // input =</>
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                {/* <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem> */}
                <MenuItem onClick={() => { navigate('/user-home') }}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )
      }

      {/* MOBILE NAV */}
      {
        !isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              {/* <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton> */}
              <Message sx={{
                fontSize: "25px",
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }} onClick={() => navigate("/chat")} />

              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )
      }
    </FlexBetween >
  );
};

export default Navbar;
