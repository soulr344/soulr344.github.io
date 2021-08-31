class scrollPage {
    'use strict';

    constructor(args){
        this.parent = args.parent || null;
        this.sections = args.sections || [];
        this.currSection = args.currSection || 0;
        this.offset = args.offset || 100;
        this.timeout = args.timeout || 300;

        this.isRunning = false;

        this.addWheelMoveListener();
        this.addTouchHandler();
    }

    addWheelMoveListener(){
        let direction = "", that = this;
        this.parent.addEventListener('wheel', function(e) {
            if (e.deltaY < -20) {
                direction = 'down';
                if (that.currSection <= 0){
                    return;
                }
            }
            if (e.deltaY > 20) {
                direction = 'up';
                if (that.currSection >= (that.sections.length - 1)){
                    return;
                }
            }
            e.stopPropagation();
            e.preventDefault();
            that.handleScrollWrapper(direction);
        });
    }

    addTouchHandler(){
        let parent = this.parent,
            startX = 0,
            startY = 0,
            touchOffset = this.offset,
            direction = "";

        parent.addEventListener("touchstart", e => {
            let touch = e.changedTouches[0];
            startX = touch.pageX;
            startY = touch.pageY;
            direction = "none";
        }, false);

        parent.addEventListener("touchmove", e => {
            e.preventDefault();
        }, false);

        parent.addEventListener("touchend", e => {
            let touch = e.changedTouches[0],
                movementExact = (startY - touch.pageY),
                movement = Math.abs(movementExact);
            if (movement > touchOffset && movementExact > 0){
                direction = "up";
            } else if (movement > touchOffset && movementExact < 0) {
                direction = "down";
            }
            if (direction != "none"){
                this.handleScrollWrapper(direction);
            }
            e.stopPropagation();
        }, false);
    }

    addKeyboardInputHandler(up = "ArrowDown", down = "ArrowUp"){
        this.sections.forEach(element => {
            element.setAttribute("tabindex", "0");
        });
        this.sections.forEach((section) => {
            section.addEventListener("keyup", (e)=>{
                if (e.target != section) return;
                e.preventDefault();
                e.stopPropagation();
                if(e.key == up){
                    this.isRunning = false;
                    this.handleScrollWrapper("up");
                } else if (e.key == down){
                    this.isRunning = false;
                    this.handleScrollWrapper("down");
                }
                this.sections[this.currSection].focus();
            });
        })
    }

    handleScrollWrapper(direction){
        if((this.isRunning) || 
            (this.currSection <= 0 && direction == "down") ||
            (this.currSection >= (this.sections.length -1) && direction == "up")){
            return;
        }

        this.isRunning = true;

        (direction == "down") ? --this.currSection : ++this.currSection;
        window.requestAnimationFrame(() => {
            this.handleScroll(direction, this.parent, this.sections, this.currSection);

            setTimeout(() => {
                this.isRunning = false;
            }, this.timeout)
        });
    }

    handleScroll(direction){
        console.warn("This is default function onscroll, replace it with your own ;)");
    }
}