cloakAdventure = new TypoAdv("scene");

foyer = new Room("foyer");

foyer.addItem((function(){
		var i = new Item("initial_story");
		i.canInteract = true;
		i.text = "Welcome to the Opera House \n"
			   + "It's pouring outside so you took\n"
			   + "refuge inside for the night.\n";
		i.font = {	"family" : "Quicksand",
					"size" 	 : "40px",
					"color"  : "#333"
				 }
		i.position = {x:250, y:170};
		return i;
	})()
);

foyer.addItem((function(){
		var i = new Item("west_door");
		i.canInteract = true;
		i.text = "West\nDoor";
		i.font = {	"family" : "Lobster",
					"size" 	 : "40px",
					"color"  : "brown"
				 }
		i.position = {x:5, y:220};
		i.state = "closed";

		i.click = function(){
			if(i.state == "closed"){
				i.state = "open";
				i.text = "West\nDoor\n(open)"
			}else{
				i.state = "closed";
				i.text = "West\nDoor";
			}
			i.draw();
		};
		i.dropItem = function(item){
			console.log(item.id + " dropped on " + i.id);
		};
		return i;
	})()
);

foyer.addItem((function(){
		var i = new Item("south_door");
		i.canInteract = true;
		i.text = "South Door";
		i.font = {	"family" : "Lobster",
					"size" 	 : "20px",
					"color"  : "brown"
				 }
		i.position = {x:400, y:525};

		i.state = "closed";

		i.click = function(){
			if(i.state == "closed"){
				i.state = "open";
				i.text = "South Door (open)"
				i.draw();
			}else{
				i.trigger("enter_bar");
			}
			
		};
		i.dropItem = function(item){
			console.log(item.id + " dropped on" + i.id);
		};
		return i;
	})()
);
foyer.addItem((function(){
		var i = new Item("north_door");
		i.canInteract = false;
		i.text = "Front Door";
		i.font = {	"family" : "Lobster",
					"size" 	 : "60px",
					"color"  : "brown"
				 }
		i.position = {x:400, y:0};
		return i;
	})()
);

bar = new Room("bar");
bar.theme = "unlit";
bar.addItem((function(){
		var i = new Item("darkness");
		i.canInteract = true;
		i.text = "D A R K\nN E S S";
		i.font = {	"family" : "Changa One",
					"size" 	 : "260px",
					"color"  : "black"
				 }
		i.position = {x:50, y:0};

		i.click = function(){
			i.message("You will only mess things up in the dark...");
		};
		i.moreStyle = function(span){
			span.css("letterSpacing","25px")
			return span;
		}

		return i;
	})()
);
bar.addItem((function(){
		var i = new Item("north_door");
		i.canInteract = true;
		i.text = "North Door (open)";
		i.font = {	"family" : "Lobster",
					"size" 	 : "20px",
					"color"  : "brown"
				 }
		i.position = {x:400, y:5};

		i.click = function(){
			i.trigger("enter_foyer");
		};
		i.dropItem = function(item){
			console.log(item.id + " dropped on" + i.id);
		};
		return i;
	})()
);

cloakAdventure.addRoom(foyer);
cloakAdventure.addRoom(bar);


cloakAdventure.start = function(){
	cloakAdventure.enter_foyer();
	foyer.items["initial_story"].visible = false;
}
cloakAdventure.enter_foyer = function(){
	cloakAdventure.drawRoom("foyer");
}
cloakAdventure.enter_bar = function(){
	cloakAdventure.drawRoom("bar");
}
