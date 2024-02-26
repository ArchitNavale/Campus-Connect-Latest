const express = require('express');
const app = express()
const mongoose = require('mongoose');
const Announcement = mongoose.model("Announcement");
const router = express.Router();

router.post('/api/blog', async (req, res) => {
  const newAnnouncement = new Announcement({ ...req.body });
  newAnnouncement
    .save()
    .then(post => {
      // console.log(post)
      res.json({ success: true, post });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Error saving the blog post' });
    });
  //   const all = await Announcement.find({})
  //   console.log(all[0].content)
});


router.post('/getblog', async (req, res) => {
  const { department, year, club, likes } = req.body;
  // console.log('dept ', department)
  let newAnnouncements;
  if(department)
  newAnnouncements = await Announcement.find({
    department,
    year,
    club,
    deadline: { $gt: new Date() }
  });
  
  else {
    // console.log('m here')
    newAnnouncements = await Announcement.find({
      club,
      deadline: { $gt: new Date() }
    });
  }
  if (newAnnouncements) {
    res.json(newAnnouncements);
  }
});


router.post('/api/blog/like/:announcementId', async (req, res) => {
  const { announcementId } = req.params;
  const { userId } = req.body;

  try {
      const announcement = await Announcement.findById(announcementId);

      if (!announcement) {
          return res.status(404).json({ success: false, message: 'Announcement not found' });
      }

     // Check if the user has already liked the announcement
     const userLiked = announcement.likes.includes(userId);

     // Toggle the like status
     if (userLiked) {
         // User has already liked, remove the like
        //  announcement.likes = announcement.likes.filter(id => id !== userId);
        announcement.likes.pull(userId);
     } else {
         // User has not liked, add the like
         announcement.likes.push(userId);
     }

     await announcement.save();

     return res.json({ success: true, message: 'Like toggled successfully' });

  } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error adding like' });
  }
});


router.delete('/api/blog/delete/:announcementId', async (req, res) => {
  const { announcementId } = req.params;
  console.log(announcementId)

  try {
    const result = await Announcement.deleteOne({ _id: announcementId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }


  return res.json({ success: true, message: 'Announcement deleted successfully' });
} catch (err) {
  console.error(err);
  return res.status(500).json({ success: false, message: 'Error deleting announcement' });
}
});

module.exports = router;