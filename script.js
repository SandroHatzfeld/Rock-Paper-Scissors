const roundInfo = document.getElementById("roundInfo")
const hands = document.getElementsByClassName("hand")
const computerCounter = document.getElementById("computerCounter")
const playerCounter = document.getElementById("playerCounter")
console.log(hands)

const computerCoice = [ "rock", "paper", "scissors" ]

var roundCount = 1
var playerScore = 0
var computerScore = 0
var playerChoice

function userChoice(choice) {
	playerChoice = choice

	hands[0].src = `assets/rock_opponent.svg`
	hands[1].src = `assets/rock.svg`

	if(playerScore < 3 || computerScore < 3) {
		playRound()
	}
}

function getComputerChoice() {
	const max = 3
	const randomValue = Math.floor(Math.random() * max)

	return computerCoice[ randomValue ]
}

// function play round
// run random choice of computer and prompt player for input
// compare computer to player
// return outcome + what beat what

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

	
	setTimeout(() => {
		hands[0].src = `assets/${computerChoice}_opponent.svg`
		hands[1].src = `assets/${playerChoice}.svg`

		roundInfo.innerHTML = `Round ${roundCount}: ${outcome}`

		roundCount++

		computerCounter.innerHTML = computerScore
		playerCounter.innerHTML = playerScore

		for (let hand of hands) {
			hand.classList.remove("animation")
		}
	}, 2000)
}

