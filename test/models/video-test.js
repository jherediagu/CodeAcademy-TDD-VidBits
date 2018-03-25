const { assert } = require('chai');
const { mongoose, databaseUrl, options } = require('../../database');
const Video = require('../../models/video');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');

describe('checks that the Video model', () => {

  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  it('has a title that is a string', () => {

    // Setup
    const titleNotString = 2;

    // Exercise
    const newVideo = new Video({ title: titleNotString });

    // Verify
    assert.strictEqual(newVideo.title, titleNotString.toString());
  });

  it('has a description that is a string', () => {

    // Setup
    const descriptionNotString = 2;

    // Exercise
    const newVideo = new Video({ description: descriptionNotString });

    // Verify
    assert.strictEqual(newVideo.description, descriptionNotString.toString());
  });

  it('has a url that is a string', () => {

    // Setup
    const urlNotString = 2;

    // Exercise
    const newVideo = new Video({ url: urlNotString });

    // Verify
    assert.strictEqual(newVideo.url, urlNotString.toString());
  });
});

module.exports = {
  connectDatabase,
  disconnectDatabase,
}