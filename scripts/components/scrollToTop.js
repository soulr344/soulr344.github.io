/*
    Copyright (c) 2021 soulr344 @ github
    hoursSpent = {
        scrollToTop: 1hr,
    }
*/
class scrollToTop {
    /**
     * Adds a click listener to a pre-existing element `selector` that
     * scrolls the page to the top when clicked.
     * @param {string} selector The selector to add the clickable feature.
     * @param {int} offset The y scroll position of the page to display the element.
     * @return {void}
    */
    constructor(selector, offset){
        const element = document.querySelector(selector);

        if (!element){
            console.error("Failed to initialize scrollToTop module! No elements with selector", selector, "found!");
            return null;
        }

        window.addEventListener("scroll", () => {
            if (window.pageYOffset >= offset){
                element.style = "display: flex; opacity: 1;";
            } else if(window.pageYOffset >= (offset - 20)){
                element.style = "display: flex;"
            } else {
                element.removeAttribute("style");
            }
        });
        element.addEventListener("click", () => {
            window.scroll({
                top: 0, 
                left: 0, 
                behavior: 'smooth' 
            });
        });
    }
}