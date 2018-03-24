const { assert } = require('chai');
const request = require('supertest');
const app = require('../../app');
const Video = require('../../models/video');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const { jsdom } = require('jsdom');

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

});