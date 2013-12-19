define([], function () {
    'use strict'
    
    var userPlaying = false
    var userClicks = new Array()
    var buttonList
    var computerSequence = new Array()

    var initialize = function() {
        buttonList = jQuery.map( $(".boton"),
                       function(element) {
                         return $(element).attr('id')
                       })
    }

    var generateComputerSequence = function() {
        computerSequence.push( buttonList[
                                 Math.floor(Math.random()
                                   * buttonList.length)] )
        console.log(computerSequence)
    }

    var highlight = function(button, color) {
      var oldColor = button.css("background-color")
      button.css("background-color", color).dequeue()
            .delay(300)
            .queue( function() {
                    button.css("background-color", oldColor).dequeue()
                  })
    }

    var showComputerSequence = function() {
        var seq = computerSequence
        for(var id in seq) {
           (function(id){
             setTimeout( function() {
               highlight($("#"+seq[id]), "#fff")//genera siguiente secuencia añadiendo uno mas a la secuencia anterior
             }, 600*id)
           })(id)
        }
        setTimeout( function() {
            userPlaying = true
        }, 600*seq.length)
    }

    var compareSequences = function() {
        // TODO
        return true
    }

    var endGame = function() {
       
    }
    
    $(document).ready(function() {
        initialize()

$('#start-button').click(function() {
             $(this).css('color', '#f90').fadeOut()
             setTimeout( function() {
                 generateComputerSequence()
                 showComputerSequence()
             }, 500)
         })
 

        $('.boton').click( function() {
            if(userPlaying) {
                var thisId = $(this).attr('id')
                highlight($(this), "#000")
                userClicks.push(thisId)

                if (userClicks.length >= computerSequence.length) {//nº de clicks del jugador comparado con el nº de clicks de la computadora
                    userPlaying = false 
                    if (!compareSequences()){//si no son los correctos o se pasa de clicks se acaba el juego
                        // FIN DEL jUEGO
                    }
                    userClicks.length = 0
                    setTimeout(function() {
                        generateComputerSequence()
                        showComputerSequence()
                    }, 1000)
                }


            }
        })
    })
    return "<============== OK";

    return '\'Allo \'Allo!';
});