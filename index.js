const cardContainer = document.getElementById('cardContainer');

fetch('./matches.json')
    .then((response) => {
        return response.json();
    })
    .then((matches) => {
        localStorage.setItem('matches', JSON.stringify(matches));
        populateMatchSelector(matches);
        displayMatch(matches[0]);
    });



function populateMatchSelector(matches) {
    const matchSelector = document.getElementById("matchSelector");
    matchSelector.innerHTML = "<option value=''>Select a Match</option>";

    const roundFilter = document.getElementById("roundFilter");
    roundFilter.innerHTML = "<option value=''>All Rounds</option>";

    const uniqueRounds = [...new Set(matches.map(match => match.Round))]; // Collect unique round values

    uniqueRounds.forEach(round => {
        const option = document.createElement("option");
        option.value = round;
        option.textContent = round;
        roundFilter.appendChild(option);
    });

    matches.forEach((match, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${match['Team 1']} vs ${match['Team 2']}`;
        matchSelector.appendChild(option);
    });
}
function displayMatch(match) {
    cardContainer.innerHTML = `
        <div class="match">
            <h1> Round: ${match.Round} </h1>
            <h2>${match['Team 1']} vs ${match['Team 2']}</h2>
            <p>Date: ${match.Date}</p>
            <p>Final Score: ${match.FT}</p>
        </div>
    `;
}

function showSelectedMatch() {
    const matchSelector = document.getElementById("matchSelector");
    const selectedIndex = matchSelector.value;
    if (selectedIndex !== "") {
        localStorage.setItem("count", selectedIndex);
        const matches = JSON.parse(localStorage.getItem('matches'));
        displayMatch(matches[selectedIndex]);
    }
}

function filterMatchesByRound() {
    const selectedRound = roundFilter.value;
    const matches = JSON.parse(localStorage.getItem('matches'));
    const filteredMatches = selectedRound ? matches.filter(match => match.Round === selectedRound) : matches;
    populateMatchSelector(filteredMatches);
}



function showNextMatch() {
    let currentIndex = Number(localStorage.getItem("count"));
    const matches = JSON.parse(localStorage.getItem('matches'));
    if (currentIndex < matches.length - 1) {
        currentIndex++;
        localStorage.setItem("count", currentIndex);
        displayMatch(matches[currentIndex]);
    }
}

function showPreviousMatch() {
    let currentIndex = Number(localStorage.getItem("count"));
    if (currentIndex > 0) {
        currentIndex--;
        localStorage.setItem("count", currentIndex);
        const matches = JSON.parse(localStorage.getItem('matches'));
        displayMatch(matches[currentIndex]);
    }
}

function quoteAlert() {
    console.log("Button Clicked!")
    alert("Hechale Ganas!")
}

function deleteCard() {
    let matches = JSON.parse(localStorage.getItem('matches'));
    matches.shift();
    localStorage.setItem('matches', JSON.stringify(matches));
    const matchSelector = document.getElementById("matchSelector");
    matchSelector.removeChild(matchSelector.firstChild);
    populateMatchSelector(matches);
}
