const roundInfo = document.getElementById("roundInfo")
const hands = document.getElementsByClassName("hand")
const computerCounter = document.getElementById("computerCounter")
const playerCounter = document.getElementById("playerCounter")
const playerButtons = document.getElementsByClassName("buttonContainer")

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
	
	hands[0].src = `assets/rock_opponent.svg`
	hands[1].src = `assets/rock.svg`
	
	if(playerScore < 3 || computerScore < 3) {
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
	for (let hand of hands) {
		hand.classList.add("animation")
	}
	for (let button of playerButtons) {
		button.classList.add("disabled")
	}

	
	setTimeout(() => {
		hands[0].src = `assets/${computerChoice}_opponent.svg`
		hands[1].src = `assets/${playerChoice}.svg`

		roundInfo.innerHTML = `Round ${roundCount}: ${outcome}`

		roundCount++
		roundActive = false
		
		computerCounter.innerHTML = computerScore
		playerCounter.innerHTML = playerScore

		for (let hand of hands) {
			hand.classList.remove("animation")
		}
		for (let button of playerButtons) {
			button.classList.remove("disabled")
		}
	
	}, 2000)
}

