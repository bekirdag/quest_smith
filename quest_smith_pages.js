console.log("coming to you live from Github Pages");

var pathTaken = "";
var xhr = new XMLHttpRequest();
var loadingText = "Loading...";
var pathToPages = "https://robgithub.github.io/quest_smith/story_text/";
var homerepo = "https://github.com/bekirdag/quest_smith";
var storyContinues = "<h2 class=\"quest404\">The Story Continues</h2><p class=\"quest404\">This part of the tale is not yet written. Take control and compose one of the many branches for the Quest Smith adventure at <a href=\"" + homerepo + "\">Quest Smith</a></p><p class=\"quest404\">You do not need to be a coder, just edit the text files</p>";

function updateText(text) {
    document.querySelector(".quest_text").innerHTML = text;
}

// Converts the plain text to HTML with line breaks and removes the "choice" lines
// captures 404
function formatOutput(text) {
   if (/>404</.test(text)) {
       return storyContinues;
   }
   formatedText = text.replace(/\n/g,"<br /><br />");
   formatedText = formatedText.replace(/<br( \/)?> +Yes.*$/,"");
   return formatedText;
}

// Disable the "choice" buttons true|false
function lockButtons(lock) {
    document.querySelector(".button.yes").disabled = lock;
    document.querySelector(".button.no").disabled = lock;
}

function takePath(newPathTaken) {
    pathTaken+=newPathTaken;
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
    document.querySelector(".button.yes").onclick = function() { takePath("1");};
    document.querySelector(".button.no").onclick = function() { takePath("0");};
}

