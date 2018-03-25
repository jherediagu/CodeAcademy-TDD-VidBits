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

  it('is required', () => {

    // Setup
    const video = new Video({ title: null });

    // Exercise
    video.validateSync();

    // Verify
    assert.equal(video.errors.title.message, 'title is required');
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

  it('is required', () => {

    // Setup
    const video = new Video({ url: null });

    // Exercise
    video.validateSync();

    // Verify
    assert.equal(video.errors.url.message, 'a URL is required');
  });
});

module.exports = {
  connectDatabase,
  disconnectDatabase,
}