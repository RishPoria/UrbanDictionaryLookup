const wordSelected = () => {
    let selectedText = window.getSelection().toString().trim();
    const message = {
        text: (selectedText.length > 0 ? selectedText : 'Select a word from the webpage.')
    };
    chrome.runtime.sendMessage(message);
}

chrome.runtime.sendMessage({text: 'Select a word from the webpage.'})
window.addEventListener('mouseup', wordSelected);
