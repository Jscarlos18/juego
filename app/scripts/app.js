/*global define */
define([], function () {
    'use strict'
    //variables globales
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
    //cambiar el color del css y volver al color original cuando finaliza
    var highlight = function(button, color) {
      var oldColor = button.css("background-color")
      button.css("background-color", color).dequeue()
            .delay(300)
            .queue( function() {
                    button.css("background-color", oldColor).dequeue()
                  })
    }
    // mostramos la secuecia generada aleatoria
    var showComputerSequence = function() {
        var seq = computerSequence
        for(var id in seq) {//se espera 600 ms en mostrar cada elemento
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
    //comparamos las secuencias de computer y user
    var compareSequences = function() {
        // TODO
        for(var i = 0; i < userClicks.length; ++i)
                 {
                         if(userClicks[i] != computerSequence[i])
                         {
                                 return false;
                         }
                 }

                 console.log("Correcto!");
                 $('#score').text(userClicks.length)
                 return true;
    }
    //finalizacion del juego, e inicializamos los css originales
    var endGame = function() {
        for(var i = 0; i < buttonList.length; i++)
                 {
                      $("#"+buttonList[i]).css("opacity", 0.3)
                 }
        $('#fail').html("Fin de la Partida")
        $('#fail').fadeIn(2000)
        $('#fail').fadeOut(2000)
        $('#score').text("Score "+(userClicks.length-1))
        userClicks.length=0;
        computerSequence.length=0;
        $('#start').css('background-color', '#000').fadeIn()


    }
    
    $(document).ready(function() {
        initialize()

        $('#start').click(function() {//quitamos la opacidad a los botones
          for(var i = 0; i < buttonList.length; i++)
                 {
                      $("#"+buttonList[i]).css("opacity", 1)
                 }
            $('#score').text("0");
            $(this).css('color', '#fff').fadeOut()
            setTimeout( function() {
                generateComputerSequence()
                showComputerSequence()
            }, 500)
        })

        $('.boton').click( function() { //asociamos la siguiente funcion al boton para que ejecute cada vez que hagamos click
            if(userPlaying) {//solo se ejecuta si ya hemos visualizado la secuencia
                var thisId = $(this).attr('id')
                highlight($(this), "#fff")
                userClicks.push(thisId)

                if (userClicks.length >= computerSequence.length) {
                    userPlaying = false
                      if (compareSequences()){
                          userClicks.length = 0
                          setTimeout(function() {
                          generateComputerSequence()
                          showComputerSequence()
                      }, 1000)

                    }
                  else
                  {
                    endGame()
                  }      
                }
            }
        })
    })
    return "<============== OK";

    return '\'Allo \'Allo!';
});