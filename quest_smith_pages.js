function OnlineQuestSmith(buttonYes, buttonNo, divText) {
    var quest = this; // context
    // settings
    quest.buttonYes = buttonYes;
    quest.buttonNo  = buttonNo;
    quest.divText   = divText;
    //internal
    var pathTaken = "";
    var xhr = new XMLHttpRequest();
    var loadingText = "Loading...";
    var pathToPages = "https://robgithub.github.io/quest_smith/story_text/";
    var homerepo = "https://github.com/bekirdag/quest_smith";
    var storyContinues = "<h2 class=\"quest404\">The Story Continues</h2><p class=\"quest404\">This part of the tale is not yet written. Take control and compose one of the many branches for the Quest Smith adventure at <a href=\"" + homerepo + "\">Quest Smith</a></p><p class=\"quest404\">You do not need to be a coder, just edit the text files</p><br /><br />Refresh this page to start again<br /><br />";

    this.updateText = function(text) {
        document.querySelector(quest.divText).innerHTML = text;
    }

    // Converts the plain text to HTML with line breaks and removes the "choice" lines
    // captures 404
    this.formatOutput = function(text) {
       if (/>404</.test(text)) {
           return storyContinues;
       }
       formatedText = text.replace(/\n/g,"<br /><br />");
       formatedText = formatedText.replace(/<br( \/)?> +Yes.*$/,"");
       return formatedText;
    }

    // Disable the "choice" buttons true|false
    this.lockButtons = function(lock) {
        document.querySelector(quest.buttonYes).disabled = lock;
        document.querySelector(quest.buttonNo).disabled = lock;
    }

    this.takePath = function(newPathTaken) {
        pathTaken += newPathTaken;
        quest.lockButtons(true);
        quest.updateText(loadingText);
        xhr.open("GET", pathToPages + pathTaken + ".txt");
        xhr.onload = function(){
            //console.log(xhr.responseText);
            quest.updateText(quest.formatOutput(xhr.responseText));
            quest.lockButtons(false);
        }
        xhr.send();
    }

    this.init = function() {
        document.querySelector(quest.buttonYes).onclick = function() { takePath("1");};
        document.querySelector(quest.buttonNo).onclick = function() { takePath("0");};
    }

    quest.init();

} // end of OnlineQuestSmith class
