import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Announcement from "./Announcement";
import Groupchat from "./Groupchat";
import ViewAnnoucements from "./ViewAnnoucements";
// import { member } from '../common/clubmember';
import EditIcon from "@mui/icons-material/Edit";
import ViewUsers from "./ViewUsers";
import { Image, Transformation } from 'cloudinary-react';
// import user from "../../../modals/user"
// import Navbar from './Navbar';

const Userhome = () => {
  const navigate = useNavigate();
  let isAdmin = localStorage.getItem("isAdmin");
  let isSuper = localStorage.getItem("isSuper");
  // const user = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedYear, setUpdatedYear] = useState("");
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [updatedImageName, setUpdatedImageName] = useState('');
  // console.log(user)
  // console.log('User Picture URL:', user.user.picture);

  const cloudinaryCloudName = 'campusconnect-rajdeep';

  const handleUpdateEmail = async () => {
    try {
      const response = await fetch("/updateemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.user?._id,
          email: updatedEmail,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Email updated successfully:", data.user);
        setUser((prevUser) => ({
          ...prevUser,
          user: {
            ...prevUser.user,
            email: data.user.email,
          },
        }));
        closeProfileModal();
      } else {
        console.error("Error updating email:", data.error);
      }
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleUpdateYear = async () => {
    try {
      const response = await fetch("/updateyear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.user?._id,
          year: updatedYear,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Year updated successfully:", data.user);

        setUser((prevUser) => ({
          ...prevUser,
          user: {
            ...prevUser.user,
            year: data.user.year,
          },
        }));

        closeProfileModal();
      } else {
        console.error("Error updating year:", data.error);
      }
    } catch (error) {
      console.error("Error updating year:", error);
    }
  };
   
  const handleCloudinaryUpload = () => {
    if (!updatedImage) {
        return Promise.resolve(null);
    }

    const formData = new FormData();
    formData.append('file', updatedImage);
    formData.append('upload_preset', 'userimage'); // Replace with your Cloudinary upload preset

    return fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => data.secure_url)
        .catch(error => {
            console.error('Error uploading image to Cloudinary:', error);
            return null;
        });
};

const handleUpdateImage = (e) => {
  const file = e.target.files[0];
  setUpdatedImage(file);
  setUpdatedImageName(file.name);
}


  const handleImageUpdate = async () => {
    const imageUrl = await handleCloudinaryUpload(updatedImage);
  
    if (imageUrl) {
      try {
        console.log(imageUrl)
      //   if(isAdmin){
      //     console.log("adminid",user?._id)
      //     const response = await fetch(`/update-image-admin/${user?.user?._id}`, {
      //     method: 'PATCH',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       picture: imageUrl,
      //       picturePath: updatedImageName,
      //     }),
      //   });
      //   }
      //   else {
      //     const response = await fetch(`/update-image/${user?.user?._id}`, {
      //     method: 'PATCH',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       picture: imageUrl,
      //       picturePath: updatedImageName,
      //     }),
      //   });
  
      //   }
        
      //   const data = await response.json();
      //   console.log(data)
      //   if (data.message === 'Profile image updated successfully') {
      //     // Update the user state with the new profile picture URL
      //     setUser((prevUser) => ({
      //       ...prevUser,
      //       user: {
      //         ...prevUser.user,
      //         picture: imageUrl,
      //         picturePath: updatedImageName,
      //       },
      //     }));
      //     closeProfileModal();
      //   } else {
      //     console.error('Error updating image from userhome:', data.error);
      //   }
      // } catch (error) {
      //   console.error('Error updating image:', error);
      // }
      if (isAdmin) {
        console.log("adminid", user?.user?._id);
        const response = await fetch(`/update-image-admin/${user?.user?._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            picture: imageUrl,
            picturePath: updatedImageName,
          }),
        });

        const data = await response.json();
        console.log(data);

        if (data.message === 'Profile image updated successfully') {
          // Update the user state with the new profile picture URL
          setUser((prevUser) => ({
            ...prevUser,
            user: {
              ...prevUser.user,
              picture: imageUrl,
              picturePath: updatedImageName,
            },
          }));
          closeProfileModal();
        } else {
          console.error('Error updating image from userhome:', data.error);
        }
      } else {
        const response = await fetch(`/update-image/${user?.user?._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            picture: imageUrl,
            picturePath: updatedImageName,
          }),
        });

        const data = await response.json();
        console.log(data);

        if (data.message === 'Profile image updated successfully') {
          // Update the user state with the new profile picture URL
          setUser((prevUser) => ({
            ...prevUser,
            user: {
              ...prevUser.user,
              picture: imageUrl,
              picturePath: updatedImageName,
            },
          }));
          closeProfileModal();
        } else {
          console.error('Error updating image from userhome:', data.error);
        }
      }
    } catch (error) {
      console.error('Error updating image:', error);
    }
    }
  };

  const renderAdminProfileModalContent = () => (
    <>
      <h1 className='text-2xl font-bold m-3 ml-5'> Admin Info</h1>
      <p className='mt-1'>Name: {user?.user?.name}</p>
      <p className='mt-1'>RollNo: {user?.user?.rollnumber}</p>
      <p className='mt-1'>Club Name: {user?.user?.club}</p>
      <p className='mt-1'>
        Profile Image: {isEditing ? 
        <input type='file' onChange={handleUpdateImage} /> :
        <Image publicId={user?.user?.picture} cloudName='campusconnect-rajdeep'>
          <Transformation width='15' height='15' crop='fill' />
        </Image>
        }
        {isEditing && 
          <button onClick={handleImageUpdate} style={{ backgroundColor: 'green', color: 'white', padding: '0px 8px', cursor: 'pointer', borderRadius: '4px' }}>Update</button>
       }
      </p>

      {!isEditing && (
        <button className='text-blue-500' onClick={handleEditClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M16 15v1a2 2 0 01-2 2H6m4-2H6'
            />
          </svg>
        </button>
      )}

    </>
  );

  const renderUserProfileModalContent = () => (
    <>
      <h1 className='text-2xl font-bold m-3 ml-5'> User Info</h1>
      <p className='mt-1'>Name: {user?.user?.name}</p>
      <p className='mt-1'>RollNo: {user?.user?.rollnumber}</p>
      <p className='mt-1'>
        Email: {isEditing ? <input type='text' value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} /> : user?.user?.email}
        {isEditing && <button onClick={handleUpdateEmail} style={{ backgroundColor: 'green', color: 'white', padding: '0px 8px', cursor: 'pointer', borderRadius: '4px' }}>Update</button>}
      </p>
      <p>
        Year: {isEditing ? <input type='text' value={updatedYear} onChange={(e) => setUpdatedYear(e.target.value)} /> : user?.user?.year}
        {isEditing && <button onClick={handleUpdateYear} style={{ backgroundColor: 'green', color: 'white', padding: '0px 8px', marginTop: '2px', marginLeft: '5px', cursor: 'pointer', borderRadius: '4px' }}>Update</button>}
      </p>
      <p className='mt-1'>Department: {user?.user?.department}</p>

      <p className='mt-1'>
        Profile Image: {isEditing ? 
        <input type='file' onChange={handleUpdateImage} /> :
        <Image publicId={user?.user?.picture} cloudName='campusconnect-rajdeep'>
          <Transformation width='15' height='15' crop='fill' />
        </Image>
        }
        {isEditing && 
          <button onClick={handleImageUpdate} style={{ backgroundColor: 'green', color: 'white', padding: '0px 8px', cursor: 'pointer', borderRadius: '4px' }}>Update</button>
       }
      </p>

      {!isEditing && (
        <button className='text-blue-500' onClick={handleEditClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M16 15v1a2 2 0 01-2 2H6m4-2H6'
            />
          </svg>
        </button>
      )}
    </>
  );

  const openProfileModal = () => {
    setProfileModalOpen(true);
    setIsEditing(false);

    setUpdatedEmail(user?.user?.email || "");
    setUpdatedYear(user?.user?.year || "");
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const [showChat, setShowChat] = useState(false);
  const [member, setMember] = useState([]);
  const fetchClubs = () => {
    console.log('inside')
    fetch("/get-clubs", {
      method: 'get'
    })
      .then(res => {
        console.log(res)
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        console.log(result)
        setMember(result);
      })
  }
  useEffect(() => {
    fetchClubs()
  }, []);
  // console.log('isss', isAdmin)
  if (isAdmin) {
    isAdmin = true;
  } else {
    isAdmin = false;
  }
  // const user = JSON.parse(localStorage.getItem('user'));
  const [component, setComponent] = useState(
    (isAdmin && !isSuper) ? "ANNOUNCEMENT" : "USERCHAT"
  );
  const [selectedClub, setSelectedClub] = useState("");
  const renderComponent = () => {
    console.log(component)
    switch (component) {
      case "ANNOUNCEMENT":
        return <Announcement />;
      // case 'USERCHAT':
      //     return (
      //         <Groupchat />
      //     )
      case "VIEWANNOUNCEMENT":
        return (
          <ViewAnnoucements
            club={selectedClub}
            showChat={showChat}
            setShowChat={setShowChat}
          />
        );
        case "VIEWUSERS":
          return(
            <ViewUsers />
          )
      // default:
      //     return (
      //         // <div>error</div>
      //     )
    }
  };
  // console.log(`members ${member}`)
  return (
    <div>
      <div className="h-14 w-full flex justify-between shadow-lg ">
        <h1 className="m-2 text-2xl font-bold">CAMPUS CONNECT</h1>
        <div className="flex">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>
          <img
            className="h-12 w-10 ml-8 mr-5 m-1 rounded-full object-cover"
            src=
            {user?.user?.picture}
            // {`${user.user.picture}?${Date.now(5)}`}
            onClick={() => openProfileModal()}
            alt="user image"
          />
        </div>
      </div>
      <div className="h-screen text-white p-0">
        <div className="h-full flex">
          <div className="w-1/6 h-full bg-sky-500 p-3 text-gray-600 pl-4">
            <h1 className="text-2xl text-white font-bold mb-4">Dashboard</h1>

            {isAdmin && !isSuper && (
              <div
                className="flex items-center"
                onClick={() => setComponent("ANNOUNCEMENT")}
              >
                <div className="bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-2 hover:pl-6 hover:shadow-lg">
                  {" "}
                  Announcements{" "}
                </div>
              </div>
            )}

            {/* Profile Modal */}
            {isProfileModalOpen && (
              <div className="fixed inset-1 overflow-y-auto flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black bg-opacity-10"></div>
                <div className="absolute top-4 right-4 bg-white p-10 rounded-lg z-50 ml-3">
                  <button
                    className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
                    onClick={() => closeProfileModal()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  {isAdmin
                    ? renderAdminProfileModalContent()
                    : renderUserProfileModalContent()}
                </div>
              </div>
            )}

                  {/* <h1 className="text-2xl font-bold m-3 ml-5"> User Info</h1>
                  <p className="mt-1">Name : {user?.user?.name}</p>
                  <p className="mt-1">RollNo : {user?.user?.rollnumber}</p>
                  <p className="mt-1">
                    Email:{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                      />
                    ) : (
                      user?.user?.email
                    )}
                    {isEditing && (
                      <button
                        onClick={handleUpdateEmail}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          padding: "0px 8px",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        Update
                      </button>
                    )}
                  </p>
                  <p>
                    Year:{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedYear}
                        onChange={(e) => setUpdatedYear(e.target.value)}
                      />
                    ) : (
                      user?.user?.year
                    )}
                    {isEditing && (
                      <button
                        onClick={handleUpdateYear}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          padding: "0px 8px",
                          marginTop: "2px",
                          marginLeft: "5px",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        Update
                      </button>
                    )}
                  </p>
                  <p className="mt-1">Department: {user?.user?.department}</p> */}

                  {/* {!isEditing && (
                    <button className="text-blue-500" onClick={handleEditClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 15v1a2 2 0 01-2 2H6m4-2H6"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )} */}
            {/* <div className="bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-2 hover:pl-6 hover:shadow-lg" onClick={() => setComponent('USERCHAT')}>
                            Group Chat
                        </div> */}

            <div className="flex flex-col cursor-pointer">
              {member?.map((_, i) => {
                const club = _?.club;
                if (club === "None") {
                  return <div></div>;
                }
                if (isAdmin && !isSuper) {
                  if (user.user.club === club) {
                    return (
                      <div
                        className="bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-2 hover:pl-6 hover:shadow-lg"
                        key={i}
                        onClick={() => {
                          setComponent("VIEWANNOUNCEMENT");
                          setShowChat(false);
                          // console.log("in user home,adf", showChat);
                          setSelectedClub(club);
                        }}
                      >
                        {club}
                      </div>
                    );
                  }
                } else {
                  return (
                    <div
                      className="bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-2 hover:pl-6 hover:shadow-lg"
                      key={i}
                      onClick={() => {
                        setSelectedClub(club);
                        setComponent("VIEWANNOUNCEMENT");
                        setShowChat(false);
                        // console.log("in user home,adf", showChat);
                      }}
                    >
                      {club}
                    </div>
                  );
                }
              })}
            </div>

            {!isAdmin && !isSuper && (
              <div
                className="bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-10 hover:pl-6 hover:shadow-lg"
                onClick={() => navigate("/socialmedia")}
              >
                Social Media
              </div>
            )}

            {isSuper && (
              <div
                className="bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-10 hover:pl-6 hover:shadow-lg"
                onClick={() => navigate("/sa")}
              >
               Add club
              </div>
            )}
            {isSuper && (
              <div
                className="bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-10 hover:pl-6 hover:shadow-lg"
                onClick={() => {
                  // setSelectedClub(club);
                  setComponent("VIEWUSERS");
                  // setShowChat(false);
                  // console.log("in user home,adf", showChat);
                }}
              >
                All users
              </div>
            )}
          </div>

          <div className="w-1/2 ml-auto mr-auto">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Userhome;
