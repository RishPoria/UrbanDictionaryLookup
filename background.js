import { options } from './config.js';

chrome.runtime.onInstalled.addListener(async () => {
    for (const cs of chrome.runtime.getManifest().content_scripts) {
        for (const tab of await chrome.tabs.query({url: cs.matches})) {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: cs.js
            });
        }
    }
});

const gotMessage = (request, _sender, _sendResponse) => {
    let word = request.text;
    chrome.storage.sync.set({ word });
    if (word !== 'Select a word from the webpage.'){
        fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`, options)
        .then(response => response.json())
        .then(response => chrome.storage.sync.set({ def: response.list[0] ? response.list[0].definition: '' }))
        .catch(err => console.error(err));
    } else {
        chrome.storage.sync.set({ def: ''})
    }
}

chrome.runtime.onMessage.addListener(gotMessage);