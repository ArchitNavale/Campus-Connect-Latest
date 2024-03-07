import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SuperAdmin() {
    const [club, setClub] = useState('');
    const [email, setEmail] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [rollnumber ,setRoll] = useState('');
    const [name ,setName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [password ,setPass] = useState('');
    const navigate = useNavigate();
    const cloudinaryCloudName = 'campusconnect-rajdeep';

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImageName(file.name);
  };
     
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

    const handleClick = async () => {
      const imageUrl = await handleCloudinaryUpload();
      const picture= imageUrl;
         const picturePath= imageName;
    
        // console.log(picture);
      
        fetch('/add-club', {
            method:'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                club,
                rollnumber,
                name,
                email,
                password,
                picture,
                picturePath
            })
        }).then(res=>res.json()).then((res) => console.log('superadmin', res))
    }
  return (
    // <div className='text-black-500 bg-green-200'>
    //   want to add club?
    //   Enter Club Name:
    //   <input type='text' onChange={(e) => setClub(e.target.value)}/>
    //  name: <input type='text' onChange={(e) => setName(e.target.value)}/>
    //  roll: <input type='text' onChange={(e) => setRoll(e.target.value)}/>
    //  pass: <input type='text' onChange={(e) => setPass(e.target.value)}/>
    //   <button onClick={handleClick}>Add club</button>
    // </div>

<div className="min-h-screen flex items-center justify-center bg-gray-100 p-5 ">
<div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="bg-indigo-600 text-white py-4 px-6">
        <h2 className="text-3xl font-extrabold">Super Admin Page</h2>
        <p className="mt-2">Create Club and Admin for that club </p>
    </div>
    <ToastContainer />
    <div className="p-6 space-y-4">
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
                Club Name:
            </label>
            <input
                type="text"
                name="name"
                // onChange={handleChange}
                onChange={(e) => setClub(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter Club Name"
            />

        </div>

        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
                Admin Name:
            </label>
            <input
                type="text"
                name="adminname"
                // onChange={handleChange}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter Admin Name"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
                Email:
            </label>
            <input
                type="text"
                name="email"
                // onChange={handleChange}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter Admin Email Id "
            />
        </div>
       

                    
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-800">
                            Profile Picture:
                        </label>
                        <input type="file" onChange={handleImageChange} />

                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-800">
                            Roll number:
                        </label>
                        <input
                            type="string"
                            name="rollnumber"
                            // onChange={handleChange}
                            onChange={(e) => setRoll(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter your Roll number"
                        />
                    </div>
  

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-800">
                            Password:
                        </label>
                        <input
                            name="password"
                            type="password"
                            // onChange={handleChange}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={() => {
                          
                            handleClick();
                            setIsClicked(true);
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
            
  )
}

export default SuperAdmin;
