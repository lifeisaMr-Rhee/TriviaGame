$(document).ready(function() {

var startScreen;
var gameHTML;
var counter = 30;
var questionsArray = ["Which NBA franchise has the most titles?", "Which current or former NBA player has the most titles?",
                      "Which NBA player has the most points scored throughout their career?", "In 2017 who is the NBA's consensus #1 player?", 
                      "How many titles does Michael Jordan have?", "Which state has the most NBA franchises?",
                      "Which NBA franchise shown has not won a title?", "How many games are played in a full season?"]; 
var answersArray = [["Golden State Warriors", "Boston Celtics", "Los Angeles Lakers", "Chicago Bulls"],
                    ["Bill Russell", "Michael Jordan", "Kobe Bryant", "Robert Horry"],
                    ["Kobe Bryant", "Karl Malone", "Shaquille O'Neil", "Kareem Abdul Jabbar"],
                    ["Kevin Durant", "James Harden", "Russell Westbrook", "Lebron James"],
                    ["5", "6", "2", "11"],
                    ["Texas", "California", "Florida", "New York"],
                    ["Houston Rockets", "Milwaukee Bucks", "Minnesota Timberwolves", "Philadelphia 76'ers"],
                    ["75", "66", "90", "82"]];
var imagesArray = ["<img class = 'center-block img-right' src = 'assets/images/bostonceltics.png'>", "<img class='center-block img-right' src= 'assets/images/billrussell.jpg'>",
                   "<img class='center-block img-right' src='assets/images/kareem.jpeg'>", "<img class='center-block img-right' src='assets/images/lebron.jpg'>",
                   "<img class='center-block img-right' src='assets/images/jordanrings.jpg'>", "<img class='center-block img-right' src='assets/images/californianbateams.png'>",
                   "<img class='center-block img-right' src='assets/images/timberwolves.png'>", "<img class='center-block img-right' src='assets/images/lebronposter.jpg'>"];
var correctAnswers = ["B. Boston Celtics", "A. Bill Russell", "D. Kareem Abdul Jabbar", "D. Lebron James",
                      "B. 6", "B. California", "C. Minnesota Timberwolves", "D. 82"];
var questionsCounter = 0;
var selecterAnswer;
var theClock;
var correctAnswersTally = 0;
var incorrectAnswersTally = 0;
var unansweredQuestionsTally = 0;
var clickSound = new Audio("assets/sound/button-click.mp3");

function beginningScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}
beginningScreen();

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionsArray[questionsCounter] + "</p><p class='first-answer answer'>A. " + answersArray[questionsCounter][0] + "</p><p class='answer'>B. "+answersArray[questionsCounter][1]+"</p><p class='answer'>C. "+answersArray[questionsCounter][2]+"</p><p class='answer'>D. "+answersArray[questionsCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function generateUserWin() {
	correctAnswersTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionsCounter] + "</p>" + imagesArray[questionsCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 5000);  
}

function generateUserLoss() {
	incorrectAnswersTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionsCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 5000); 
}

function generateLossDueToTimeOut() {
	unansweredQuestionsTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionsCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 5000);  
}

function wait() {
	if (questionsCounter < 7) {
	questionsCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctAnswersTally + "</p>" + "<p>Wrong Answers: " + incorrectAnswersTally + "</p>" + "<p>Unanswered: " + unansweredQuestionsTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionsCounter = 0;
	correctAnswersTally = 0;
	incorrectAnswersTally = 0;
	unansweredQuestionsTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

$("body").on("click", ".start-button", function(event){
	event.preventDefault(); 
	clickSound.play();
	generateHTML();

	timerWrapper();

});

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionsCounter]) {
		

		clearInterval(theClock);
		generateUserWin();
	}
	else {
		
		clearInterval(theClock);
		generateUserLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  



