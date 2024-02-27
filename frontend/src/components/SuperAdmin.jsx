import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { showToast } from "../common/toast";
import { toast, ToastContainer } from "react-toastify";

function SuperAdmin() {
  const [club, setClub] = useState("");
  const [rollnumber, setRoll] = useState("");
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    
    fetch("/add-club", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        club,
        rollnumber,
        name,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log("superadmin", res));
      toast.success('Club added successfully');
      window.location.reload();
     
  };
  return (
    
    <>
    
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
      <div className="mt-10 ml-10">
        <h1 className="text-2xl">Add Club</h1>
        <div className="w-[50rem] h-[40rem] bg-sky-200 rounded-md  p-6">
          <div className="mb-4">
            <label htmlFor="clubName" className="block text-black-500">
              Club Name
            </label>
            <input
              id="clubName"
              type="text"
              onChange={(e) => setClub(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black-500">
              Username
            </label>
            <input
              id="username"
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="roll" className="block text-black-500">
              Roll
            </label>
            <input
              id="roll"
              type="text"
              onChange={(e) => setRoll(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pass" className="block text-black-500">
              Password
            </label>
            <input
              id="pass"
              type="password"
              onChange={(e) => setPass(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Club
          </button>
        </div>
      </div>
    </>
  );
}

export default SuperAdmin;
