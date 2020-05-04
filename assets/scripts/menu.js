window.onload = function () {
    showTutorial();
}

function showTutorial() {
    $("#tutorial-btn").on('click',function (){
        $('.tutorial').toggle();
    });    
}