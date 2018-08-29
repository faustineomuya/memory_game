// Variables to shorten code

	let card = document.getElementsByClassName("card");
	let cards = [...card];
	const deck = document.querySelector('.deck'); 
	let openedCards = [];
	let moves = 0;
	let moveCounter = document.querySelector(".moves");
	let matchedCard = document.getElementsByClassName("match");
	let second = 0, minute = 0; hour = 0;
	let timer = document.querySelector(".timer");
	let interval; 
	let stars = document.querySelectorAll(".fa-star"); 
	let modal = document.querySelector('.modal');
	let closeicon = document.querySelector(".close");
	let restartGame = document.querySelector(".restart"); 
	let pAgain = document.querySelector(".btn.playagain");



/**
 *
 * Pre -defined Shuffle Function
 *
 */

	// initializes the game
	 startGame();

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {

		var currentIndex = array.length, temporaryValue, randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		// Returns array of shuffled cards
		return array;
	}

/**
 *
 * Start Game Function that initializes the game
 *
 */

	function startGame (){
	 	openedCards = [];
	 	cards = shuffle(cards);

	 	for (let i = 0 ;i< cards.length; i++) {

	 		deck.innerHTML = "";
	 		[].forEach.call(cards, function(item) {
	 			deck.appendChild(item);
	 		});

	 		cards[i].classList.remove("show", "open", "match","disabled");
	 	}
	 	resetMoves();
	 	resetRate();
	 	resetTime();
	}

/**
 *
 *  Function to enable Toggle functionality of classes
 *
 */

	var openCard = function(){

	 	this.classList.toggle("open");
	 	this.classList.toggle("show");

	}

/**
 *
 * Adds click event to every card
 *
 */

	for (var i = 0; i < cards.length; i++){

		card = cards[i];
		card.addEventListener("click", openCard);
		card.addEventListener("click", openCards);
		card.addEventListener('click',openModal);

	}

/**
 *
 * Function to compare open cards
 *
 */

	function openCards(){
		openedCards.push(this);
		let cardLength = openedCards.length;
		if (cardLength === 1) {
			movesCounter();
		}
		else if(cardLength === 2){
			
			if(openedCards[0].innerHTML != openedCards[1].innerHTML || openedCards[0].isSameNode(openedCards[1])){
				unmatched();
			}else{
				matched();
			}
		}
	}

/**
 *
 * Card functions for Matched cards, 
 * unmatched cards, 
 * enabled cards and 
 * disabled cards (already matched)
 *
 */

	function matched(){
		openedCards[0].classList.add('match','disabled');
		openedCards[1].classList.add('match','disabled');
		openedCards[0].classList.remove("show", "open");
		openedCards[1].classList.remove("show", "open");
		openedCards = [];
	}

	// sets timer to 900ms before second card disappears if it doesnt match
	function unmatched(){
		disabled();
		setTimeout(function() {
			openedCards[0].classList.remove("show", "open");
			openedCards[1].classList.remove("show", "open");
			enable();
			openedCards = [];
		}, 900);

	}

	function disabled(){
		for(var i = 0; i < cards.length; i++){
			card.classList.add('disabled');
		}

	}

	function enable(){
		for(var i = 0; i < cards.length; i++){
			card.classList.remove('disabled');
		}

		for(var i = 0; i < matchedCard.length; i++){
			matchedCard[i].classList.add("disabled");
		}
	}

/**
 * Number of moves
 */

	function movesCounter(){
		moves++;
		moveCounter.innerHTML = moves;
		if(moves == 1){
			second = 0;
			minute = 0; 
			hour = 0;
			startTimer();
		}
		// Sets player rating based on number of moves made
		rating();
	}	

/**
 *
 * Game Timer Function
 *
 */

 	function timerFunc(){

 		second++;
		timer.innerHTML = minute+"mins "+second+"secs";
			
			if(second == 60){
				minute++;
				second=0;
			}
			if(minute == 60){
				hour++;
				minute = 0;
			}
	}

	// Starts game timer
	function startTimer(){
		timerFunc();
		interval = setInterval(timerFunc ,1000);
	}

/**
 * Setting game player rating
 */


	function rating(){


		if (moves > 8 && moves < 12){
			
			for (var i = 0; i < 5 ; i++) {
				if (i >3){
					stars[i].classList.remove('fa-star'); 
				}
				
			}		

		}else if(moves > 12 && moves < 18){
			for (var i = 0; i < 4 ; i++) {
				if (i >2){
					stars[i].classList.remove('fa-star'); 
				}
				
			}
		}else if(moves > 18){
			for (var i = 0; i < 3 ; i++) {
				if (i >1){
					stars[i].classList.remove('fa-star'); 
				}
				
			}
		}
	}

/**
 *
 *  Functions to reset number of moves, time and Rating 
 *
 */
		

	function resetMoves(){
		moves = 0;
		moveCounter.innerHTML = moves;
	}

	function resetTime(){
		second = 0, minute = 0; hour = 0;
		timer.innerHTML = minute+"mins "+second+"secs";
		clearInterval(interval);
	}

	function resetRate(){
		for (var i = 0; i < 5 ; i++){
			if(i>0){
				stars[i].classList.add('fa-star');
			}
		}
	}

/**
 *
 * Function to enable restart button to re-start the game
 *
 */

	restartGame.addEventListener("click", startGame);


/**
 *
 * Function to enable Modal after all cards are matched
 *
 */

	function openModal(){
		if(matchedCard.length == 16){
			clearInterval(interval);
			 modal.style.display = "block";

			 let finalTime = document.querySelector(".timer").innerHTML;
			 document.querySelector('.totalTime').innerHTML = finalTime;

			 let finalMove = document.querySelector(".moves").innerHTML;
			 document.querySelector('.totalMoves').innerHTML = finalMove;

			 let starFinal = document.querySelector(".stars").innerHTML;
			 document.querySelector('.totalRating').innerHTML = starFinal ;

			 closeModal();
			 playAgain();
		};
	}

	// Enables the close icon to close the modal
	function closeModal(){
    	closeicon.addEventListener("click", function(e){
	        modal.style.display = "none";
	        startGame();
    	});
	}

	// Function to restart game when user clicks Go again button on modal
	function playAgain(){
	    pAgain.addEventListener("click" , function(e){
	    	modal.style.display = "none";
	   		startGame();
	    });
	}


	// sets 3d effect on Game Heading
	jQuery(document).ready(function(){
		$('h1').mousemove(function(e){
		var rXP = (e.pageX - this.offsetLeft-$(this).width()/2);
		var rYP = (e.pageY - this.offsetTop-$(this).height()/2);
		$('h1').css('text-shadow', +rYP/10+'px '+rXP/80+'px rgba(227,6,19,.8), '+rYP/8+'px '+rXP/60+'px rgba(255,237,0,1), '+rXP/70+'px '+rYP/12+'px rgba(0,159,227,.7)');
		});
	});