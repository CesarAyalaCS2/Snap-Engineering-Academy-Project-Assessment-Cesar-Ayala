const cardContainer = document.getElementById('cardContainer'); // declares the carContainer that is used in HTML


fetch('./matches.json') // A local JSON File contains information 
    .then((response) => {
        return response.json();
    })
    .then((matches) => {
        localStorage.setItem('matches', JSON.stringify(matches)); // creates local storage so that the data can be manipulated
        populateMatchSelector(matches); //match selector is a function that calls upon this data
        displayMatch(matches[0]); // display match displays the information in the called 
    });



function displayMatch(match) { // this displays information of a selected match in the webpage
    cardContainer.innerHTML = `
        <div class="match">
            <h2>${match['Team 1']} vs ${match['Team 2']}</h2>
            <p>Round: ${match.Round}</p>
            <p>Date: ${match.Date}</p>
            <p>Final Score: ${match.FT}</p>
        </div>
    `;
}


function populateMatchSelector(matches) { // a dropdown menu is populated by this function
    const matchSelector = document.getElementById("matchSelector"); //match selector is defined
    matchSelector.innerHTML = "<option value=''>Select a Match</option>"; //option div is used to create the drop down
    matches.forEach((match, index) => {  
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${match['Team 1']} vs ${match['Team 2']}`;
        matchSelector.appendChild(option);
    });
}

function showSelectedMatch() { // this calls the display Match function from the populate Match Selector function
    const matchSelector = document.getElementById("matchSelector"); // same logic asthe Match Selector
    const selectedIndex = matchSelector.value;
    if (selectedIndex !== "") { //As long as there is a value in the selectedIndex then it will call the displayMatch function
        localStorage.setItem("count", selectedIndex);
        const matches = JSON.parse(localStorage.getItem('matches'));
        displayMatch(matches[selectedIndex]);
    }
}



function showNextMatch() { 
    let currentIndex = Number(localStorage.getItem("count"));
    const matches = JSON.parse(localStorage.getItem('matches'));
    if (currentIndex < matches.length - 1) { // this current Index logic was very weird ;-;
        currentIndex++;
        localStorage.setItem("count", currentIndex);
        displayMatch(matches[currentIndex]); //calls the display function to show the information from matches with a from the next value
    }
}


function showPreviousMatch() { // same thing but uses -- in the if statement
    if (currentIndex > 0) { 
        let currentIndex = Number(localStorage.getItem("count")); 
        currentIndex--;
        localStorage.setItem("count", currentIndex);
        const matches = JSON.parse(localStorage.getItem('matches'));
        displayMatch(matches[currentIndex]);//calls the display function to show the information from matches with a from the previous value
    }
}

    function quoteAlert() {
        console.log("Button Clicked!")
        alert("Hechale Ganas!")
    }

    function deleteCard() {
        let matches = JSON.parse(localStorage.getItem('matches')); // Retrieve matches from local storage
        matches.shift(); 
        localStorage.setItem('matches', JSON.stringify(matches)); // Update matches in local storage
        const matchSelector = document.getElementById("matchSelector");
        matchSelector.removeChild(matchSelector.firstChild); // Remove the first option from the dropdown menu 
        populateMatchSelector(matches); // refresh the dropdown menu
    }
    





// function deleteCard() {
//     let cardNumber = Number(localStorage.getItem("count"));
//     const card = document.getElementById(`match-card-${cardNumber}`);
//     if (card) {
//         card.remove();
//     } else {
//         console.error(`Match card with number ${cardNumber} not found.`);
//     }
// }
