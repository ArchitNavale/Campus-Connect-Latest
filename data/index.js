// import mongoose from "mongoose";
const mongoose = require('mongoose');

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const users = [

  {
    _id: userIds[1],
    name: "Steve",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture:"https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706970286/userimages/p3_sfvotq.jpg",
    picturePath: "p3.jpeg",
    friends: [],
    location: "New York, CA",
    occupation: "Degenerate",
    viewedProfile: 12351,
    impressions: 55555,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    name: "Some",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    picture: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706972206/userimages/p4_kge0fe.jpg",
    friends: [],
    location: "Canada, CA",
    occupation: "Data Scientist Hacker",
    viewedProfile: 45468,
    impressions: 19986,
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    name: "Whatcha",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture:"https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706970145/userimages/p6_i5qixb.jpg",
    picturePath: "p6.jpeg",
    friends: [],
    location: "Korea, CA",
    occupation: "Educator",
    viewedProfile: 41024,
    impressions: 55316,
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
     name: "Jane",
    email: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture:"https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706969982/userimages/p5_baq10z.jpg",
    picturePath: "p5.jpeg",
    friends: [],
    location: "Utah, CA",
    occupation: "Hacker",
    viewedProfile: 40212,
    impressions: 7758,
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    name: "Harvey",
    email: "harveydunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    picture:"https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706969862/userimages/p7_itdcsz.jpg",
    friends: [],
    location: "Los Angeles, CA",
    occupation: "Journalist",
    viewedProfile: 976,
    impressions: 4658,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    name: "Carly",
    email: "carlyvowel@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture:"https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706969556/userimages/p8_hw1s0y.jpg",
    picturePath: "p8.jpeg",
    friends: [],
    location: "Chicago, IL",
    occupation: "Nurse",
    viewedProfile: 1510,
    impressions: 77579,
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
     name: "Jessica",
    email: "jessicadunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture:"https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706934516/userimages/p9_uqtziu.jpg",
    picturePath: "p9.jpeg",
    friends: [],
    location: "Washington, DC",
    occupation: "A Student",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },

];

const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    name: "Steve",
    location: "New York, CA",
    description: "Some really long random description",
    picturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1707037267/postimages/post1_hn2qhl.jpg",
    userPicturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706970286/userimages/p3_sfvotq.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: [ 

    ],
    report: new Map([

    ]),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    name: "Whatcha",
    location: "Korea, CA",
    description:
      "Another really long random description. This one is longer than the previous one.",
    picturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1707037378/postimages/post2_ufsrpf.jpg",
    userPicturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706970145/userimages/p6_i5qixb.jpg",
    likes: new Map([
      [userIds[7], true],
      [userIds[4], true],
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [ 

    ],
    report: new Map([

    ]),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    name: "Jane",
    location: "Utah, CA",
    description:
      "This is the last really long random description. This one is longer than the previous one.",
    picturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1707037477/postimages/post3_gy2tlz.jpg",
    userPicturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706969982/userimages/p5_baq10z.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
      [userIds[5], true],
    ]),
    comments: [ 

    ],
    report: new Map([

    ]),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    name: "Harvey",
    location: "Los Angeles, CA",
    description:
      "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
    picturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1707038317/postimages/post9_fhszkn.jpg",
    userPicturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706969862/userimages/p7_itdcsz.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
    ]),
    comments: [ 

    ],
    report: new Map([

    ]),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    name: "Carly",
    location: "Chicago, IL",
    description:
      "Just a short description. I'm tired of typing. I'm going to play video games now.",
    picturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1707037862/postimages/post5_tzpc5u.jpg",
    userPicturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706969556/userimages/p8_hw1s0y.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
      [userIds[5], true],
      [userIds[7], true],
    ]),
    comments: [ 

    ],
    report: new Map([

    ]),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    name: "Jessica",
    lastName: "Dunn",
    location: "Washington, DC",
    description:
      "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
    picturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1707037863/postimages/post6_mej5hu.jpg",
    userPicturePath: "https://res.cloudinary.com/campusconnect-rajdeep/image/upload/v1706934516/userimages/p9_uqtziu.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),
    report: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),

    comments: [ 

    ],
  },
];



module.exports= {
  posts, users
};