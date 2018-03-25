const { assert } = require('chai');
const { generateRandomUrl } = require('../utils');
const { videoObject, createNewVideo, parseTextFromHTML, queryHTML } = require('../utils');

describe('User deleting video', () => {
    it('removes the Video from the list', () => {

        // Setup
        const newVideo = new Video(videoObject());
        newVideo.save();

        // Exercise
        browser.url(`/videos/${newVideo._id}`);
        browser.click('#delete');

        // Verification
        assert.notInclude(browser.getText('body'), title);
    });
});