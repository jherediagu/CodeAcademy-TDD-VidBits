const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', (req, res) => {

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

router.get('/videos/:id/edit', async (req, res) => {
    const { id } = req.params;
    const newVideo = await Video.findById(id, (error) => {
        if (error) res.render('error', { error });
    });

    res.render('videos/edit', { newVideo });
});


router.post('/update', async (req, res) => {

    const { title, description, url, id } = req.body;

    await Video.update({ _id: id }, { title, description, url }, {}, (error) => {
        if (error) {
            res.status(400).redirect(`/videos/${id}/edit`);
        }
    });

    res.redirect(`/videos/${id}`);
});

router.post('/videos/:id/deletions', async (req, res) => {

    const { id } = req.params;

    await Video.findOneAndRemove({ _id: id }, (error) => {
        res.redirect('/');
    });
});


module.exports = router;