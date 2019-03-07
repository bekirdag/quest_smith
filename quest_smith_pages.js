console.log("coming to you live from Github PAges");
var xhr=new XMLHttpRequest();
xhr.open("GET","https://robgithub.github.io/quest_smith/story_text/0.txt");
xhr.onload=function(){
    console.log(xhr.responseText);
}
xhr.send();
