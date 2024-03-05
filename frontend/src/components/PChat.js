import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from 'react-router-dom'
import io from "socket.io-client";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";

// const BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "http://localhost:5000";
// const socket = io(`${BASE_URL}`);

const PChat = () => {
    const user = useSelector((state) => state.user);
    const [chats, setChats] = useState([])
    const socket = useMemo(() => io("localhost:7000"), []);
    const { receiverId } = useParams();
    const senderId = user?._id;
    console.log("senderidhere",senderId)
    const [receiverPicture, setReceiverPicture] = useState(null);
    const senderpic = user?.picture;
    const [message, setMessage] = useState("");
    console.log("receiveridhere",receiverId)

     // Function to fetch receiver's picture
   const fetchReceiverPicture = async (receiverId) => {
    try {
        console.log("receiveridhere2",receiverId)
      const response = await fetch(`/api/getReceiverPicture?receiverId=${receiverId}`);
      const data = await response.json();
      setReceiverPicture(data.picture);
      console.log("receiverpicture",data.picture) // assuming the response structure has a 'picture' field
    } catch (error) {
      console.error("Error fetching receiver picture:", error);
      // Handle error or set a default receiver picture path
    //   setReceiverPicture("default-receiver-image.jpg");
    }
  };

    const handleMessages = useCallback(
        (messageData) => {
            const { sender, receiver, message } = messageData;
            if (sender === receiverId && receiver === senderId) {
                fetch(`/getmsgs?sender=${sender}&receiver=${receiver}`)
                    .then(res => res.json())
                    .then((result) => {
                        setChats(result);
                        if (result.length > 0) {
                            // Update receiverPicture based on the latest message
                            fetchReceiverPicture(receiverId);
                        }else {
                            // Handle the case when there are no messages
                            setReceiverPicture(null); // or set a default picture
                        }
                    }

                    )
                }
        },
        [receiverId, senderId]
    );

    useEffect(() => {
        socket.on("msgsolo", handleMessages);
        return () => {
            socket.off("msgsolo", handleMessages);
        };
    }, [socket, handleMessages]);

    useEffect(() => {
        fetch(`/getmsgs?sender=${senderId}&receiver=${receiverId}`)
            .then(res => res.json())
            .then((result) => {
                setChats(result);
                if (result.length > 0) {
                    fetchReceiverPicture(receiverId);
                }
            }
            
            )
    }, [receiverId, senderId]);
    const sendMessage = () => {
        if (message) {
            const messageData = {
                sender: senderId,
                senderpicture: senderpic,
                receiverpicture:receiverPicture,
                receiver: receiverId,
                message: message,
            };
            socket.emit("msgsolo", messageData);
            if (messageData.sender && messageData.receiver) {
                fetch('/setchats', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...messageData,
                    })
                })
                    .then(res => res.json())
                    .then((result) => setChats(result))
            }

            setMessage("");
        }
    };
    return (
        <div className="flex h-screen bg-gradient-to-r from-teal-200 to-blue-200">
            <div className="flex flex-col flex-auto bg-white w-3/5 mx-auto rounded-lg shadow-xl">
                <div className="overflow-y-auto p-4 flex-grow">
                    {chats && chats.length > 0 ? (
                        chats.map((chat, i) => {
                            if (
                                (chat.sender === senderId && chat.receiver === receiverId) ||
                                (chat.receiver === senderId && chat.sender === receiverId)
                            ) {
                                const formattedDate = new Date(chat.createdAt).toLocaleDateString();
                                const formattedTime = new Date(chat.createdAt).toLocaleTimeString();
                                
                                // Determine the user (sender or receiver) of the current message
                                const isSender = chat.sender === senderId;
                                const messageUser = isSender ? chat.sender : chat.receiver;

                                // Determine the picture based on the user of the current message
                                const messageUserPicture = isSender ? senderpic : receiverPicture;
                                
                                return (
                                    <div
                                        key={i}
                                        className={`flex ${chat.sender === senderId ? "justify-end" : "justify-start"
                                            } mb-4`}
                                    >
                                        <div
                                            className={`flex items-center ${chat.sender === senderId
                                                ? "justify-end"
                                                : "justify-start"
                                                }`}
                                        >
                                             {!isSender && (
                                                // <img
                                                //     src={messageUserPicture}
                                                //     alt={"receiver"}
                                                //     className="w-12 h-15 rounded-full mr-2"
                                                // />
                                                <UserImage
                                                 image={messageUserPicture}
                                                 size="50px"
                                                 isPost={false} // Set to false since it's not a post image
                                                 />
                                            )}
                                            <div
                                                className={`flex items-center justify-center p-3 rounded-lg text-white ${isSender
                                                    ? "bg-teal-500"
                                                    : "bg-blue-500"
                                                    }`}
                                                style={{ maxWidth: "75%", minWidth: "5%" }}
                                            >
                                                <span>{chat.message}</span>
                                                <div className="text-xs ml-2 text-gray-500">{formattedTime}, {formattedDate}</div>
                                            </div>
                                            {isSender && (
                                                // <img
                                                //     src={messageUserPicture}
                                                //     alt={"sender"}
                                                //     className="w-12 h-15 rounded-full ml-2"
                                                // />
                                                <UserImage
                                                 image={messageUserPicture}
                                                 size="50px"
                                                 isPost={false} // Set to false since it's not a post image
                                                 />
                                            )}
                                        </div>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No messages yet</p>
                        </div>
                    )}
                </div>
                <div className="flex items-center p-4">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-auto p-2 mr-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter your message"
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PChat;