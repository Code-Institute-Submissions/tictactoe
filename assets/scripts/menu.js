function tutorialToggle(){
    $('.tutorial').toggle();
}
function optionToggle(){
    $('.options').toggle();
}

function selectButton(button){
    changeColor(button);
    if (button.id==='tutorial-btn') showTutorial();
    else if (button.id==='options-btn') showOptions();
}

function showTutorial() {
    // If options showing, hide
    if (!$('.options').is(":hidden")){
        optionToggle();
    }
    tutorialToggle();   
}
function showOptions() {
    // If tutorial showing, hide
    if (!$('.tutorial').is(":hidden")){
        tutorialToggle();
    }
    optionToggle();    
}

function changeColor(btn){
    if($(btn).hasClass('switch-on') ){
        $(btn).removeClass('switch-on');
    } else {
        // Ensures that two buttons aren't highlighted simultaneously.
        $('.menu-area').find('.menu-btn').removeClass('switch-on');
        $(btn).addClass('switch-on');
    }
}

function getMarker(marker){
    //store option variable and send to gameFlow.js for following games until 
    //another option is selected.
    let userMark = $(marker).children().html();
    //ensures two options can't be selected simultaneously.
    $('.option-grid#marker').children().removeClass('selected');
    $(marker).addClass('selected');
    localStorage.setItem('marker-chosen',userMark);
}

function getFirstPlayer(option){
    let fPlayer = $(option).children().html();
    fPlayer = (fPlayer==='yes')? 'user':'computer';
    //ensures two options can't be selected simultaneously.
    $('.option-grid#firstPlayer').children().removeClass('selected');
    $(option).addClass('selected');
    localStorage.setItem('first-player',fPlayer);
}