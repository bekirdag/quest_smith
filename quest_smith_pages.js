console.log("coming to you live from Github Pages");

var pathTaken = "";
var xhr = new XMLHttpRequest();
var loadingText = "Loading...";
var pathToPages = "https://robgithub.github.io/quest_smith/story_text/0";

function updateText(text) {
    document.querySelector(".quest_text").innerHTML = text;
}

// Converts the plain text to HTML with line breaks and removes the "choice" lines
function formatOutput(text) {
   formatedText = text.replace(/\n/g,"<br /><br />");
   formatedText = formatedText.replace(/<br( \/)?> +Yes.*$/,"");
   return formatedText;
}

// Disable the "choice" buttons true|false
function lockButtons(lock) {
    document.querySelector(".button.yes").disabled = lock;
    document.querySelector(".button.no").disabled = lock;
}

function takePath(pathTaken) {
    lockButtons(true);
    updateText(loadingText);
    xhr.open("GET", pathToPages + pathTaken + ".txt");
    xhr.onload = function(){
        //console.log(xhr.responseText);
        updateText(formatOutput(xhr.responseText));
        lockButtons(false);
    }
    xhr.send();
}

function init() {
    document.querySelector(".button.yes").onclick = function() { takePath(pathTaken+"0");};
    document.querySelector(".button.no").onclick = function() { takePath(pathTaken+"1");};
}

