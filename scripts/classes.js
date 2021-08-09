/*
    Copyright (c) 2021 soulr344 @ github
    hoursSpent = {
        scrollToTop: .5hr,
        AnimatedNavBar: .5hr,
        bubbles: 6hrs,
    }
*/

class scrollToTop {
    /**
     * Adds a click listener to a pre-existing element `selector` that
     * scrolls the page to the top when clicked.
     * @param {string} selector The selector to add the clickable feature.
     * @return {void}
    */
    constructor(selector, offset){
        const element = document.querySelector(selector)
        if (!element){
            console.log("Failed to initialize scrollToTop module! No elements with selector", selector, "found!");
            return null;
        }
        window.addEventListener("scroll", () => {
            if (window.pageYOffset >= offset){
                element.style = "opacity: 1;";
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

class AnimatedNavBar {
    /**
     * Toggles a class of a burger div and a navigation panel to create an animated navbar.
     * @param {string} burgerSelector The selector of burger div.
     * @param {string} burgerClass The class to toggle for burger div.
     * @param {string} panelSelector The selector of navigation panel.
     * @param {string} panelClass The class to toggle for navigation panel.
     * @param {Function} extraStuff Callback function that runs on every click to the burger.
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
    die(msg){
        throw new Error(msg);
    }
}

class Bubbles {
    /**
     * Animates divs and makes them move randomly.
     * Syntax: <div class="selector" data-radii="radius-in-vh"></div>
     * set the radius of the bubble in vh, you can set width to 30vh and
     * height to 50vh.
     * 
     * @param {string} selector The selector of bubble(s).
     * @return {void}
    */
    constructor(selector){
        const bubbles = document.querySelectorAll(selector);
        bubbles.forEach((bubble) => {
            setInterval(() => {
                const aspectRatio = window.innerWidth / window.innerHeight,
                      radius = parseInt(bubble.getAttribute("data-radii"));

                let [maxTop, maxRight, minTop, minRight] = this.getMinMax(aspectRatio, radius);
                let right = this.Random(minRight, maxRight),
                    top = this.Random(minTop, maxTop);

                bubble.style = `right: ${right}vh; top: ${top}vh;`;
            }, 2500);
        })
    }
    /**
     * Returns a random number between min and max.
     * @param {int} min 
     * @param {int} max 
     */
    Random(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    /**
     * Returns the min, max, top, right values where the bubbles can be
     * positioned on the screen and never get out of sight
     * @param {int} aspectRatio 
     * @param {int} radius 
     * @returns {int}
     */
    getMinMax(aspectRatio, radius){
        let maxTop, maxRight, minTop, minRight;
        if (aspectRatio < 1){
            maxTop = 100 - radius / 2;
            maxRight = aspectRatio * 100 - radius * aspectRatio;
            minTop = -radius / 2;
            minRight = -radius * aspectRatio;
        } else if (aspectRatio == 1) {
            maxTop = 100 - radius / 2;
            maxRight = maxTop;
            minTop = -radius / 2;
            minRight = minTop;
        } else {
            maxTop = 100 - radius / 2;
            maxRight = aspectRatio * 100 - radius / aspectRatio;
            minTop = -radius / 2;
            minRight = -radius / aspectRatio;
        }
        return [maxTop, maxRight, minTop, minRight];
    }
}
