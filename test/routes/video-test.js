const { assert } = require('chai');
const request = require('supertest');
const app = require('../../app');
const Video = require('../../models/video');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const { jsdom } = require('jsdom');

const queryHTML = (htmlAsString, selector) => {
    return jsdom(htmlAsString).querySelector(selector);
};

const parseTextFromHTML = (htmlAsString, selector) => {
    const selectedElement = queryHTML(htmlAsString, selector);

    if (selectedElement !== null) {
        return selectedElement.textContent.trim();
    } else {
        throw new Error('no element selected');
    }
};

const video = {
    title: 'title-test',
    description: 'description-test',
};

describe('Routes video test', () => {

    beforeEach(connectDatabase);
    afterEach(disconnectDatabase);

    it('check video page created', async () => {

        // Exercise
        const response = await request(app)
            .post(`/videos`)
            .type('form')
            .send(video);

        // Verify
        const pageText = parseTextFromHTML(response.text, 'body');
        assert.include(pageText, video.title);
    })

    describe('POST', () => {
        it('/videos result 201', async () => {

            // Exercise
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(video);

            // Verify
            assert.equal(response.status, 200);
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

    });

    describe('GET', () => {
        describe('/videos/:id', () => {

            it('show the Video', async () => {
                const video = await Video.create({
                    title: 'title test',
                    description: 'description test',
                });

                const response = await request(app).get(`/videos/${video._id}`);

                const pageText = parseTextFromHTML(response.text, 'body');
                assert.include(pageText, video.title);
                assert.include(pageText, video.description);
            });
        });
    });
});
