/*global define */
define([], function () {
    'use strict';
    var myArray = new Array();
    var randomArray = new Array();
    var colors = ["red", "blue", "yellow","green"];
    
    	
        var highlight = function(button, color){
        	var oldColor = button.css("background-color")
        		button.css("background-color", color)
        			.delay(200)
        			.queue( function() {
        				button.css("background-color", oldColor).dequeue();
        			})
        			}
        var randomize = Math.floor(Math.random());

  $(document).ready(function(){
    	$(".boton").click(function(){
    		var thisId = $(this).attr('id')
    		console.log(thisId)
    		if(thisId ==='arriba-derecha') {
    			myArray.push(thisId);
    			highlight($(this) , "darkred")
    			randomize;
    			var colorsRandom = colors[randomize];
    			randomArray.push(colorsRandom);
    			
    		} else if (thisId === "arriba-izquierda"){
    			myArray.push(thisId);
    			highlight($(this) , "darkgreen");
    			
    		}else if (thisId === "abajo-izquierda"){
    			myArray.push(thisId);
    			highlight($(this) , "#A6A600");
    			
    		}else if (thisId === "abajo-derecha"){
    			myArray.push(thisId);
    			highlight($(this) , "darkblue");
    			
    		} else {
    			console.log("Wrong bton ID detected")
    		}
    		console.log(myArray);
    	});
    });
});