const { assert } = require('chai');

describe('user visits the create page', () => {
    describe('no existing videos', () => {
        it('create new video', () => {
            // Setup
            const title = "test-title";
            const description = "test-description";

            browser.url('create');
            // Exercise
            browser.setValue('#title', title);
            browser.setValue('#description', description);
            browser.click('#submit-button');
            // Verification
            assert.include(browser.getText('body'), title);
            assert.include(browser.getText('body'), description);
        });

    });
});