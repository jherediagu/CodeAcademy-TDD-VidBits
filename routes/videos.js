const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res) => {

    const { title, description, url } = req.body;
    const newVideo = new Video({ title, description, url });

    newVideo.save();

    if (!newVideo.title) {
        res.status(400).render('videos/create', { newVideo });
    } else {
        res.redirect(`/videos/${newVideo._id}`);
    }
});

router.get('/videos', async (req, res) => {
    const videos = await Video.find({});

    res.render('videos/index', { videos });

});

router.get('/videos/create', async (req, res) => {
    res.render('videos/create');
});

router.get('/videos/:id', async (req, res) => {
    const { id } = req.params;
    const newVideo = await Video.findById(id, (error) => {
        if (error) res.render('error', { error });
    });

    res.render('videos/show', { newVideo });
});

module.exports = router;