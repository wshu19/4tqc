//localStorage.setItem("totalRuntime", 0);
let currentTime = localStorage.getItem("totalRuntime");

console.log(`totalTime is `, currentTime);
let timemins = (currentTime/60);
let closest5 = Math.floor((timemins+5)/5)*5;
// Display the current time in the label
document.getElementById("currentTimeLabel").textContent += Math.floor(timemins) + "\n";
document.getElementById("currentTimeLabel").textContent += "\nJust a few more till: ";
document.getElementById("currentTimeLabel").textContent += closest5;


const mixes = [
  {name: "Tom Collins", components: ["Gin", "Sugar Syrop", "Lemon Juice", "Soda Water"], ratios: [1, 1, 0.5, 2]},
  {name: "Screwdriver", components: ["Vodka", "Sugar Syrop", "Orange"],  ratios: [1, 1, 3]},
  {name: "Cuba Libre", components: ["Rum", "Lime", "Cola"],  ratios: [1, 0.25, 2.5]},
  {name: "Tequila Sunrise", components: ["Tequila", "Orange", "Grenadine"],  ratios: [1, 2.7, 0.3]},
  {name: "Long Island", components: ["Gin", "Tequila", "Rum","Vodka","Cointreau","Sugar Syrop", "Lemon Juice", "Cola"],  ratios: [0.2,0.2,0.2,0.2,0.2,0.25,0.25,2.5]},
  {name: "Sex on the Beach", components: ["Vodka", "Peach Snaps", "Sugar Syrop", "Orange", "Cranberry"],  ratios: [1,0.6,0.6,1.5,1.5]},
  {name: "Cosmo", components: ["Gin", "Cointreau", "Lime", "Cranberry"], ratios: [1, 0.6, 0.4, 2.6]},
  {name: "Bay Breeze", components: ["Vodka", "Sugar Syrop", "Cranberry", "Pineapple"], ratios: [1, 0.5, 2.5, 1]},
      // Add more mixes as needed
];

// Normalize the ratios
mixes.forEach((mix) => {
  const sum = mix.ratios.reduce((acc, ratio) => acc + ratio, 0);
  mix.ratios = mix.ratios.map((ratio) => (ratio / sum) * 10);
});





let randomMixesIndex = Math.floor(Math.random() * mixes.length);
let chosenMix = mixes[randomMixesIndex];
let ratio = chosenMix.ratios;
let amountIngredients = ratio.length;
let sum1 = 0;
let wantRounding = 1;

let refreshesWithoutUserInput = localStorage.getItem("refreshesWithoutUserInput") || 0; // Default to 0 if not set


// Check if the amount of refreshes is higher than 3
if (refreshesWithoutUserInput > 2) {
  // Stop the program and display a message
  document.body.innerHTML = '<div>Press any key to continue</div>';

  // Set refreshesWithoutUserInput to 0
  localStorage.setItem("refreshesWithoutUserInput",0);

  // Function to reset and continue when any key is pressed
  window.addEventListener('keydown', resetAndContinue);
  
  function resetAndContinue() {
    window.removeEventListener('keydown', resetAndContinue); // Remove the event listener
    location.reload();
  }
}


console.log(`Afk visits`, refreshesWithoutUserInput);

// Function to calculate amounts based on totalML
function calculateAmounts(totalML, wantRounding) {
  const amounts = [];
  let sum = 0;
  let maxIndex = 0;

  // Calculate the amounts based on rounding condition
  for (let i = 0; i < amountIngredients; i++) {
    let calculatedAmount = ratio[i] * totalML;
    let roundedAmount;

    if (wantRounding === 1) {
      if (calculatedAmount >= 100) {
        roundedAmount = Math.round(calculatedAmount / 10) * 10;
      } else if (calculatedAmount >= 40) {
        roundedAmount = Math.round(calculatedAmount / 5) * 5;
      } else {
        roundedAmount = Math.round(calculatedAmount / 2.5) * 2.5;
      }
    } else {
      // If wantRounding is not 1, use the calculated amount without rounding
      roundedAmount = Math.round(calculatedAmount / .5) * .5;
    }

    amounts.push(roundedAmount);
    sum += roundedAmount;

    if (roundedAmount > amounts[maxIndex]) {
      maxIndex = i;
    }
  }

  // Check if the sum is smaller than totalML
  if (sum != (totalML*10)) {
    // Add the difference onto the largest rounded amount
    const difference = (totalML*10) - sum;
    amounts[maxIndex] += difference;
  }

  return amounts;
}



// Example: set totalML to 100
//const randomNumber = Math.floor(Math.random() * 10) + 1;
let totalML; // = (randomNumber+8);

const randomFromSelection = Math.floor(Math.random()*3);

switch (randomFromSelection){
case 0:
  totalML = 12;
  break;
case 1:
  totalML = 14;
  break;
case 2:
  totalML = 16;
  break;
default:
  totalML = 0;		
  break;
}





// Define the base ratios

const result = calculateAmounts(totalML,wantRounding);


function countdownTimer(seconds, updateCallback, finishCallback) {
let timeLeft = seconds;

const intervalId = setInterval(() => {
  updateCallback(timeLeft);

  if (timeLeft === 0) {
    clearInterval(intervalId);
    finishCallback();
    timerDisplay.textContent = "Countdown finished!";
    timeLeft=100000;
  } else {
    timeLeft--;
  }
}, 1000); // Update every second

}

// Get the current time when the program starts
const startTime = new Date();

// Function to calculate the elapsed time in seconds
function getElapsedTime() {
  const currentTime = new Date().getTime();
  const elapsedTimeInSeconds = Math.floor((currentTime - startTime.getTime()) / 1000);
  return elapsedTimeInSeconds;
}


// Example usage:
const timerDisplay = document.getElementById("timerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
let timePerDrink;
console.log(`TimePerDrink is`, timePerDrink);
// Load timePerDrink from local storage on page load
timePerDrink = localStorage.getItem("timePerDrink") || 10; // Default to 5 if not set
displayTime();
console.log(`TimePerDrink is`, timePerDrink);
let deadline = ratio.length * timePerDrink;
let waittime = 4000;
let pageRefresh = deadline*1000 + waittime+ waittime;

const updateCallback = (timeLeft) => {
timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
};

const hideResults = () => {
resultDisplay.textContent = "";
};

const finishCallback = () => {
  // Example for calculating and displaying result
  let sum1 = 0;
  for (let i = 0; i < amountIngredients; i++) {
    sum1 += result[i];
  }
  const roundedSum = Math.round(sum1 / 5) * 5;

  // Display the name and amount immediately
  resultDisplay.innerHTML = `<div>${chosenMix.name}</div>`;
  resultDisplay.innerHTML += `<div>${roundedSum} ml</div>`;

  // Add a line break (page break) between title/amount and ingredients
  resultDisplay.innerHTML += "<br>";

  // Display the ingredients after 2 seconds
  setTimeout(() => {
    for (let i = 0; i < amountIngredients; i++) {
      resultDisplay.innerHTML += chosenMix.components[i];
      resultDisplay.innerHTML += ":    ";
      resultDisplay.innerHTML += result[i];
      resultDisplay.innerHTML += "<br>";
    }
    resultDisplay.innerHTML += "<br>";

    // Uncomment the line below if you want to display the total
    // resultDisplay.innerHTML += `<div>Total: ${sum1} ml</div>`;
  }, waittime);
  

  // Hide results after 5 seconds
  // setTimeout(hideResults, 5000);

  // Refresh the page after 7 seconds
  setTimeout(() => {
    refreshesWithoutUserInput++;
    localStorage.setItem("refreshesWithoutUserInput",refreshesWithoutUserInput);
    
    let gotTime = getElapsedTime();
    
    // Using Number function
let totalRuntime1 = Number(currentTime) + Number(gotTime);

// Using unary plus operator
let totalRuntime2 = +currentTime + +gotTime;

console.log(totalRuntime1); // Output: 30
console.log(totalRuntime2); // Output: 30
    //totalRuntime = 0;
    localStorage.setItem("totalRuntime",totalRuntime1);


    location.reload();
  }, pageRefresh);
};

// Trigger finishCallback immediately to display the result
finishCallback();

// Start the countdown after a 2-second delay
setTimeout(() => {
  countdownTimer(deadline, updateCallback, finishCallback);
}, waittime/1.3);




function setTimePerDrink(time) {
  timePerDrink = time;
  localStorage.setItem("timePerDrink", timePerDrink);
  displayTime();
  console.log(`setTimePerDrink called with time: ${time}`);
}

function displayTime() {
  console.log(`Time per drink set to ${timePerDrink}`);
  // You can perform other actions or calculations here based on the selected time
}

