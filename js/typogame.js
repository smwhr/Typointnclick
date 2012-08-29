TypoAdv = function(div_id){
	this.div_id = div_id;
	this.rooms = {};
}
TypoAdv.prototype.addRoom = function(room) {
	this.rooms[room.id] = room;
	this.rooms[room.id].game = this;
}

Room = function(id){
	this.id = id;
	this.items = {};
}
Room.prototype.addItem = function(obj){
	this.items[obj.id] = obj;
	this.items[obj.id].room = this;
}

Item = function(id){
	this.id = id;
	this.isInteractive = false;
}
Item.prototype.draw = function() {
	this.room.game.drawItem(this);
}
Item.prototype.trigger = function(cutscene) {
	this.room.game[cutscene]();	
}
Item.prototype.message = function(text){
	this.room.game.message(text);
}

TypoAdv.prototype.emptyScene = function(){
	$("#"+this.div_id).empty();
	$("#"+this.div_id).attr("class","");
}
TypoAdv.prototype.message = function(text){
	$("#message").html(nl2br(text))
}
TypoAdv.prototype.drawRoom = function(room_id){
	this.emptyScene();
	if(typeof(this.rooms[room_id].theme) != "undefined"){
		$("#"+this.div_id).addClass("room_"+this.rooms[room_id].theme);
	}
	
	for(itemId in this.rooms[room_id].items){
		this.drawItem(this.rooms[room_id].items[itemId]);
	}
}
TypoAdv.prototype.drawItem = function(item){
	if(typeof(item.visible) != 'undefined' && item.visible == false){
		$("#"+item.id).remove();
		return;
	}

	
	span = $("<span>"+nl2br(item.text)+"</span>");
	span.attr("id", item.id);
	span.css("top", item.position.y);
	span.css("left", item.position.x);
	if(typeof(item.font.family) != "undefined"){
		span.css("fontFamily", item.font.family);
	}
	if(typeof(item.font.size) != "undefined"){
		span.css("fontSize", item.font.size);
	}
	if(typeof(item.font.color) != "undefined"){
		span.css("color", item.font.color);
	}

	if(item.canInteract){
		span.addClass("interactive");
		if(typeof(item.click) == "function"){
			span.click(item.click);
		}
	}

	if(typeof(item.moreStyle) == "function"){
		span = item.moreStyle(span);
	}

	$("#"+item.id).remove();
	$("#"+this.div_id).append(span);
}


//utils
nl2br = function(str){
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + "<br />" + '$2');
	}
