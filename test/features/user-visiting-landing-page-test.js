const { assert } = require('chai');
const { generateRandomUrl } = require('../utils');
const { videoObject, createNewVideo, parseTextFromHTML, queryHTML } = require('../utils');



describe('user visits the landing page', () => {
    describe('no existing videos', () => {
        it('shows no videos', () => {
            // Setup
            browser.url('/');

            // Verification
            assert.equal(browser.getText('#videos-container'), '');
        });
        it('navigate to add new video', () => {
            // Setup
            browser.url('/');

            // Exercise
            browser.click('a[href="create"]');

            // Verification
            assert.include(browser.getText('body'), 'Save a video');
        });

    });


    describe('with existing video', () => {
        it('renders it in the list', async () => {

            // Setup
            const video = await Video.create();

            // Exercise
            browser.url('/');

            // Verification
            assert.equal(browser.getText('#videos-container'), video.title);
            assert.equal(browser.getText('#videos-container'), video.url);
            assert.equal(browser.getText('#videos-container'), video.description);
        });

        it('can navigate to the created video', async () => {

            // Setup
            const video = await Video.create();

            // Exercise
            browser.url('/');
            browser.click('.video-title');

            // Verification
            assert.include(browser.getText('body'), video.description);
            assert.include(browser.getText('body'), video.title);
        });

    });
});