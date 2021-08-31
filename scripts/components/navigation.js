/*
    Copyright (c) 2021 soulr344 @ github
    hoursSpent = {
        Navigation: 2hrs,
    }
*/
class AnimatedNavBar {
    /**
     * Toggles a class of a burger div and a navigation panel to create an animated navbar.
     * @param {string} burgerSelector The selector of burger div.
     * @param {string} burgerClass The class to toggle for burger div.
     * @param {string} panelSelector The selector of navigation panel.
     * @param {string} panelClass The class to toggle for navigation panel.
     * @param {Function} extraStuff Callback function that runs on every click in the burger.
     * @return {void}
    */
    constructor([burgerSelector, burgerClass], [panelSelector, panelClass], extraStuff = null){
        const burger = document.querySelector(burgerSelector),
            panel = document.querySelector(panelSelector);

        (burger==undefined || panel==undefined || burgerClass == undefined || panelClass == undefined) && this.die("Error: undefined panel/burger class/selector!");

        burger.addEventListener("click", ()=>{
            burger.classList.toggle(burgerClass);
            panel.classList.toggle(panelClass);

            if (extraStuff != null) extraStuff();
        });
    }
    onScroll(callbackOnScroll, callbackOnInit, offset){
        window.addEventListener("scroll", function(){
            if (window.pageYOffset >= offset){
                callbackOnScroll();
                return;
            }
            callbackOnInit();
        });
    }
    die(msg){
        throw new Error(msg);
    }
}

class DisableSelection {
    /**
     * Disables selected status of selected link on hover of other links.
     * @param {String} selector The selector of the navigation links
     * @param {String} className The class of default 'selected' link
     */
    constructor(selector, className){
        const element = document.querySelector(`${selector}.${className}`);
        const elements = document.querySelectorAll(`${selector}:not(.${className})`);
        elements.forEach(el => {
            el.addEventListener("mouseenter", function(){
                element.classList.remove(className);
            })
            el.addEventListener("mouseleave", function(){
                element.classList.add(className);
            })
        })
    }
}