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
    // if(window.innerWidth <= 768)
    
})(window);