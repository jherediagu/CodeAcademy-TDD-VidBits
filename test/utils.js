const { jsdom } = require('jsdom');
const Video = require('../models/video');

const videoObject = (video = {}) => {
    const title = video.title || 'video title test';
    const url = video.imageUrl || 'https://www.youtube.com/embed/RcmrbNRK-jY';
    const description = video.description || 'video test description';
    return { title, url, description };
};

const createNewVideo = async (video = {}) => {
    const newVideo = await Video.create(videoObject(options));
    return newVideo;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
    const selectedElement = jsdom(htmlAsString).querySelector(selector);
    if (selectedElement !== null) {
        return selectedElement.textContent;
    } else {
        throw new Error(`No element with selector ${selector} found in HTML string`);
    }
};

const queryHTML = (htmlAsString, selector) => {
    return jsdom(htmlAsString).querySelector(selector);
};

const generateRandomUrl = (domain) => {
    return `http://${domain}/${Math.random()}`;
};


module.exports = {
    videoObject,
    createNewVideo,
    parseTextFromHTML,
    queryHTML,
    generateRandomUrl,
};