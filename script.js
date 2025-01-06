const roundInfo = document.getElementById("roundInfo")
const hands = document.getElementsByClassName("hand")
const computerCounter = document.getElementById("computerCounter")
const playerCounter = document.getElementById("playerCounter")
const playerButtons = document.getElementsByClassName("buttonContainer")
const winnerText = document.getElementById("winnerText")

const computerCoice = [ "rock", "paper", "scissors" ]

var roundCount = 1
var roundWinner
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
		toggleButtons()
		toggleHandAnimation()
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

	// check if player won
	if (
		(playerChoice === "rock" && computerChoice === "scissors") ||
		(playerChoice === "paper" && computerChoice === "rock") ||
		(playerChoice === "scissors" && computerChoice === "paper")
	) {
		playerScore++
		roundWinner = "Player"
		return `${roundWinner} won! ${playerChoice} beats ${computerChoice}`
	}

	if (
		(computerChoice === "rock" && playerChoice === "scissors") ||
		(computerChoice === "paper" && playerChoice === "rock") ||
		(computerChoice === "scissors" && playerChoice === "paper")
	) {
		computerScore++
		roundWinner = "Computer"
		return `${roundWinner} won! ${computerChoice} beats ${playerChoice}`
	}
}

// add listener to animations & reset the round
hands[ 1 ].addEventListener("animationend", () => {
	let computerChoice = getComputerChoice()
	let outcome = calculateRound(computerChoice, playerChoice)

	//set images
	hands[ 0 ].src = `assets/${computerChoice}_opponent.svg`
	hands[ 1 ].src = `assets/${playerChoice}.svg`

	
	setTextValues(outcome)
	toggleHandAnimation()
	toggleButtons()

	// set winner if any score is 3
	if (computerScore === 3 || playerScore === 3) {
		winnerText.innerHTML = `${roundWinner} won after ${roundCount} rounds!`
		winnerText.parentElement.style.opacity = 1
	} else {
		roundCount++
		roundActive = false
	}
})

function resetGame() {
	roundCount = 1
	playerScore = 0
	computerScore = 0
	roundActive = false
	setTextValues("Let's play!")
	winnerText.parentElement.style.opacity = 0
}

function toggleHandAnimation() {
	// toggle animation class
	for (let hand of hands) {
		hand.classList.toggle("animation")
	}
}

function toggleButtons() {
	// toggle disabled class on buttons
	for (let button of playerButtons) {
		button.classList.toggle("disabled")
	}
}

function setTextValues(outcome) {
	// set texts
	roundInfo.innerHTML = `Round ${roundCount}: ${outcome}`
	computerCounter.innerHTML = computerScore
	playerCounter.innerHTML = playerScore
}