const roundInfo = document.getElementById("roundInfo")
const hands = document.getElementsByClassName("hand")
const computerCounter = document.getElementById("computerCounter")
const playerCounter = document.getElementById("playerCounter")
const playerButtons = document.getElementsByClassName("buttonContainer")
const winnerText = document.getElementById("winnerText")

const computerCoice = [ "rock", "paper", "scissors" ]

var roundCount = 1
var playerScore = 0
var computerScore = 0
var playerChoice
var roundActive = false



function setPlayerChoice(choice) {
	if (roundActive) {
		return
	}
	playerChoice = choice

	hands[ 0 ].src = `assets/rock_opponent.svg`
	hands[ 1 ].src = `assets/rock.svg`

	if (playerScore < 3 || computerScore < 3) {
		playRound()
	}
	roundActive = true
}

function getComputerChoice() {
	const max = 3
	const randomValue = Math.floor(Math.random() * max)

	return computerCoice[ randomValue ]
}


function calculateRound(computerChoice, playerChoice) {
	if (playerChoice === computerChoice) {
		return "Its a Tie! Nobody gets a point"
	}

	if (
		(playerChoice === "rock" && computerChoice === "scissors") ||
		(playerChoice === "paper" && computerChoice === "rock") ||
		(playerChoice === "scissors" && computerChoice === "paper")
	) {
		playerScore++
		return `You won! ${playerChoice} beats ${computerChoice}`
	}

	if (
		(computerChoice === "rock" && playerChoice === "scissors") ||
		(computerChoice === "paper" && playerChoice === "rock") ||
		(computerChoice === "scissors" && playerChoice === "paper")
	) {
		computerScore++
		return `You lost! ${computerChoice} beats ${playerChoice}`
	}
}

function playRound() {
	let computerChoice = getComputerChoice()
	let outcome = calculateRound(computerChoice, playerChoice)

	createVisuals(computerChoice, playerChoice, outcome)
}

function createVisuals(computerChoice, playerChoice, outcome) {
	//disable buttons
	for (let button of playerButtons) {
		button.classList.add("disabled")
	}
	//start animation and 
	for (let hand of hands) {
		hand.classList.add("animation")
	}
	// add listener to animations & reset the round
	hands[ 1 ].addEventListener("animationend", () => {
		//set images
		hands[ 0 ].src = `assets/${computerChoice}_opponent.svg`
		hands[ 1 ].src = `assets/${playerChoice}.svg`

		// set texts
		roundInfo.innerHTML = `Round ${roundCount}: ${outcome}`
		computerCounter.innerHTML = computerScore
		playerCounter.innerHTML = playerScore

		// remove animation class
		for (let hand of hands) {
			hand.classList.remove("animation")
		}
		// remove disabled class on buttons
		for (let button of playerButtons) {
			button.classList.remove("disabled")
		}

		// set winner if any score is 3
		if (computerScore === 3) {
			winnerText.innerHTML = `Computer won after ${roundCount} rounds!`
		} else if (playerScore === 3) {
			winnerText.innerHTML = `Player won after ${roundCount} rounds!`
		} else {
			roundCount++
			roundActive = false
		}
	})
	
	
}