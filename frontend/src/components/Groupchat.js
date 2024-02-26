import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
import io from "socket.io-client";
const BASE_URL = "http://localhost:7000";
const API_BASE_URL = "http://localhost:7000/api";
const socket = io(`${BASE_URL}`);
//const BASE_URL = 'http://localhost:7000';
const Groupchat = ({ club }) => {
  const [messages, setMessages] = useState([]);
  // const {club} = useParams();
  // console.log('inchat club is', club);
  const userString = JSON.parse(localStorage.getItem('user'));
  const userId = userString.user._id;
  const userName = userString.user.name;
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // console.log('msgsare', messages);
  useEffect(() => {
    fetch(`http://localhost:7000/all-group-messages?club=${club}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('datayaaaaaaaaaa is', data);
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);




  // const handleMessages = useCallback(({ message, senderId, senderName, createdAt }) => {
  //   setMessages((prevMessages) => [...prevMessages, { message, senderId, senderName, createdAt }]);
  //   console.log('msg', messages);
  // }, []);
  // useEffect(() => {
  //   socket.on("message", handleMessages);
  //   return () => {
  //     socket.off("message", handleMessages);
  //   };
  // }, [socket, handleMessages]);




  const sendMessage = () => {
    const senderId = JSON.parse(localStorage.getItem("user"))._id;
    socket.emit("message", {
      message: inputValue,
      senderId: userId,
      senderName: userName,
      club: club,
      createdAt: new Date().toISOString(),
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: inputValue,
        senderId: userId,
        senderName: userName,
        createdAt: new Date().toISOString(),
      },
    ]);
  

    // fetch(`http://localhost:7000/save-group-message`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     message: inputValue,
    //     sender_name: userName,
    //     sender_id: userId,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => { console.log('pranav') })
    //   .catch((error) => {
    //     console.error("Error saving message:", error);
    //   });

    setInputValue("");
  };


  return (
    <>
      <div className=' text-3xl font-bold text-blue-500 mt-10'><h1>Groupchat</h1></div>
      <div className="mt-8 bg-white text-black shadow-lg rounded-lg">
        <div className="space-y-4 overflow-x-hidden overflow-scroll h-[35rem] ">
          {
            messages?.map((message, index) => (
              <div key={index} className="text-black flex m-0 p-2 odd:bg-gray-100">
                <p>
                  <span className="font-semibold ">{message?.senderName}:</span> {message?.message}
                </p>
                {/* Add a timestamp if needed */}
                <span className="text-gray-500 ml-auto mr-0 text-sm">
                  {new Date(message?.createdAt).toLocaleTimeString([], {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>

              </div>
            ))
            
            }
        </div>
        <div className="flex items-center space-x-2">
          <input
            className="flex-grow border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Type your message here..."
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
export default Groupchat;
/*import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const BASE_URL = "http://localhost:7000";
const API_BASE_URL = "http://localhost:7000/api";
const socket = io(`${BASE_URL}`);

export default function GroupChat() {
  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/all-group-messages`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    fetch(
      `${API_BASE_URL}/user/${JSON.parse(localStorage.getItem("user"))._id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setUserId(result._id);
        setUserName(result.name);
      });
  }, []);

  const sendMessage = () => {
    const senderId = JSON.parse(localStorage.getItem("user"))._id;

    socket.emit("message", {
      message: inputValue,
      sender_name: username,
      sender_id: senderId,

      createdAt: new Date().toISOString(),
    });

    fetch(`${API_BASE_URL}/save-group-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: inputValue,
        sender_name: username,
        sender_id: senderId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error saving message:", error);
      });

    setInputValue("");
  };
  return (
    <div >
      <div >
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              <div>{message.sender_name}</div>
              <div>{message.message}</div>
              <span>
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div >
        <input
          placeholder="Type your message here..."
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={sendMessage} >
          Send
        </button>
      </div>
    </div>
  );
  
};
*/