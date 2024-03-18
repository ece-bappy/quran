// script.js
document.getElementById('quoteBtn').addEventListener('click', getQuranicVerse);

function getQuranicVerse() {
    var quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.style.opacity = '0'; // Reset opacity

    var verseNumber = Math.floor(Math.random() * 6236) + 1;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.alquran.cloud/v1/ayah/${verseNumber}/en.asad`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var verseData = JSON.parse(xhr.responseText).data;
            displayVerse(verseData, quoteDisplay);
        }
    };

    xhr.send();
}

function displayVerse(verse, quoteDisplay) {
    quoteDisplay.innerHTML = `
        <blockquote>
            <p>${verse.text}</p>
            <footer>${verse.surah.name} (${verse.surah.englishName}) - ${verse.numberInSurah}</footer>
        </blockquote>
    `;

    // Update the height of quoteDisplay based on its content
    quoteDisplay.style.height = quoteDisplay.scrollHeight + 'px';

    // Reveal the quoteDisplay section with animation
    quoteDisplay.style.display = 'block';
    setTimeout(function() {
        quoteDisplay.style.opacity = '1';
    }, 100);
}
