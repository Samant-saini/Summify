document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['researchNotes'], function(result) {
        if (result.researchNotes) {
            document.getElementById('notes').value = result.researchNotes;
        }
    });

    document.getElementById('answerBtn').addEventListener('click', answerQuestions);
    document.getElementById('saveNotesBtn').addEventListener('click', saveNotes);
});

async function answerQuestions() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => document.body.innerText
        });

        if (!result) {
            showResult("No visible text found");
            return;
        }

        const response = await fetch('http://localhost:8080/api/research/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: result, operation: 'answer' })
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`API error: ${response.status} - ${text}`);
        }

        const text = await response.text();
        showResult(text.replace(/\n/g, '<br>'));

    } catch (error) {
        showResult("Error: " + error.message);
    }
}

function saveNotes() {
    const notes = document.getElementById('notes').value;
    chrome.storage.local.set({
        'researchNotes': notes
    }, function() {
        alert('Notes saved successfully');
    });
}

function showResult(content) {
    document.getElementById('results').innerHTML =
        `<div class="result-item"><div class="result-content">${content}</div></div>`;
}
