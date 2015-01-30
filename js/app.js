$(document).ready(function(){

/* defining variables for global randomnumber, count the number of
guesses, number the user picked, setting found attribute to false, 
and GuessFlag, which returns a true or false value to make sure user typed
the right input.
*/
var randomNumber;
	var guessFlag;
	var guessCount;
	var userChoice;
	var found = false;
/* Initiating a new game */
newGame();

/* When the Submit button on the form is clicked, we prevent the default
action of SUBMIT from happening. If the correct number is not found, the 
variable USERCHOICE is set to the value of #userGuess, which is the 
input box in the html. WE then print out that value to the console.

We initiate 2 functions. ClearText and SetFocus to clear the text box and
put focus back onto it for a new choice to be entered. GUESSFLAG is equal
to the value received form the checkChoice function, that tells if an
appropriate number was put into the input box.

THus if NOT GUESSFLAG, meaning it was an appropriate value entered, 
we up the count by 1 and send it to the setCount function, which will 
print it to the form in the '#count' area.

In the #guessList in the html, we append a new LI in the UL, adding
userChoice (the user's input) to the form, with their previous guesses.

The checkTemperature function is initiated and placed into the guessFlag
variable, returning true if the number is incorrect and FALSE if they
guessed the number correctly.

Otherwise, you set the feedback telling them that they won the game. */

$("form").submit(function(event){
		
		event.preventDefault();
    	
    	if (!found) {
			userChoice = $('#userGuess').val();
			console.log("User Choice = "+ userChoice);
			clearText();
			setFocus();
			guessFlag = checkChoice(userChoice);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userChoice + "</li>");
				guessFlag = checkTemperature(Math.abs(randomNumber - userChoice));
			};
		} else {
			setFeedback("You Won this game already! You need to start a new game.");
			//disableGuess();
		};
  	});

/* WHen the new game button is clicked, the default SUBMIT event is prevented.
A new game is initiated. */
$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	});


/* Everything that happens when a new game is started. GUESSFLAG is true,
assuming an inappropriate value is entered. Your count is set to 0. Nothing
has been FOUND. We are removing all previous game list items from the
html. The setFeedback function is reset. SetCount makes the new count 0.
The random number is set to the initiation of the generateNumber function.
Focus and clear the text. */

function newGame() {
		guessFlag = true;
		guessCount = 0;
		found = false;
		$("ul#guessList li").remove();
		setFeedback("Make your Guess!");
		setCount(guessCount);
		randomNumber = generateNumber();
		setFocus();
		clearText();
	}

 /* This function generates a random number. Variable GENERATEDNUMBER is
 set to the new random number. The random number is then returned with the
 function. */

 function generateNumber() {

		var generatedNumber = Math.floor((Math.random()*100)+1);
		console.log("Generated Random Number = "+ generatedNumber);

		return generatedNumber;
	}
 /*Sets the focus in the input box */
 function setFocus() {
		document.getElementById("userGuess").focus();
	}
 /* clears the text in the input box */
 function clearText() {
		$('#userGuess').val('');
	}
 /* keeps the count for how many times a user has guessed a valid number. 
 	It uses the variable GUESSCOUNT and writes it to the html in #count*/
 function setCount(count) {
		$('#count').text(guessCount);
	}

 /* We prompt the user for a guess and we put that guess into the variable
 USERCHOICE and return that value in the function */

 function getChoice() {
		var userChoice = prompt("Guess the Number","Your Guess");
		console.log("User Choice = "+ userChoice);
		return userChoice;
	}
  /*We are checking to see if the user input a valid value. We see if
  they input a NAN value, a number not between 1 and 100, or we trim the 
  USERCHOICE (remove whitespace from both sides of the string) to see if 
  they didnt input anything. If any of these things are true, we return 
  the value TRUE. We are going to use this later when the SUBMIT button is
  pressed. */

  function checkChoice(userChoice) {
		if (isNaN(userChoice)) {
			setFeedback("No luck! I accept only numbers.");
			return true;
		} else if (userChoice < 1 || userChoice > 100) {
			setFeedback("Oops! Your guess has to be a number between 1 and 100!");
			return true;
		}else if ($.trim(userChoice) == '') {
			setFeedback("Please enter your guess!");
			return true;
		} else {
			return false;
		};
	}

/* guessDifference is the difference between the random number and the
user's guessed number. We input that into the function after the submit button
is pushed and after we verify that the user's input is a correct input
value. If the differnce is 0, the guessed the answer and FOUND is now true.
(in the submit button press this tells the user they need to start a new game).
This sets GUESSFLAG to false, reseting it back to normal.
If any other number is guessed, it tells the user if they are hot or cold depending
how big the guessDifference is (distance from user input to the random
generated number). Feedback is then returned to the html telling them how
hot or cold they are. GUESSFLAG is true, saying they inputted a correct value.
*/


		function checkTemperature(guessDifference) {

		if (guessDifference == 0) {
			setFeedback("You guessed it!");
			found = true;
			return false;
		} else if (guessDifference <= 5) {
			setFeedback("You're getting too hot!");
			return true;
		} else if (guessDifference <= 10){
			setFeedback("You're getting hot!");
			return true;
		} else if (guessDifference>=10 && guessDifference <= 20) {
			setFeedback("You're getting Warm!");
			return true;
		} else if (guessDifference>=20 && guessDifference <= 30) {
			setFeedback("You're getting cold!");
			return true;
		} else if (guessDifference>=30 && guessDifference <= 40) {
			setFeedback("You're getting very cold!");
			return true;
		} else {
			setFeedback("You're freezing cold!");
			return true;
		}

	}

	/* writing the feedback message to the html in the #feedback area. */
	function setFeedback(feedback) {
		$('#feedback').text(feedback);
	}

});