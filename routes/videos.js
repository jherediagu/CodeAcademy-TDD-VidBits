const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res) => {

    const { title, description } = req.body;
    const newVideo = new Video({ title, description });

    console.log(newVideo);

    res.render('videos/show', { newVideo });
});

router.get('/videos', async (req, res) => {

    console.log('sss');

    res.render('videos/index');
});

router.get('/videos/create', async (req, res) => {

    res.render('videos/create');
});

module.exports = router;