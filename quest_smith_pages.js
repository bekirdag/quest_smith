console.log("coming to you live from Github Pages");

var pathTaken = "";
var xhr = new XMLHttpRequest();
var loadingText = "Loading...";
var pathToPages = "https://robgithub.github.io/quest_smith/story_text/0";

function updateText(text) {
    document.querySelector(".quest_text").innerHTML = text;
}

function takePath(pathTaken) {
    updateText(loadingText);
    xhr.open("GET", pathToPages + pathTaken + ".txt");
    xhr.onload = function(){
        //console.log(xhr.responseText);
        updateText(xhr.responseText);
    }
    xhr.send();
}


