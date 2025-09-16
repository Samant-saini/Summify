document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['researchNotes'], function(result) {
        if (result.researchNotes) {
            document.getElementById('notes').value = result.researchNotes;
        }
    });

    document.getElementById('summarizeBtn').addEventListener('click',summarizeText)
    document.getElementById('saveNotesBtn').addEventListener('click',saveNotes)
});
async function summarizeText() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => window.getSelection().toString()
        });

        if (!result) {
            showResult("please select some text");
            return;
        }
        const response = await fetch('http://localhost:8080/api/research/process',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({content:result, operation:'summarize'})
        });
        if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error: ${response.status} - ${text}`);
}
const text = await response.text();
showResult(text.replace(/\n/g, '<br>'));

    } catch (error) {
        showResult("error"+error.message);

    }

}
async function saveNotes() {
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


// document.addEventListener('DOMContentLoaded', () => {
//     const getTextBtn = document.getElementById('getTextBtn');
//     const summarizeBtn = document.getElementById('summarizeBtn');
//     const saveNotesBtn = document.getElementById('saveNotesBtn');

//     // Restore saved notes on load
//     chrome.storage.local.get(['researchNotes'], function (result) {
//         if (result.researchNotes) {
//             document.getElementById('notes').value = result.researchNotes;
//         }
//     });

//     if (getTextBtn) getTextBtn.addEventListener('click', getTextFromGoogleForm);
//     if (summarizeBtn) summarizeBtn.addEventListener('click', summarizeText);
//     if (saveNotesBtn) saveNotesBtn.addEventListener('click', saveNotes);
// });

// // Extract questions & options from Google Form
// async function getTextFromGoogleForm() {
//     try {
//         const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//         const [{ result }] = await chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             function: () => {
//                 let output = "";
//                 const questionElems = document.querySelectorAll('span.M7eMe');

//                 questionElems.forEach((qElem, index) => {
//                     const questionText = qElem.innerText.trim();
//                     output += `Q${index + 1}: ${questionText}\n`;

//                     const questionBlock = qElem.closest('.M4DNQ')?.parentElement;
//                     if (questionBlock) {
//                         const options = questionBlock.querySelectorAll(
//                             'span.aDTYNe.snByac.OvPDhc.OIC90c, span.aDTYNe.snByac.OvPDhc'
//                         );
//                         options.forEach((optElem, optIndex) => {
//                             const optText = optElem.innerText.trim();
//                             if (optText) {
//                                 output += `  ${String.fromCharCode(97 + optIndex)}) ${optText}\n`;
//                             }
//                         });
//                     }
//                     output += "\n";
//                 });
//                 return output || "No questions found.";
//             }
//         });

//         document.getElementById('notes').value = result || "";
//     } catch (error) {
//         showResult("Error: " + error.message);
//     }
// }

// // Summarize whatever is in the textarea
// async function summarizeText() {
//     try {
//         const content = document.getElementById('notes').value.trim();

//         if (!content) {
//             showResult("Please get text first or type something in notes.");
//             return;
//         }

//         const response = await fetch('http://localhost:8080/api/research/process', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ content, operation: 'summarize' })
//         });

//         if (!response.ok) {
//             const text = await response.text();
//             throw new Error(`API error: ${response.status} - ${text}`);
//         }

//         const text = await response.text();
//         showResult(text.replace(/\n/g, '<br>'));
//     } catch (error) {
//         showResult("Error: " + error.message);
//     }
// }

// // Save notes
// async function saveNotes() {
//     const notes = document.getElementById('notes').value;
//     chrome.storage.local.set({ 'researchNotes': notes }, function () {
//         alert('Notes saved successfully');
//     });
// }

// // Display result
// function showResult(content) {
//     document.getElementById('results').innerHTML =
//         `<div class="result-item"><div class="result-content">${content}</div></div>`;
// }
