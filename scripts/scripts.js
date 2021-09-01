/* Some constants/variable declarations */
const sections = document.querySelectorAll("section"),
      header_a = document.querySelectorAll("header a"),
      s = window.location.href.split("#"),
      arrow_pointer = document.querySelector(".arrow-container"),
      highlight = document.querySelector('.highlight');
let currSection = 0;

/* Load the navigation bar stuff */
loadJS("./scripts/components/navigation.js", () => {
    const header = document.querySelector("header");
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
        30*vh
    )
});
/* Removes "selected class from all __a__ nav links" */
const disableAllSelected = function(){
    header_a.forEach(e => {
        e.classList.remove("selected");
    });
};

/* The initial loading screen fading animation */
window.addEventListener('load', e => {
    let x = document.querySelector(".loading")
    x.classList.add("faded");
    setTimeout(() => {
        x.remove();
    }, 600);
});

/* The single page scroll effect thing */
const page = new scrollPage({
    parent: document.querySelector("main"),
    sections: sections,
    offset: 60,
    currSection: currSection
});
page.handleScroll = (direction, parent, sections, currSection) => {
    let section = sections[currSection];
    if (section == null) return;
    
    section.scrollIntoView();

    disableAllSelected();
    header_a[currSection].classList.add("selected");
    header_a[currSection].click();

    movehighlight(header_a[currSection], currSection, true);

    if (section.id == "home"){
        window.history.pushState({}, "", s[0]);
        animatePointer(true);
    } else {
        animatePointer(false);
        window.location = s[0] + "#" + sections[currSection].id;
    }
}
page.addKeyboardInputHandler();

/* The downwards arrow on home section animation */
const animatePointer = (start) => {
    if(start){
        arrow_pointer.style = `animation: fadePointer 900ms ease-in-out infinite alternate;`;
    } else {
        arrow_pointer.removeAttribute("style");
    }
}
/* Move to projects section on click of the arrow */
arrow_pointer.addEventListener("click", () => {
    page.isRunning = false;
    page.currSection = 0;
    page.handleScrollWrapper("up");
});

/* The navigation pill moving with hover/section change effect */
const movehighlight = (moveTo, i, moveHighlight = false) => {
    if(moveHighlight){
        highlight.style = "width: "+ moveTo.parentElement.getBoundingClientRect().width + "px;transform: translateX(" + (Array.prototype.indexOf.call(moveTo.parentElement.parentElement.children, moveTo.parentElement) - parseInt(highlight.getAttribute("data-currsection")))*100 + "%)";
        setTimeout(()=>{
            highlight.style = "";
            header_a[i].parentElement.appendChild(highlight);
            highlight.setAttribute("data-currsection", i);
        }, 200);
    } else {
        highlight.style = "width: "+ moveTo.parentElement.getBoundingClientRect().width + "px;transform: translateX(" + (i - Array.prototype.indexOf.call(moveTo.parentElement.parentElement.children, moveTo.parentElement))*100 + "%)";
    }
    console.log(i)
}

if(s.length > 1){
    if (s[1] == "home" || s[1] == "") {
        window.location = s[0];
    }
    for(let i=0; i<sections.length; i++){
        let sec = sections[i];
        if (s[1] == sec.id){
            currSection = i;
            sec.scrollIntoView();
            let select = document.querySelector(`header a[href*=${sec.id}]`);
            select.classList.add("selected");
            highlight.setAttribute("data-currsection", i);
            movehighlight(select, i, true);
            break;
        }
    };
} else {
    sections[0].scrollIntoView();
    header_a[0].classList.add("selected");
    highlight.setAttribute("data-currsection", 0);
    animatePointer(true);
}

for(let i=0; i<header_a.length; i++){
    header_a[i].addEventListener("click", function(e){
        e.stopPropagation();
        disableAllSelected();
        this.classList.add("selected");
        page.currSection = i;
        movehighlight(this, i, true);
    });
    
    header_a[i].addEventListener("mouseenter", () => {
        if (window.innerWidth <= 768) return;
        const selected = header_a[highlight.getAttribute("data-currsection")];
        selected.classList.remove("selected");
        movehighlight(selected, i)
    });
    header_a[i].addEventListener("mouseleave", ()=>{
        if (window.innerWidth <= 768) return;
        const selected = header_a[highlight.getAttribute("data-currsection")];
        selected.classList.add("selected");
        highlight.style = "";
    });
}
