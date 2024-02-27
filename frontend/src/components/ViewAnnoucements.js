import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import Groupchat from './Groupchat';
import { IconButton, Typography } from '@mui/material';
import { FavoriteBorderOutlined, FavoriteOutlined, DeleteOutlined } from '@mui/icons-material';
const ViewAnnoucements = ({ club, showChat, setShowChat }) => {
const [loader, setLoader ]=useState(true)
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.user?.name?.toLowerCase().includes('admin');
    const isSuper = localStorage.getItem('isSuper')
    // console.log(user)
    // console.log('isAdmin:', isAdmin);
    const [annouce, setAnnouce] = useState([]);
    useEffect(() => {
        setShowChat(false);
    }, []);
    
    useEffect(() => {
        // console.log('inn')
        fetch('/getblog', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                department: user?.user?.department,
                year: user.user.year,
                club: club,
            })
        })
            .then(res => res.json())
            .then((result) => {
                console.log('changuuuuu',result)
                setAnnouce(result)
                setLoader(false)

            })
    }, [club]);

    const handleLike = async (announcementId) => {
      const userId = user?.user?._id;

      if (!userId) {
          // Handle the case where user is not logged in
          return;
      }

      try {
          const response = await fetch(`/api/blog/like/${announcementId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId }),
          });

          const result = await response.json();

  if (result.success) {
    // Reload announcements or update state as needed
    // console.log('Like added or removed successfully');
    // setAnnouce(prevAnnouncements => {
    //     return prevAnnouncements.map(announcement => {
    //         if (announcement._id === announcementId) {
    //             // Check if the user has already liked the announcement
    //             const userLiked = announcement.likes.includes(userId);

    //             // Update the likes array based on the user's current like status
    //             const updatedLikes = userLiked
    //                 ? announcement.likes.filter(id => id !== userId) // Remove like
    //                 : [...announcement.likes, userId]; // Add like

    //             return { ...announcement, likes: updatedLikes };
    //         }
    //         return announcement;
    //     });
    // });
} else {
    console.error('Error toggling like:', result.message);
}
} catch (error) {
console.error('Error toggling like:', error.message);
}
};  

 
const handleDelete = async (announcementId) => {
    try {
      const response = await fetch(`/api/blog/delete/${announcementId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

    //   if (result.success) {
    //     setAnnouce((prevAnnouncements) =>
    //       prevAnnouncements.filter((announcement) => announcement._id !== announcementId)
    //     );

    //     toast.success('Announcement deleted successfully');
    //   } else {
    //     toast.error('Error deleting announcement');
    //   }
    } catch (error) {
      console.error('Error deleting announcement:', error.message);
      toast.error('Error deleting announcement');
    }
  };


    const modules = {
        toolbar: false, // Hide the toolbar
    };
    // console.log('clubya4321', annouce)
    return (
        <div className=' text-black m-8 font-semibold border-2 rounded-md'>
             <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
            {!showChat && !loader && annouce?.map((ele, i) => {
                if (ele?.isPrivate === false) {
                    console.log('pra pro',ele)
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '15px' }} key={i} className=''>
                            <ReactQuill
                                defaultValue={ele.content}
                                readOnly={true}
                                modules={modules}
                            />
                            <div style={{display: 'flex', alignItems: 'center' }}>
                          <IconButton onClick={() => handleLike(ele._id)}>
                            {ele.likes.includes(user?.user?._id) ? (
                                <FavoriteOutlined color="primary" />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography style={{ fontSize: '16px' }} variant="subtitle1">{ele.likes.length} </Typography>
                        {/* {user?.user?.isAdmin && (
                            <IconButton onClick={() => handleDelete(ele._id)}>
                             <DeleteOutlined />
                             </IconButton>
                  )} */}
                     {isAdmin && !isSuper &&  (
                     <IconButton   style={{ marginLeft: '450px' }}  onClick={() => handleDelete(ele._id)}>
                         <DeleteOutlined />
                     </IconButton>
)}
                        </div>
                  
                        </div>
                    )
                }
                else if (ele?.isPrivate === true && user.user?.club?.includes(club) === true) {
                    // console.log(ele)
                    return (
                        
                        <div key={i} className=''>
                            <ReactQuill
                                defaultValue={ele.content}
                                readOnly={true}
                                modules={modules}
                                
                            />
                         
                        </div>
                    )
                }
            })}
           {!showChat &&<button className='absolute top-20 p-4 text-white w-40 rounded-full shadow-lg text-xl bg-sky-500 right-10' onClick={() => setShowChat(true)}>Chat</button> } 
           {showChat && <Groupchat club={club}/>}
        </div>
    )
};
export default ViewAnnoucements;

