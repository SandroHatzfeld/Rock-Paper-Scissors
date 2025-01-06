const roundInfo = document.getElementById("roundInfo")
const hands = document.getElementsByClassName("hand")
const computerCounter = document.getElementById("computerCounter")
const playerCounter = document.getElementById("playerCounter")
const playerButtons = document.getElementsByClassName("buttonContainer")
const winnerText = document.getElementById("winnerText")
const computerHand = document.getElementById("computerHand")
const playerHand = document.getElementById("playerHand")

const computerCoice = [ "Rock", "Paper", "Scissors" ]


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

	setActiveHand(computerHand, "Rock")
	setActiveHand(playerHand, "Rock")

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
		return "Its a Tie! Nobody gets a point."
	}

	// check if player won
	if (
		(playerChoice === "Rock" && computerChoice === "Scissors") ||
		(playerChoice === "Paper" && computerChoice === "Rock") ||
		(playerChoice === "Scissors" && computerChoice === "Paper")
	) {
		playerScore++
		roundWinner = "Player"
		return `${roundWinner} won this round! ${playerChoice} beats ${computerChoice}.`
	}
	// check if computer won
	if (
		(computerChoice === "Rock" && playerChoice === "Scissors") ||
		(computerChoice === "Paper" && playerChoice === "Rock") ||
		(computerChoice === "Scissors" && playerChoice === "Paper")
	) {
		computerScore++
		roundWinner = "Computer"
		return `${roundWinner} won this round! ${computerChoice} beats ${playerChoice}.`
	}
}

// add listener for the animation & reset the round
hands[ 0 ].addEventListener("animationend", () => {
	let computerChoice = getComputerChoice()
	let outcome = calculateRound(computerChoice, playerChoice)

	setActiveHand(computerHand, computerChoice)
	setActiveHand(playerHand, playerChoice)

	// set texts and enable the buttons, reset to fists
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

// reset the values when restart is pressed
function restartGame() {
	roundCount = 1
	playerScore = 0
	computerScore = 0
	roundActive = false
	setTextValues("Let's play!")
	winnerText.parentElement.style.opacity = 0
}

//toggle animations of hands
function toggleHandAnimation() {
	// toggle animation class
	for (let hand of hands) {
		hand.classList.toggle("animation")
	}
}

//disable buttons
function toggleButtons() {
	// toggle disabled class on buttons
	for (let button of playerButtons) {
		button.classList.toggle("disabled")
	}
}


// set texts
function setTextValues(outcome) {
	roundInfo.innerHTML = `Round ${roundCount}: ${outcome}`
	computerCounter.innerHTML = computerScore
	playerCounter.innerHTML = playerScore
}

function setActiveHand(target, hand) {
	for (child of target.children) {
		child.classList.remove("activeHand")

		if (child.classList.contains(hand)) {
			child.classList.add("activeHand")
		}
	}
}