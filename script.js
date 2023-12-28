const mixes = [
    {name: "Tom Collins", components: ["Gin", "Sugar Syrop", "Lemon Juice", "Soda Cater"], ratios: [1, 1, 0.5, 2]},
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


  
// Assuming ratios is an array
//const ratios = [1, 4, 9, 2];

// Function to calculate amounts based on totalML
function calculateAmounts(totalML) {
    const amounts = [];
    let sum = 0;
    let maxIndex = 0;
  
    // Calculate the rounded amounts and sum
    for (let i = 0; i < amountIngredients; i++) {
      let roundedAmount;
  
      if (ratio[i] * totalML > 200) {
        roundedAmount = Math.floor((ratio[i] * totalML) / 20) * 20;
      } else if (ratio[i] * totalML > 40) {
        roundedAmount = Math.floor((ratio[i] * totalML) / 10) * 10;
      } else {
        roundedAmount = Math.floor((ratio[i] * totalML) / 2.5) * 2.5;
      }
  
      amounts.push(roundedAmount);
  
      sum += roundedAmount;
      
  
      if (roundedAmount > amounts[maxIndex]) {
        maxIndex = i;
      }
    }

    //CHATGPT
    //round sum down to its closest 10
    //get the difference between rounded sum and sum

  
    // Check if the sum is smaller than totalML
    if (sum < totalML) {
      // Add the difference onto the largest rounded amount
      const difference = totalML - sum;
      amounts[maxIndex] += difference;
    }  
    return amounts;
}
  
  
  
  
  
// Example: set totalML to 100
const randomNumber = Math.floor(Math.random() * 10) + 1;
const totalML = (randomNumber+8);
// Define the base ratios

const result = calculateAmounts(totalML);


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
    const result = calculateAmounts(totalML);
    let sum1 = 0;
    for (let i = 0; i < amountIngredients; i++) {
      sum1 += result[i];
    }
    const roundedSum = Math.floor(sum1 / 5) * 5;
  
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
  
  