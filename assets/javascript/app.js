var currentQuestion = 0;
var end = false;
var selection;
var int;

var game = {
	correctAnswers: 0,
	incorrect:   0,
	unanswered:  0,

	gameQuestions: [{
		question: "How many times have the New York Yankees won the world series?",
		choices: ["10", 
				"18", 
				"27", 
				"32"
		],
		correct: "27",
		image: "assets/images/dj.gif"
	}, {

		question: "Which team is the oldest continuous one name, one city francise in all of American sports?",
		choices: ["Atlanta Braves",
				 "Philadelphia Phillies",
				 "Florida Marlins",
				 "New York Yankees",

		],
		correct: "Philadelphia Phillies",
		image: "assets/images/phillies.gif"
	}, {

		question: "Which former mlb player is known as baseball's hit king?",
		choices: ["Barry Bonds",
				 "Mark McGwire",
				 "Sammy Sosa",
				 "Pete Rose"
		],
		correct: "Pete Rose",
		image: "assets/images/rose.gif" 
	}, {


		question: "Which team has the most losses in both mlb history and all of American professional sports?",
		choices: [ "Philadelphia Phillies",
				 "Seattle Mariners",
				 "Oakland A's",
				 "Chicago Cubs"
		],
		correct: "Philadelphia Phillies",
		image: "assets/images/play.gif"
	}, {

		question: "Which of the following is the oldest ballpark in baseball?",
		choices: [ "Wrigley Field (Chicago)",
				 "Dodger Stadium (Los Angeles)",
				 "Fenway Park (Boston)",
				 "Turner Field (Atlanta)"

		],
		correct: "Fenway Park (Boston)",
		image: "assets/images/boston.gif"
	}, {

		question: "Which team just broke the curse of the billy goat by winning the world series?",
		choices: [ "Red Sox",
				 "Philadelphia Phillies",
				 "Cleveland Indians",
				 "Chicago Cubs"

		],
		correct: "Chicago Cubs",
		image: "assets/images/cubs.gif"
	}, {

		question: "Which team originally signed Babe Ruth?",
		choices: ["New York Yankees",
				 "Boston Braves",
				 "Boston Red Sox",
				 "Baltimore Orioles"
		],
		correct: "Boston Red Sox",
		image: "assets/images/ruth.gif"
	}, {

		question: "Which player has the most stolen bases in mlb history?",
		choices: ["Ty Cobb",
				 "Rickey Henderson",
				 "Ozzy Smith",
				 "Juan Pierre"
		],
		correct: "Rickey Henderson",
		image: "assets/images/rickey.gif"
	}, {

		question: "Which recent hall of fame inductee is know as 'The Big Unit'?",
		choices: ["Randy Johnson",
				 "Pedro Martinez",
				 "Greg Maddux",
				 "John Smoltz"
		],
		correct: "Randy Johnson",
		image: "assets/images/johnson.gif"

	}, {

		question: "Which retired player has the most saves in major league baseball?",
		choices: ["Billy Wagner",
				 "Mariano Rivera",
				 "Trevor Hoffman",
				 "Francisco Rodriguez"
		],
		correct: "Mariano Rivera",
		image: "assets/images/mariano.gif"
	

	}]
};

gameStart();

function gameStart() {

	currentQuestion = 0;
	
	$("#start").click(function(){

		$("#start").remove();

		displayQuestion();
	});

}

function checkEnd(){

	if (currentQuestion === game.gameQuestions.length){
		end = true;
		$(".countdown").empty();
		$(".question").empty();
		$(".choices").empty();
		$(".message").empty();
		$(".message").append("THANKS FOR PLAYING!")
		.append("<p> Correct Answers: " + game.correctAnswers + " Out of "+ game.gameQuestions.length + "</p>")
		.append("<p> Unanswered Questions: " + game.unanswered + "</p>")
		.append("<button id='btnreset'>Game Reset</button>");
		gameReset();
		
		
	}

}

function displayQuestion(){
	checkEnd();
	if (end === false) {

			countDown(15);

			var question = game.gameQuestions[currentQuestion].question;
			$(".question").append(question);
			
			for (i = 0; i < game.gameQuestions[i].choices.length; i++) {
		    	choice = game.gameQuestions[currentQuestion].choices[i];

		    	var ul = $('.choices')
		    	var li = $('<li>')
		    		.addClass('liDom')
		    		.appendTo(ul);
		    	var button = $('<button>')
		    		.addClass('choiceforQuestion')
		    		.text(choice)
		    		.appendTo(li);	
		    }
		    clickChoice();
	}
}


function clickChoice(){
	var click = 0;
	$(".choiceforQuestion").click(function(){
		click++
		selection = $(this).text()

		
		if(click>0){
			checkCorrect();
		}
	})
}


function checkCorrect(){
	
	clearInterval(int);


	var correctAns = game.gameQuestions[currentQuestion].correct;
	var img = game.gameQuestions[currentQuestion].image;

	
	
	
	$(".question").empty();
	$(".choices").empty();

	
	if (selection===correctAns){
		var timeoutID = setTimeout(myTimer, 5000);
	
		game.correctAnswers++;
		
	
		$(".message").append("<p>YOU'RE CORRECT!</p>")
		.append("<p>Your answer is: " + correctAns + "</p>")
		.append("<img src="+img+ ">");

	}else if (selection==="timeUp") {
		var timeoutID = setTimeout(myTimer, 5000);
		$(".message").append("TIME IS UP!!!")
		.append("<p>The correct answer is: " + correctAns + "</p>")
		.append("<img src="+img+ ">");
		

	}
	else{
		var timeoutID = setTimeout(myTimer, 5000);
		$(".message").append("YOU'RE WRONG!")
		.append("<p>The correct answer is: " + correctAns + "</p>")
		.append("<img src=assets/images/out.gif"+ ">");

		
	}
		
		function myTimer(){
			$(".message").empty();
			
			displayQuestion();
		}


	currentQuestion++;
}


function countDown(i) {
    int = setInterval(function() {


        $(".countdown").html("<p>Time Left: " + i +"</p>");
        i-- ;


		        if( i === -1){
		    	

		    	selection="timeUp";
		    	game.unanswered++;
		    	checkCorrect();
		    	}
    }, 1000);

   

}


function gameReset(){
	$("#btnreset").click(function(){
		currentQuestion = 0;
		end = false;
		game.correctAnswers = 0;
		game.incorrect =  0;
		game.unanswered = 0;
		$(".message").empty();
		$(".start").append("<button id='start'>Start</button>")
		gameStart();

	});
}


