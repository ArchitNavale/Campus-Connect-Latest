import React, { useState, useEffect } from "react";
import { depts } from '../common/departments';
import { years } from '../common/year';
import { Link } from 'react-router-dom'
import { member } from "../common/clubmember";
import { toast, ToastContainer } from "react-toastify";
import { Image, Transformation } from 'cloudinary-react';
import { useNavigate } from "react-router-dom";

const cloudinaryCloudName = 'campusconnect-rajdeep';

const Registerstudent = () => {
    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState({});
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const handleCheckboxChange = (value) => {
        if (selectedCheckboxes.includes(value)) {
            setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== value));
        } else {
            setSelectedCheckboxes([...selectedCheckboxes, value]);
        }
    };
    const handleChange = (
        e,
    ) => {
        let { name, value } = e.target;
        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setImageName(file.name);
    };

    // const handleImageChange = (e) => {
    //   const file = e.target.files[0];
    // //   console.log('file',file)
    //   setSelectedImage(file);
    //   setImageName(file.name); // Set the image name in the state
    // };

    const handleCloudinaryUpload = () => {
        if (!selectedImage) {
            return Promise.resolve(null);
        }

        const formData = new FormData();
        formData.append('file', selectedImage);
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



    useEffect(() => {
        setRegistrationData((prevData) => ({
            ...prevData,
            club: selectedCheckboxes,
        }));
    }, [selectedCheckboxes])
    // const handleClick = () => {

    //     if(!(registrationData?.name && registrationData?.department && registrationData?.year && registrationData?.email && registrationData?.password)) {
    //         toast.error('complete the form');
    //     }console.log(selectedImage)

    //     console.log(registrationData)

    const handleClick = async () => {

        const imageUrl = await handleCloudinaryUpload();

        const userData = {
            ...registrationData,
            club: selectedCheckboxes,
            picture: imageUrl,
            picturePath: imageName,
        };
        console.log(userData)
        fetch("/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify(registrationData)
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then((data) => {
            }).catch(err => console.log(err))
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5 ">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-indigo-600 text-white py-4 px-6">
                    <h2 className="text-3xl font-extrabold">Register</h2>
                    <p className="mt-2">Create an account and get started.</p>
                </div>
                <ToastContainer />
                <div className="p-6 space-y-4">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-800">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter your Name"
                        />

                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-800">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex items-center  justify-between mr-20">

                        <div className="mt-7 mb-auto">
                            <label className="block mb-2 text-sm font-medium text-gray-800">
                                Department
                            </label>

                            <select
                                name="department"
                                className="bg-white border rounded px-3 py-2 outline-none"
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select an option</option>
                                {depts.map((department, i) => (
                                    <option key={i}>
                                        {department}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 p-1">
                            {/* <label className="block mb-2 text-sm font-medium text-gray-800">
                                Club Member
                            </label>

                            <select
                                name="member"
                                className="bg-white border rounded px-3 py-2 outline-none"
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select an option</option>
                                {member.map((club, i) => (
                                    <option key={i}>
                                        {club}
                                    </option>
                                ))}
                            </select> */}
                            <label className="block mt-6 ml-3  text-sm font-medium text-gray-800">
                                Club Member
                            </label>

                            <div className=" flex-col"> {member.map((club) => {
                                if (club !== 'None') {
                                    return (
                                        <div className="ml-4">
                                            <input
                                                type="checkbox"
                                                value={club}
                                                onChange={() => handleCheckboxChange(club)}
                                            />
                                            {club}
                                        </div>
                                    )
                                }
                            })}</div>


                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-800">
                            Current Year Of Studying
                        </label>

                        <select
                            name="year"
                            onChange={handleChange}
                            className="bg-white border rounded px-3 py-2 outline-none"
                        >
                            <option value="" disabled>Select an option</option>
                            {years.map((year, i) => (
                                <option key={i}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-800">
                            Roll number
                        </label>
                        <input
                            type="string"
                            name="rollnumber"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter your Roll number"
                        />
                    </div>
                    {/* <div>
                        img:
                        <input type="file" onChange={handleImageChange} />
                    </div> */}

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-800">
                            Profile Picture
                        </label>
                        <input type="file" onChange={handleImageChange} />

                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-800">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={() => {
                            setIsClicked(true);
                            handleClick();
                            navigate('/');
                        }}
                        disabled={isClicked}
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Register
                    </button>
                </div>
                <p className="mb-2 text-gray-600 text-sm text-center">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className=" text-indigo-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registerstudent;