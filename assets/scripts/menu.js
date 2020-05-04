window.onload = function () {
    ('#tutorial-btn').on('click',tutorialToggle());
    ('#options-btn').on('click',optionToggle());
}
function tutorialToggle(){
    return $('.tutorial').toggle();
}
function optionToggle(){
    return $('.options').toggle();
}

function selectButton(button){
    changeColor(button);
    if (button.id==='tutorial-btn') showTutorial();
    else if (button.id==='options-btn') showOptions(button);
}

function showTutorial() {
    // If options showing, hide
    if (!$('.options').is(":hidden")){
        console.log('option visible is accessed.')
        optionToggle();
    }
    tutorialToggle();   
}
function showOptions() {
    // If tutorial showing, hide
    if (!$('.tutorial').is(":hidden")){
         console.log('tutorial visible is accessed.')
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