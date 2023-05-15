const topSection = document.querySelector('#top-section')
const gameContainer = document.getElementById("game");
const COLORS = [];

//Generates pairs of random colors and pushes to COLORS array
function colorGenerator () {
  let r = ""
  let g = ""
  let b = ""
  let numberOfColors = 0;
  numberOfColors = Math.floor(Math.random()*5) + 2;

  for (let i = 1; i <= numberOfColors; i++) {
    r = Math.floor(Math.random()*255)
    g = Math.floor(Math.random()*255)
    b = Math.floor(Math.random()*255)
    let randomColor = `rgb(${r},${g},${b})`
    COLORS.push(randomColor, randomColor)
  }
}


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.dataset.color = color;


    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

let cardCount = 0;
let firstPickedCard = ""
let secondPickedCard = ""
let matchCount = 0;
let clickCount = 0;
let scoreCounter = document.querySelector('#score')
let cardsOnTable = gameContainer.querySelectorAll('div');
let lowScore = document.querySelector('#low-score')


function handleCardClick(event) {
 // you can use event.target to see which element was clicked
// console.log("you just clicked", event.target);
 
  
//if a revealed card is clicked twice
  if(event.target.style.backgroundColor) { 
    return;
  }


//Score counter increases
  cardCount += 1;
  clickCount += 1;
  scoreCounter.innerText = clickCount;
  

//if two unmatching cards are still showing and third card is picked --> turn down first two cards immediately
  if(cardCount === 1) {
    if(firstPickedCard && firstPickedCard.style.backgroundColor != secondPickedCard.style.backgroundColor) {
      firstPickedCard.style.backgroundColor = "";
      secondPickedCard.style.backgroundColor = "";
      firstPickedCard = event.target;
      firstPickedCard.style.backgroundColor = event.target.dataset.color;
      cardCount = 1;
      console.log(`Quick third // ${cardCount}`)
    }
    

// no cards showing, and first card turned over
    else { 
      firstPickedCard = event.target;
      firstPickedCard.style.backgroundColor = event.target.dataset.color;
      console.log(`First card picked // ${cardCount}`)
    }
  } 

  else if (cardCount === 2) {
    secondPickedCard = event.target;
    secondPickedCard.style.backgroundColor = event.target.dataset.color;
    
// If cards don't match
    if(firstPickedCard.style.backgroundColor != secondPickedCard.style.backgroundColor) { 
      setTimeout(function(){
        if(secondPickedCard.style.backgroundColor) {
          firstPickedCard.style.backgroundColor = "";
          secondPickedCard.style.backgroundColor = "";
        }
      },1000);
      cardCount = 0;
      console.log(`Cards dont match // ${cardCount}`)
    }


//if both cards match
    else if (firstPickedCard.style.backgroundColor === secondPickedCard.style.backgroundColor){ 
      cardCount = 0;
      console.log('Cards match')
      matchCount++;
      
      
//Final match --> end game
      if(matchCount === COLORS.length/2) { 
        
        if(clickCount < localStorage.getItem("LowScore") || !localStorage.getItem("LowScore")){
          localStorage.setItem("LowScore",clickCount);
        }
        lowScore.innerText = localStorage.getItem('LowScore');


//"Play Again" Button
        const playAgainButton = document.createElement('BUTTON');
        playAgainButton.innerText = 'PLAY AGAIN!'
        topSection.appendChild(playAgainButton); 
        playAgainButton.addEventListener('click',function(){
          while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
          }
          COLORS.length = 0;
          colorGenerator();
          shuffle(COLORS);  
          createDivsForColors(shuffledColors);
          firstPickedCard = ""
          secondPickedCard = ""
          matchCount = ""
          clickCount = 0;
          scoreCounter.innerText = clickCount;
          playAgainButton.remove();
        })
      } 
    }
  }
}
 


// when the DOM loads
const startButton = document.querySelector('#start-button');

startButton.addEventListener('click',function(event){
  colorGenerator(); 
  shuffle(COLORS);
  createDivsForColors(shuffledColors);
  startButton.remove();
  lowScore.innerText = localStorage.getItem('LowScore');
  // const restartButton = document.createElement('BUTTON')
  // restartButton.innerText = 'RE-START GAME!'
  // // topSection.prepend(restartButton);
  // restartButton.addEventListener('click',function(event){
  //   clickCount = 0;
  //   scoreCounter.innerText = clickCount;
  // })
})


getElementByID('game')

