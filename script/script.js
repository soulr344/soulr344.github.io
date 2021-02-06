"use strict";

var onload = function(){
    document.querySelector(".top-bar .three-bar").addEventListener("click", toggleMenu);

    document.querySelectorAll(".top-menu .option").forEach(function(btn){
        btn.addEventListener("click", function(){
            switch(this.innerHTML){
                case "Home":
                    hideAll(".main");
                    break;
                case "Contact":
                    hideAll(".contact-body");
                    break;
                case "About":
                    hideAll(".about-body");
                    break;
            };
        })
    });

    loadData();
},

hideAll = function(container){
    document.querySelector(".main-body .contact-body").style.display = "none";
    document.querySelector(".main-body .about-body").style.display = "none";
    document.querySelector(".main-body .main").style.display = "none";
    document.querySelector(".main-body " + container).style.display = "block";
    toggleMenu();
},

toggleMenu = function(){
    var dropdown = document.querySelector(".top-menu"),
    nav_btn = document.querySelector(".top-bar .three-bar");
    dropdown.classList.toggle("visible");
    nav_btn.classList.toggle("clicked");
},

formatData = function(data){
    return data.replace(/title\:|description\:|\[br\]/gi, "");
},

parseData = function(data){
    var lines = data.split('\n'),
    body = document.querySelector(".main-body .main"),
    result = "", br, isExit = false;

    lines.forEach(function(line){
        if (line.includes("[start]")){
            br = 0;
            result += "<div class=\"block\">";
        } else if (line.includes("[end]")){
            result += "</p></div>";
        } else if (line.match(/title\:/i) != null){
            result += "<span class=\"title\">" + formatData(line) + "</span><hr>";
        } else if (line.match(/description\:/i) != null){
            result += "<p class=\"content\">" + formatData(line);
        } else {
            result += formatData(line);
        }
        if (line.includes("[br]") && br < 3){
            result += "<br>";
            br += 1;
        };
    });

    body.innerHTML = result + body.innerHTML;
},

loadData = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            parseData(request.responseText);
        }
    };
    request.open("GET", "content.md", true);
    request.send();
};

window.onload = onload;

/* 

<div class="block">
    <span class="title">Ah shit, here we go again!</span>
    <hr>
    <p class="content">
        Lorem ipsum dolor sit amet, usu ne repudiare torquatos. Vel docendi dissentiet ad. Cu pri maiorum voluptua prodesset, duo at illum ridens, eum cu detracto persecuti. Facer utinam officiis ius et. Regione sensibus et nec, no duis ludus qui. Ei has aperiam ceteros.
    </p>
</div>

*/