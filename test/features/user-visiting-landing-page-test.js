const { assert } = require('chai');

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
        it('renders it in the list', () => {

            // Setup
            const title = 'An existing video';

            // Exercise
            browser.url('/');

            // Verification
            assert.equal(browser.getText('#videos-container'), title);
        });

    });
});