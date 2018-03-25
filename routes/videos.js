const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res) => {

    const { title, description, url } = req.body;
    const newVideo = new Video({ title, description, url });

    if (!newVideo.title) {
        res.status(400).render('videos/create', { newVideo });
    } else {
        res.render(`/videos/${newVideo._id}`, { newVideo });
    }
});

router.get('/videos', async (req, res) => {
    res.render('videos/index');
});

router.get('/videos/create', async (req, res) => {
    res.render('videos/create');
});

router.get('/videos/:id', async (request, response) => {
    const newVideo = await findVideo(request);

    response.render('videos/show', { newVideo });
});

module.exports = router;