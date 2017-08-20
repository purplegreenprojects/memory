
	function playerAdd() {
		var playerNumber = $(".setupPlayer").toArray().length;
		playerNumber = playerNumber + 1
		console.log("button clicked")
		$("<input type='text' name='' id='player" + playerNumber + "' class='setupPlayer form-control' placeholder='player " + playerNumber + "'></input>").insertBefore("#playerAdd")
	}

	function cardAdd(background) {
		if (!background) {
			background = "lightgray"
		}

		var cardpairsNumber = $(".setupCard").toArray().length;

		$("<div id='pair" + cardpairsNumber + "' class='setupCard'><div class='L' style='background:" + background + "'><textarea class='form-control' placeholder='enter text'></textarea><input type='text' class='form-control backgroundChange' placeholder='background' value='" + background + "'></input></div><div class='R' style='background:" + background + "'><textarea class='form-control' placeholder='enter text'></textarea><input type='text' class='form-control backgroundChange' placeholder='background' value='" + background + "'></input></div></div>").insertBefore("#cardAdd")
	}

$(document).ready(function() {
	
//DEFAULT (8 pairs)
	var x = 0
	
	// LOOP!

	var colors = ["red","orange","yellow","green","cyan","blue","purple","magenta"]

	while(x < 8) {
		cardAdd(colors[x])
		x = x + 1
	}

// Customizing stuff

	// pseudocode...

		// $(".L").keyup.addClass( [background] )

		// if background [has] www.? .jpeg .png .jpg etc. (?) {
		// 	style="background: URL( [background] )"
		// }

	//

	$(document).on("keyup",".backgroundChange",function() {
		
		var backgroundInput = $(this).val()
	
		if ( (/(\.jpeg|\.png|\.jpg|\.gif|\.svg|\.tiff|\.img|\.bmp)$/gi).test(backgroundInput) ) {
			backgroundInput = "url(" + backgroundInput + ")"
		}

		console.log(backgroundInput)

		$(this).parent().css("background",backgroundInput).css("background-repeat","no-repeat").css("background-size","cover")
	})

});
