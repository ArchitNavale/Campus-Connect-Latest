import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { showToast } from "../common/toast";
import { toast, ToastContainer } from "react-toastify";
const Registerstudent = () => {
    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState({});
    const handleChange = (
        e,
    ) => {
        let { name, value } = e.target;
        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };
let isSuperAdmin = false;

    const handleClick = () => {
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registrationData)
        })
            .then(res => res.json())
            .then((data) => {
                if (data?.isAdmin) {
                    localStorage.setItem("isAdmin", JSON.stringify({ isAdmin: true }));
                }
                if (data?.isSuper) {
                    localStorage.setItem("isSuper", JSON.stringify({ isSuper: true }));
                    // navigate('/super-admin')
                    // isSuperAdmin =
                }
                if (data?.user) {
                    localStorage.setItem("user", JSON.stringify({ user: data.user }));
                    toast.success('Signed in Successfully');
                    // navigate('/user-home');
                    setTimeout(() => {
                        navigate('/user-home');
                    }, 2300);
                    
                }
                if(data?.message) {
                    // console.log('hello')
                    toast.error('Invalid credentials. Please try again.');
                    // showToast({message: 'Login Failed'});
                }
            }).catch(err => console.log("login",err))
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-indigo-600 text-white py-4 px-6">
                    <h2 className="text-3xl font-extrabold">Login</h2>
                    {/* <p className="mt-2">LOgin vaiiii</p> */}
                </div>
                <div className="p-6 space-y-4">
                <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
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
                        onClick={handleClick}
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Login
                    </button>
                </div>
                <p className="mb-2 text-gray-600 text-sm text-center">
                    No account?{" "}
                    <Link
                        to="/register"
                        className=" text-indigo-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registerstudent;