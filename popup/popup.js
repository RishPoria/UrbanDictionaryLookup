const updatePopup = () => {
    chrome.storage.sync.get(['word', 'def'], function (data) {
        document.getElementById("word").innerText = data.def.length > 0 ? data.word : 'Select a word from the webpage';
        document.getElementById("def").innerText = data.def
    });
}    
document.addEventListener('DOMContentLoaded', updatePopup);