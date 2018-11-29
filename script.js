/*** set up ***/
	/* playerAdd */
		function playerAdd() {
			var playerNumber = $(".setupPlayer").toArray().length;
			playerNumber = playerNumber + 1
			console.log("button clicked")
			$("<div class='playerList' style='background-color: black'>\
					<input type='text' id='player" + playerNumber + "' class='setupPlayer form-control' placeholder='player " + playerNumber + "'></input>\
					<button class='btn btn-md btn-danger playerRemove' onclick='playerRemove(this)'><span class='glyphicon glyphicon-remove'></span></button>\
				</div>").insertBefore("#playerAdd")
		}

	/* cardAdd */
		function cardAdd(background) {
			if (!background) {
				background = "lightgray"
			}

			var cardpairsNumber = $(".setupCard").toArray().length;

			$("<div id='pair" + cardpairsNumber + "' class='setupCard'>\
					<div class='L' style='background:" + background + "'>\
						<textarea class='form-control' placeholder='enter text'></textarea>\
						<input type='text' class='form-control backgroundChange' placeholder='background' value='" + background + "'></input>\
					</div>\
					<div class='R' style='background:" + background + "'>\
						<textarea class='form-control' placeholder='enter text'></textarea>\
						<input type='text' class='form-control backgroundChange' placeholder='background' value='" + background + "'></input>\
					</div>\
					<button class='btn btn-md btn-danger cardRemove' onclick='cardRemove(this)'><span class='glyphicon glyphicon-remove'></span></button>\
			</div>").insertBefore("#cardAdd")
		}
	/* playerRemove */
		function playerRemove(button) {
			console.log("remove player")
			$(button).parent().remove()
		}

	/* cardRemove */
		function cardRemove(button) {
			console.log("remove card")
			$(button).parent().remove()
		}

	$(document).ready(function() {
	
	/* default cards */
		var x = 0
		var colors = ["red","orange","yellow","green","cyan","blue","purple","magenta"]

		// LOOP!
		while (x < 8) {
			cardAdd(colors[x])
			x = x + 1
		}

	/* backgroundChange */
		$(document).on("keyup",".backgroundChange",function() {
			var backgroundInput = $(this).val()
		
			if ( (/(\.jpeg|\.png|\.jpg|\.gif|\.svg|\.tiff|\.img|\.bmp)$/gi).test(backgroundInput) ) {
				backgroundInput = "url(" + backgroundInput + ")"
			}

			$(this).parent().css("background",backgroundInput).css("background-repeat","no-repeat").css("background-size","cover")
		});

	/* setupGame */
		$("#setupGame").on("click",function() {										//when you click on the setupGame button

			$("#setup_div").css("opacity",0).removeClass("hidden");					//fade in the setupDiv
			$("#setup_div").animate({
				opacity: 1
			},2000);

			$("#menu").animate({													//fade out the menu
				opacity: 0
			},2000);

			setTimeout(function() {
				$("#menu").addClass("hidden");
			},2010);
		});

	/* submitSetup */
		$("#submitSetup").on("click",function() {									//when you click on the submitSetup button
			
			$("#menu").css("opacity",0).removeClass("hidden");						//fade in the menu
			$("#menu").animate({
				opacity: 1
			},2000);

			$("#setup_div").animate({												//fade out the setup_div
				opacity: 0
			},2000);

			setTimeout(function() {
				$("#setup_div").addClass("hidden");
			},2010);
	});

	});

/*** game play ***/
	$(document).ready(function() {

	/* startGame */
		$("#startGame").on("click",function() {										//when you click on the startGame button
			//create players
				players = {};														//create an empty players object
				var playerBoxes = $(".setupPlayer").toArray();						//get all the setupPlayers

				for (playerBox of playerBoxes) {									//for each player
					var playerName = $(playerBox).val();							//get the name
					players[playerName] = 0;										//add that player to the players object with score 0
				}

			//create deck
				deck = [];															//create an empty deck
				var pairs = $(".setupCard").toArray();								//get all the pairs of setupCards

				for (pair of pairs) {												//for each pair
					
					var set = "0123456789abcdefghijklmnopqrstuvwxyz";				//generate a random id
					var number = "";
					for (var i = 0; i < 16; i++) {
						number += (set[Math.floor(Math.random() * set.length)]);
					}
					number = "_" + number;

					var leftText = $(pair).find(".L").find("textarea").val();		//get the text of the left card
					var rightText = $(pair).find(".R").find("textarea").val();		//get the text of the right card
					var leftBackground = $(pair).find(".L").find("input").val();	//get the background of the left card
					var rightBackground = $(pair).find(".R").find("input").val();	//get the background of the right card

					deck.push([														//add these two cards to the deck
						{
							number: number,
							text: leftText,
							background: leftBackground
						},
						{
							number: number,
							text: rightText,
							background: rightBackground
						}
					]);
				}

			//create player list
				var playerList = "";												//empty string
				var count = 0;														//start the count at 0

				for (var name in players) {
					count++;														//go up to the next player, then add the html
					playerList += "<div class='player' player='" + count + "' id='" + (name).toLowerCase().replace(/\s/gi,"") + "'>"
						+ "<span class='player_name'>" + name + "</span>"
						+ "<span class='player_score'>" + players[name] + "</span>"
					+ "</div>";
				}

				$("#player_list").html(playerList);									//update the player_list <div>

			//shuffle deck pairs into a pile
				var pile = [];														//create an empty pile
				for (var pair of deck) {											//for each pair in the deck
					pile.push(pair[0],pair[1]);										//add the two cards to the pile
				}

				pile.sort(function(a,b) {											//shuffle the cards a few times
					return (Math.floor(Math.random() * 2) - 1);
				});

				pile.sort(function(a,b) {
					return (Math.floor(Math.random() * 2) - 1);
				});

				pile.sort(function(a,b) {
					return (Math.floor(Math.random() * 2) - 1);
				});

			//get game dimensions
				var cardCount = pile.length;										//how many cards are there?
				var width = Math.ceil(Math.pow(cardCount,0.5));						//the width is as close to the square root as possible

			//create gameboard
				var gameboard = "";													//start with an empty gameboard
				var slot = 0;														//each row will have [width] number of slots
				$("#cardCount").text(":root { --widthCount: " + width + "; }");		//update the widthCount for cardSlot width and height

				for (var card of pile) {											//generate a card slot with a card (front and back)
					if ( (/(\.jpeg|\.png|\.jpg|\.gif|\.svg|\.tiff|\.img|\.bmp)$/gi).test(card.background) ) {
						card.background = "url(" + card.background + ")"
					}

					gameboard += "<div class='card_slot' id='slot_" + slot + "'>" + 
						"<div class='card' value='" + card.number + "'>"
							+ "<div class='card_back'></div>"
							+ "<div class='card_front hidden' style='background: " + card.background + "; background-repeat: no-repeat; background-size: cover;'><div class='card_text'>" + card.text + "</div></div>"
						+ "</div>"
					+ "</div>";

					slot++;															//move on to the next slot
				}

				$("#gameboard").html(gameboard);									//update the gameboard <div>

			//start game
				window.player = 1;													//start on the first player's turn; make their player <div> active
				$(".player[player='" + window.player + "']").addClass("active");
				
				$("#players, #gameboard").css("opacity",0).removeClass("hidden");	//fade in the game
				$("#players, #gameboard").animate({
					opacity: 1
				},2000);
				
				$("#menu").animate({												//fade out the menu
					opacity: 0
				},2000);

				setTimeout(function() {
					$("#menu").addClass("hidden");
				},2010);
		});
	
	/* select card */
		$(document).on("click", ".card_back", function() {							//when someone clicks on a card back
			var flippedCount = $(".card_back.hidden").toArray().length || 0;		//how many are already flipped? 1 or 0?

			if ((window.player) && (!$(this).hasClass("hidden")) && (flippedCount < 2)) {
				var card = $(this).closest(".card");								//get the card

				if (flippedCount == 0) {											//if there are none flipped...
					$(card).find(".card_back").addClass("hidden");					//flip this one
					$(card).find(".card_front").removeClass("hidden");
				}
				else {																//if there is 1 flipped...
					var existingValue = $(".card_back.hidden").closest(".card").attr("value");	//get the value of that one...
					console.log(existingValue);
					var thisValue = $(card).attr("value");							//...and this one
					console.log(thisValue);

					$(card).find(".card_back").addClass("hidden");					//flip this card
					$(card).find(".card_front").removeClass("hidden");

					if (existingValue !== thisValue) {								//if the values don't match...
						setTimeout(function() {										//...in 2 seconds...
							$(".card_back").removeClass("hidden");					//flip 'em back
							$(".card_front").addClass("hidden");
							
							var playerCount = $(".player").toArray().length;		//go to the next player
							if (window.player < playerCount) {
								window.player++;
							}
							else {													//go back to player 1 if it loops around
								window.player = 1;
							}

							$(".player").removeClass("active");						//set the next player <div> to active
							$(".player[player='" + window.player + "']").addClass("active");
						},2000);
					}
					else if (existingValue === thisValue) {							//if the values do match...
						setTimeout(function() {										//...in 1 second...
							var player_top = $(".player.active").position().top;	//get this player's <div> location
							var player_left = $(".player.active").position().left;

							$(".card_back.hidden").closest(".card").each(function() {	//for each of the matching cards...
								var top = $(this).position().top;					//get their position and dimensions
								var left = $(this).position().left;
								var height = $(this).css("height").replace("px","");
																					//animate the cards to move to the player
								$(this).css("position","absolute").css("top",top + "px").css("left",left + "px").css("height",height).css("width",height);
								$(this).animate({
									top: player_top,
									left: player_left,
									opacity: 0,
								},1000);
							});
						},1000);

						setTimeout(function() {										//...after 2 seconds...
							$(".card_back.hidden").closest(".card").remove();		//remove the cards
							var score = Number($(".player.active").find(".player_score").text()) + 1;	//update the player's score
							$(".player.active").find(".player_score").text(score);
						},2010);

						if ($(".card").toArray().length == 2) {						//if those were the last two cards...
							setTimeout(function() {									//...after 3 seconds...
								$("#menu").removeClass("hidden");					//bring back the menu
								$("#menu").animate({
									opacity: 1
								},2000);

								$("#players, #gameboard").animate({					//fade out the game
									opacity: 0
								},2000);

								setTimeout(function() {
									$("#players, #gameboard").addClass("hidden").css("opacity",1);
								},2010);
							},3010);
						}
					}
				}
			}
		});

	});
