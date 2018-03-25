const { assert } = require('chai');
const { generateRandomUrl } = require('../utils');
const { videoObject, createNewVideo, parseTextFromHTML, queryHTML } = require('../utils');


describe('User updating video changes the values', () => {
    it('see edit view', () => {

        // Setup
        const newVideo = new Video(videoObject());
        newVideo.save();

        // Exercise
        browser.url(`/videos/${newVideo._id}`);
        browser.click('#edit');

        // Verification
        const pageText = browser.getText('body');
        assert.include(pageText, newVideo.title);
    });
});