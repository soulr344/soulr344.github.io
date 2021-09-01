(function(window){
    'use strict';
    const _loadJS = (src, callback) => {
        let script = document.createElement('script');
        script.setAttribute("src", src);
        script.onload = callback;
        document.head.appendChild(script);
    }
    if (typeof(window.loadJS) === 'undefined'){
        window.loadJS = _loadJS;
    }
    window.vh = window.innerHeight / 100;
    window.getCurrYPosition = function(){
        return window.pageYOffset;
    }
    window.isElementIntersecting = function(element){
        return (getCurrYPosition() >= element.offsetTop - element.offsetHeight / 2);
    }
})(window);

let offset = 30*vh,
    header = document.querySelector("header");

loadJS("./scripts/components/navigation.js", () => {
    let nav = new AnimatedNavBar([".burger", "active"], ["header nav", "active"], () => {
        document.querySelector("section#home").classList.toggle("blur");
    });
    nav.onScroll(
        () => {
            header.classList.add("white");
        },
        () => {
            header.classList.remove("white");
        },
        offset
    )
});

// const loading = document.querySelector(".loading span");
// const loadingInterval = setInterval(()=>{
//     if (loading.innerHTML.length == "LOADING...".length){
//         loading.innerHTML = "LOADING.";
//     }else{
//         loading.innerHTML += ".";
//     }
// }, 1000);

window.addEventListener('load', e => {
    let x = document.querySelector(".loading")
    x.classList.add("faded");
    setTimeout(() => {
        x.remove();
    }, 600);
});

let currSection = 0,
    sections = document.querySelectorAll("section"),
    header_a = document.querySelectorAll("header a"),
    s = window.location.href.split("#"),
    arrow_pointer = document.querySelector(".arrow-container"),
    isPointerAnimationDone = false;

let disableAllSelected = function(){
    header_a.forEach(e => {
        e.classList.remove("selected");
    });
};

if(s.length > 1){
    for(let i=0; i<sections.length; i++){
        let sec = sections[i];
        if (s[1] == sec.id){
            currSection = i;
            sec.scrollIntoView();
            document.querySelector(`header a[href*=${sec.id}]`).classList.add("selected");
            break;
        }
    };
} else {
    sections[0].scrollIntoView();
    header_a[0].classList.add("selected");
}

let page = new scrollPage({
    parent: document.querySelector("main"),
    sections: sections,
    offset: 60,
    currSection: currSection
});

page.handleScroll = (direction, parent, sections, currSection) => {
    let section = sections[currSection];
    if (section == null) return;
    
    if (!isPointerAnimationDone){
        if (section.id == "home" && !arrow_pointer.style){
            arrow_pointer.style = `animation: fadePointer 1800ms ease-in-out infinite;`
        } 
        if (section.id != "home"){
            arrow_pointer.removeAttribute("style");
        }
    }
    section.scrollIntoView();

    disableAllSelected();
    header_a[currSection].classList.add("selected");

    movehighlight(header_a[currSection]);

    window.location = window.location.href.split("#")[0] + "#" + sections[currSection].id;
}
page.addKeyboardInputHandler();

const highlight = document.querySelector('.highlight');
let selected = document.querySelector(".selected");
for(let i=0; i<header_a.length; i++){
    header_a[i].addEventListener("click", function(e){
        e.stopPropagation();
        disableAllSelected();
        this.classList.add("selected");
        page.currSection = i;
        movehighlight(this);
        selected = this;
    });
    
    header_a[i].addEventListener("mouseenter", () => {
        if (window.innerWidth <= 768) return;
        selected = document.querySelector(".selected");
        selected.classList.remove("selected");
        highlight.style = "transform: translateX(" + i*100 + "%)";
    });
    header_a[i].addEventListener("mouseleave", ()=>{
        if (window.innerWidth <= 768) return;
        selected.classList.add("selected");
        movehighlight(header_a[page.currSection]);
    });
}

const movehighlight = (moveTo) => {
    highlight.style = "transform: translateX(" + Array.prototype.indexOf.call(moveTo.parentElement.parentElement.children, moveTo.parentElement)*100 + "%)";
}

arrow_pointer.addEventListener("click", e => {
    page.isRunning = false;
    page.currSection = 0;
    page.handleScrollWrapper("up");
});