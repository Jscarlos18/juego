/*global define */
define([], function () {
    'use strict'
    
    var userPlaying = false
    var userClicks = new Array()
    var botonList
    var computerSequence = new Array()

    var initialize = function() {
        botonList = jQuery.map( $(".boton"),
                       function(element) {
                         return $(element).attr('id')
                       })
    }

    var generateComputerSequence = function() {
        computerSequence.push( botonList[
                                 Math.floor(Math.random()
                                   * botonList.length)] )
        console.log(computerSequence)
    }

    var highlight = function(boton, color) {
      var oldColor = boton.css("background-color")
      boton.css("background-color", color).dequeue()
            .delay(300)
            .queue( function() {
                    boton.css("background-color", oldColor).dequeue()
                  })
    }

    var showComputerSequence = function() {
        var seq = computerSequence
        for(var id in seq) {
           (function(id){
             setTimeout( function() {
               highlight($("#"+seq[id]), "#fff")
             }, 600*id)
           })(id)
        }
        setTimeout( function() {
            userPlaying = true
        }, 600*seq.length)
    }

    var compareSequences = function() {
        for(var i in userClicks) {
            if(computerSequence[i] !== userClicks[i]) return false
        }
        return true
    }

    var endGame = function() {
        var response = confirm("Error. Restart?")
        if (response) {
            userClicks.length = 0
            computerSequence.length = 0
            setTimeout( function() {
                generateComputerSequence()
                showComputerSequence()
            }, 2000)
        }
    }
    
    $(document).ready(function() {
        initialize()

        $('#start-boton').click(function() {
            $(this).css('color', '#fff').fadeOut()
            setTimeout( function() {
                generateComputerSequence()
                showComputerSequence()
            }, 500)
        })

        $('.boton').click( function() {
            if(userPlaying) {
                var thisId = $(this).attr('id')
                highlight($(this), "#fff")
                userClicks.push(thisId)

                if (!compareSequences()) {
                    userPlaying = false
                    endGame()
                }
                if (userClicks.length >= computerSequence.length) {
                    userPlaying = false
                    userClicks.length = 0
                    setTimeout(function() {
                        generateComputerSequence()
                        showComputerSequence()
                    }, 1000)
                }
            }
        })
    })
return computerSequence
    return "<============== OK";
});