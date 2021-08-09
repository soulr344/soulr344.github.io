new AnimatedNavBar([".burger", "clicked"],
                   ["nav", "visible"], () => {
                       document.body.classList.toggle("noscroll");
                       window.scroll({top: 0, left: 0, behaviour: 'smooth'});
                   });

new Bubbles(".bubbles");

new scrollToTop(".scrolltotop", 150);