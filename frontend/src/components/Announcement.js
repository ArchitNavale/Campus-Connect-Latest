import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import axios from 'axios';
import { years } from '../common/year';
import { ToastContainer, toast } from 'react-toastify';
import { depts } from '../common/departments';
import { member } from '../common/clubmember';
const BASE_URL = 'http://localhost:7000';

const Announcement = () => {
  const [content, setContent] = useState('');
  const [year, setYear] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [department, setDepartment] = useState('');
  const [privateState, setPrivateState] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSaveClick = () => {
    axios
      .post(`${BASE_URL}/api/blog`, { content, year, by: user.user._id, department, club: user.user.club, deadline: selectedDate, isPrivate: privateState })
      .then(response => {
        if (response.data.success) {
          // console.log('Blog post saved successfully:', response.data.post);
          toast.success('Announcement posted successfully!');
        } else {
          console.error('Error saving blog post:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error saving blog post:', error);
      });
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'list',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'image',
    'video',
    'blockquote',
    'code-block',
    'align',
    'color',
    'background',
  ];

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };
  return (
    <>
    <div className='mainpage p-10 w-5/6 h-auto bg-white mt-10'>
      <h1 className='text-2xl text-gray-600 font-semibold p-3 '>Blog Announcement</h1>
      <div className='m-4'>
        <ReactQuill 
          className=''
          value={content}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          style={{
              color: '#000', // Set the default text color to black
          }}
          theme="snow"
        />
      </div>
      <div className='flex'>

        <div className="mb-4 ml-4">
          <label className="block mb-2 text-sm font-medium text-gray-800">
            Select year
          </label>

          <select
            name="year"
            onChange={(e) => setYear(e.target.value)}
            className="bg-white border text-gray-600 rounded px-3 py-2 outline-none"
          >
            <option value="" disabled>Select a  year</option>
            {years.map((year, i) => (
              <option className='text-black' key={i}>
                {year}
              </option>
            ))}
          </select>
        </div>


        <div className="mb-4 ml-4">
          <label className="block mb-2 ml-2 text-sm font-medium text-gray-800">
            Department
          </label>

          <select
            name="department"
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-white border rounded text-gray-600 px-3 py-2 outline-none"
          >
            <option value="" disabled>Select branch</option>
            {depts.map((year, i) => (
              <option key={i}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='text-black font-md ml-4'>
            Set Expiry Date 
            <input
              type="date"
              // value={selectedDate}
              // onChange={handleDateChange}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='text-black p-1 mt-2 ml-4 border-2 rounded'
            />
          </label>
        </div>
        <div className="text-black">
         
          For Club Members
           <input className='' type='checkbox' onChange={() => setPrivateState(!privateState)} />
        </div>
      </div>
      <button className='bg-blue-400 p-1 rounded-md text-white font-bold w-min h-min ml-5 shadow-md' onClick={() => {
        setIsClicked(true);
        handleSaveClick();
      }}
        disabled={isClicked}>Post Announcement</button>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
        </div>
    </>
  );
};

export default Announcement;
