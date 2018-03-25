const { assert } = require('chai');
const request = require('supertest');
const app = require('../../app');
const Video = require('../../models/video');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const { videoObject, createNewVideo, parseTextFromHTML, queryHTML, generateRandomUrl } = require('../utils');
const { jsdom } = require('jsdom');

const video = videoObject();

describe('Routes video test', () => {

    beforeEach(connectDatabase);
    afterEach(disconnectDatabase);

    it('check video is created', async () => {

        // Exercise
        const response = await request(app)
            .post('/videos')
            .type('form')
            .send(video);
        const createdVideo = await Video.findOne(video);

        // Verify
        assert.equal(createdVideo.title, video.title);
        assert.equal(createdVideo.url, video.url);
        assert.equal(createdVideo.description, video.description);
    })

    describe('POST', () => {
        it('/videos result 302', async () => {

            // Exercise
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(video);

            // Verify
            assert.equal(response.status, 302);
        });

        describe('submits a video with a title and description', () => {
            it('create a video and check if exists', async () => {

                // Exercise
                const response = await request(app)
                    .post('/videos')
                    .type('form')
                    .send(video);

                const checkVideo = await Video.findOne(video);

                // Verify
                assert.equal(checkVideo.title, video.title);
                assert.equal(checkVideo.url, video.url);
                assert.equal(checkVideo.description, video.description);
            });
        });

        describe('empty title', () => {
            it('only creates the video if the title is present', async () => {

                // Setup
                const emptyTitleVideo = { description: 'test-description' };

                // Exercise
                const response = await request(app)
                    .post('/videos')
                    .type('form')
                    .send(emptyTitleVideo);

                const checkVideo = await Video.find(emptyTitleVideo);

                // Verify
                assert.equal(response.status, 400);
            });
        });

        it('displays error message when title is empty', async () => {
            // Setup
            const invalidVideo = {
                title: "",
                description: "description test",
            };

            // Exercise
            const response = await request(app)
                .post(`/videos`)
                .type('form')
                .send(invalidVideo);

            // Verify
            assert.equal(response.status, 400);
        });

        it('displays the old data when title is empty', async () => {
            // Setup
            const invalidVideo = {
                title: "",
                description: "description test",
            };

            // Exercise
            const response = await request(app)
                .post(`/videos`)
                .type('form')
                .send(invalidVideo);

            // Verify
            const pageText = parseTextFromHTML(response.text, 'body');
            assert.include(pageText, invalidVideo.description);
        });

        it('/videos saves a Video document', async () => {

            // Exercise
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(video);
            const createdVideo = await Video.findOne(video);

            // Verify
            assert.equal(response.headers.location, `/videos/${createdVideo._id}`);
        });

        it('Send description, when the title is missing preserves the other field values', async () => {
            // Setup
            const invalidVideo = {
                title: "",
                description: "test description",
                url: "",
            };

            // Exercise
            const response = await request(app)
                .post('/videos/')
                .type('form')
                .send(invalidVideo);

            // Verify
            assert.equal(response.status, 400);
            assert.include(parseTextFromHTML(response.text, '#description'), 'test description');
        });

        it('no URL, when the title is missing preserves the other field values', async () => {
            // Setup
            const invalidVideo = {
                title: "",
                url: "",
            };

            // Exercise
            const response = await request(app)
                .post('/videos/')
                .type('form')
                .send(invalidVideo);

            // Verify
            assert.equal(response.status, 400);
        });
    });

    describe('GET', () => {
        describe('/videos/:id', () => {

            it('show the video', async () => {

                // Setup
                const newVideo = new Video(videoObject());

                // Exercise
                newVideo.save();
                const response = await request(app).get(`/videos/${newVideo._id}`);

                // Verification
                const pageText = parseTextFromHTML(response.text, '#video-title');
                assert.include(pageText, newVideo.title);
            });
        });
    });
});
