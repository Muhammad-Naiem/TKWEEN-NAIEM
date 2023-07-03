(function ($) {
    $(function () {

        $('.hamburger').click(function () {
            $("body").toggleClass("navShown");
            $(".nav-wrap").fadeToggle()
            $('.nav-close').click(function () {
                $("body").removeClass("navShown");
                $(".nav-wrap").fadeOut()
            });
        });

        // Start On Load Animation 
        if ($('.loading-screen').length && $('.home-page').length) {

            $(window).on('load', function () {
                setTimeout(function () {
                    $('.loading-screen').addClass('shown_first');
                }, 100);

                setTimeout(function () {
                    $('.loading-screen').removeClass('shown_first');
                    $('.loading-screen').addClass('secound_shown');
                }, 3000);

                setTimeout(function () {
                    $('.loading-screen').addClass('shape_shown');
                }, 7000);

                setTimeout(function () {
                    $('.loading-screen').addClass('move_screen');
                }, 9000);

                setTimeout(function () {
                    $('.loading-screen-first span').fadeIn()
                    $({
                        Counter: 0
                    }).animate({
                        Counter: $('.loading-screen-first span').text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $('.loading-screen-first span').text(Math.ceil(this.Counter));
                        }
                    });
                }, 1000);

            });

        }
        if ($('.loading-screen-others').length) {

            $(window).on('load', function () {
                setTimeout(function () {
                    $('.loading-screen').addClass('shown_first');
                }, 100);

                setTimeout(function () {
                    $('.loading-screen').addClass('remove-bg');
                }, 1500);
                setTimeout(function () {
                    $('.loading-screen').removeClass('shown_first');
                     setTimeout(function () {
                    $('.loading-screen').addClass('move_screen');
                      }, 1000);
                }, 3000);

            });

        }

        if ($('.play-video').length) {

            var videoElement = $('.play-video video');
            var playPauseButton = $('.play-icon');

            playPauseButton.on('click', function(){
                $('.play-video').addClass('playing icon-hide');
                $('.play-video figure, .show-reel-anim-text').fadeOut();
                if ($('.play-video').hasClass('playing')) {
                    videoElement[0].play();
                }else{
                    videoElement[0].pause();
                    $('.play-video figure, .show-reel-anim-text').fadeIn();
                }
                
            });
            videoElement.click(function(){
                $('.play-video').toggleClass('icon-hide');
            })
            
            videoElement.on('ended', () => {
                $('.play-video').removeClass('playing icon-hide');
                $('.play-video figure, .show-reel-anim-text').fadeIn();
            });


        }

        var cursor = document.querySelector('.cursor');
        var cursorinner = document.querySelector('.cursor2');
        var a = document.querySelectorAll('a');

        document.addEventListener('mousemove', function (e) {
            var x = e.clientX;
            var y = e.clientY;
            cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0) rotate(45deg)`
        });

        document.addEventListener('mousemove', function (e) {
            var x = e.clientX;
            var y = e.clientY;
            cursorinner.style.left = x + 'px';
            cursorinner.style.top = y + 'px';
        });

        document.addEventListener('mousedown', function () {
            cursor.classList.add('click');
            cursorinner.classList.add('cursorinnerhover')
        });

        document.addEventListener('mouseup', function () {
            cursor.classList.remove('click')
            cursorinner.classList.remove('cursorinnerhover')
        });

        a.forEach(item => {
            item.addEventListener('mouseover', () => {
                cursorinner.classList.add('hover');
            });
            item.addEventListener('mouseleave', () => {
                cursorinner.classList.remove('hover');
            });
        })

        // End On Load Animation


        $('.filter-accordion-title').on('click', function(){
            $(this).toggleClass('active')
            $('.projects-main-left').slideToggle()
        })


        if ($('.swiper-container').length) {
            ////////////////////////////////////////////////////////////
            // Team Slider
            const teamSwiper = new Swiper(".swiper-container", {
                // Optional parameters
                slidesPerView: "auto",
                keyboard: true,
                direction: "horizontal",
                loop: false,
                speed: 800,
                mousewheel: {
                    forceToAxis: true
                },
                touchEventsTarget: "container",
                freeMode: true,
                navigation: {
                    nextEl: '.our-project-slider-arrow .next',
                    prevEl: '.our-project-slider-arrow .prev',
                },
            });
            let myTimeout;
            teamSwiper.on("progress", function (e) {
                clearTimeout(myTimeout);
                $(".our-project-slider-item").addClass("scaled");
                myTimeout = setTimeout(function () {
                    $(".our-project-slider-item").removeClass("scaled");
                }, 100);
            });
        }

        $(window).on('load', function () {
            if($('.home-page').length){
            setTimeout(function () {
                $.fn.convertToSeperateLetters = function () {
                    return this.each(function () {
                        var $el = $(this);
                        var elements = convertToSeperateLetters($el, false);
                        $el.empty().append(elements);
                        return $el;
                    });
                }
                $('.word-char').convertToSeperateLetters();

                function convertToSeperateLetters($element, asSubNode) {
                    var elements = [];
                    var childNodes = $element.contents();
                    // Loop through all child nodes of selected element
                    for (var c = 0; c < childNodes.length; c++) {
                        var node = childNodes[c];
                        var type = node.nodeType;
                        // Process a child element
                        if (type == Node.ELEMENT_NODE) {
                            Array.prototype.push.apply(elements, convertToSeperateLetters($(node), true));
                        }
                        // Process a piece of text
                        else if (type == Node.TEXT_NODE) {
                            var text = node.nodeValue;
                            // Process each word
                            var words = text.split(' ');
                            for (var w = 0; w < words.length; w++) {
                                var word = words[w];
                                // Skip empty words
                                if (word == '') continue;
                                // Wrap each word into span
                                var $word = $('<div/>').addClass('word');
                                for (var l = 0; l < word.length; l++) {
                                    var letter = word[l];
                                    // Wrap each letter into span
                                    var $letter = $('<div/>').addClass('letter');
                                    if (!asSubNode) {
                                        $letter.html(letter);
                                    }
                                    if (asSubNode) {
                                        var $subNode = $element.clone().empty().html(letter);
                                        $letter.append($subNode);
                                    }
                                    $word.append($letter);
                                }
                                elements.push($word);
                            }
                        }
                    }
                    return elements;
                }

                $(function () {
                    var el = $('.hero-title h2 .word-char, .hero-title h1 .word-char');
                    var index = 0;
                    var timer = window.setInterval(function () {
                        if (index < el.length) {
                            el.eq(index++).addClass('word-char-active');
                        } else {
                            window.clearInterval(timer);
                        }
                    }, 1000);
                });
                $(function () {
                    var el = $('.hero-title p.word-char');
                    var index = 0;
                    var timer = window.setInterval(function () {
                        if (index < el.length) {
                            el.eq(index++).addClass('word-char-active');
                        } else {
                            window.clearInterval(timer);
                        }
                    }, 1000);
                });

                function runSplit2() {
                    typeSplit = new SplitType(".split-lines-hero", {
                        types: "lines, words"
                    });
                }
                runSplit2();
                // Update on window resize
                let windowWidth = $(window).innerWidth();
                window.addEventListener("resize", function () {
                    if (windowWidth !== $(window).innerWidth()) {
                        windowWidth = $(window).innerWidth();
                        typeSplit.revert();
                        runSplit();
                        runSplit2();

                    }
                });
                $(function () {
                    var el = $('.split-lines-hero .line');
                    var index = 0;
                    var timer = window.setInterval(function () {
                        if (index < el.length) {
                            el.eq(index++).addClass('word-char-active');
                        } else {
                            window.clearInterval(timer);
                        }
                    }, 400);
                });
            }, 8500)
            }
            if($('.loading-screen-others').length){
            setTimeout(function () {
                $.fn.convertToSeperateLetters = function () {
                    return this.each(function () {
                        var $el = $(this);
                        var elements = convertToSeperateLetters($el, false);
                        $el.empty().append(elements);
                        return $el;
                    });
                }
                $('.word-char').convertToSeperateLetters();

                function convertToSeperateLetters($element, asSubNode) {
                    var elements = [];
                    var childNodes = $element.contents();
                    // Loop through all child nodes of selected element
                    for (var c = 0; c < childNodes.length; c++) {
                        var node = childNodes[c];
                        var type = node.nodeType;
                        // Process a child element
                        if (type == Node.ELEMENT_NODE) {
                            Array.prototype.push.apply(elements, convertToSeperateLetters($(node), true));
                        }
                        // Process a piece of text
                        else if (type == Node.TEXT_NODE) {
                            var text = node.nodeValue;
                            // Process each word
                            var words = text.split(' ');
                            for (var w = 0; w < words.length; w++) {
                                var word = words[w];
                                // Skip empty words
                                if (word == '') continue;
                                // Wrap each word into span
                                var $word = $('<div/>').addClass('word');
                                for (var l = 0; l < word.length; l++) {
                                    var letter = word[l];
                                    // Wrap each letter into span
                                    var $letter = $('<div/>').addClass('letter');
                                    if (!asSubNode) {
                                        $letter.html(letter);
                                    }
                                    if (asSubNode) {
                                        var $subNode = $element.clone().empty().html(letter);
                                        $letter.append($subNode);
                                    }
                                    $word.append($letter);
                                }
                                elements.push($word);
                            }
                        }
                    }
                    return elements;
                }

                $(function () {
                    var el = $('.hero-title h2 .word-char, .hero-title h1 .word-char');
                    var index = 0;
                    var timer = window.setInterval(function () {
                        if (index < el.length) {
                            el.eq(index++).addClass('word-char-active');
                        } else {
                            window.clearInterval(timer);
                        }
                    }, 1000);
                });
                $(function () {
                    var el = $('.hero-title p.word-char');
                    var index = 0;
                    var timer = window.setInterval(function () {
                        if (index < el.length) {
                            el.eq(index++).addClass('word-char-active');
                        } else {
                            window.clearInterval(timer);
                        }
                    }, 1000);
                });

                function runSplit2() {
                    typeSplit = new SplitType(".split-lines-hero", {
                        types: "lines, words"
                    });
                }
                runSplit2();
                // Update on window resize
                let windowWidth = $(window).innerWidth();
                window.addEventListener("resize", function () {
                    if (windowWidth !== $(window).innerWidth()) {
                        windowWidth = $(window).innerWidth();
                        typeSplit.revert();
                        runSplit();
                        runSplit2();

                    }
                });
                $(function () {
                    var el = $('.split-lines-hero .line');
                    var index = 0;
                    var timer = window.setInterval(function () {
                        if (index < el.length) {
                            el.eq(index++).addClass('word-char-active');
                        } else {
                            window.clearInterval(timer);
                        }
                    }, 400);
                });
            }, 4000)
            }
            
        })



        if ($(window).width() > 991) {


            $('.home-content-wrap').removeClass('panel')

            if ($('.home-page').length) {


            gsap.registerPlugin(ScrollTrigger);

            let page2 = document.querySelector(".show-reel-anim-wrap");
            let page3 = document.querySelector(".show-reel-anim-main");
            let page4 = document.querySelector(".show-reel-anim-text");
            let page5 = document.querySelector(".show-reel-anim-video");
            let page6 = document.querySelector(".about-one");
            let page7 = document.querySelector(".about-two");
            let page8 = document.querySelector(".about-three");
            let page9 = document.querySelector(".our-approach-wrap");
            let page10 = document.querySelector(".home-content-wrap");
            let page11 = document.querySelector(".partners-wrap");
            let page12 = document.querySelector(".our-project-wrap");
            let page13 = document.querySelector(".newsletter-wrap");
            let page14 = document.querySelector(".main-footer-section");


            /*let page3 = document.querySelector(".page3");*/

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 3),
                }
            });
            tl4.from(page2, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

            tl4.fromTo(page3, {
                    duration: 1,
                    yPercent: 65,
                    ease: "none"
                }, {
                    duration: 2,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )

                
             tl4.fromTo(page4, {
                     duration: 2,
                     width: '100%',
                     ease: "none"
                 }, {
                     duration: 2,
                     width: "75%",
                     ease: "none"
                 },
                 "<"
             )
                
            tl4.fromTo(page5, {
                    duration: 2,
                    width: '428px',
                    height: '553px',
                    ease: "none"
                }, {
                    duration: 2,
                    width: "calc(100% + 10px)",
                    height: "calc(100% + 10px)",
                    ease: "none"
                },
                ">"
            )

             tl4.fromTo(page4, {
                    duration: 2,
                    width: '75%',
                    ease: "none"
                }, {
                    duration: 2,
                    width: "50%",
                    ease: "none"
                },
                "<"
            )

            tl4.from(page6, {
                yPercent: 200,
                duration: 2,
                ease: "none"
            });
            tl4.from(page7, {
                yPercent: 150,
                duration: 2,
                ease: "none"
            });
            tl4.from(page8, {
                yPercent: 150,
                duration: 2,
                ease: "none"
            });
            tl4.from(page9, {
                yPercent: 150,
                duration: 2,
                ease: "none"
            });
            tl4.from(page10, {
                yPercent: 120,
                duration: 2,
                ease: "none"
            });



            let typeSplit;
            //            // Split the text up
            function runSplit() {
                typeSplit = new SplitType(".split-lines", {
                    types: "lines, words"
                });
                $(".line").append("<div class='line-mask'></div>");
                createAnimation();
            }
            runSplit();


            // Update on window resize
            let windowWidth = $(window).innerWidth();
            window.addEventListener("resize", function () {
                if (windowWidth !== $(window).innerWidth()) {
                    windowWidth = $(window).innerWidth();
                    typeSplit.revert();
                    runSplit();

                }
            });

            function createAnimation() {
                $(".line").each(function (index) {
                    tl4.fromTo($(this).find(".line-mask"), {
                            width: "100%",
                        }, {
                            width: "0%",
                        },
                        ">"
                    )
                });
            }


            tl4.from(page11, {
                yPercent: 120,
                duration: 2,
                ease: "none"
            });

            tl4.from(page12, {
                yPercent: 120,
                duration: 2,
                ease: "none"
            });

            tl4.from(page13, {
                yPercent: 120,
                duration: 2,
                ease: "none"
            });

            tl4.from(page14, {
                yPercent: 120,
                duration: 2,
                ease: "none"
            });
      
        

            }


        }


        
        if ($('.design-page').length && $(window).width() > 767) {
            gsap.registerPlugin(ScrollTrigger);

            let page2 = document.querySelector(".design-approach-wrap");
            let page3 = document.querySelector(".design-about.timeless");
            let page4 = document.querySelector(".design-about.strategic");
            let page5 = document.querySelector(".design-about.creative");
            let page6 = document.querySelector(".services-wrap");
            let page7 = document.querySelector(".services-item-wrap");
            let page8 = document.querySelector(".design-project");
            let page9 = document.querySelector(".design-newsletter");
            let page10 = document.querySelector(".main-footer-section");
            /*let page3 = document.querySelector(".page3");*/

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 2.5),
                }
            });

            tl4.from(page2, {
                xPercent: 100,
                ease: "none"
            });
            tl4.from(page3, {
                xPercent: 100,
                ease: "none"
            });
            tl4.from(page4, {
                xPercent: 100,
                ease: "none"
            });
            tl4.from(page5, {
                xPercent: 100,
                ease: "none"
            });
            tl4.from(page6, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page7, {
                xPercent: 100,
                ease: "none"
            });

//            let projects = gsap.utils.toArray('.services-item-wrap ul li:not(.services-item-wrap ul li:last-child)');
//            projects.forEach((project, i) => {
//                if (i !== projects.length + 1) {
//                    tl4.to(project, {
//                        yPercent: -98.3 + (projects.length + 1),
//                        ease: "none",
//                        stagger: 1,
//                    });
//                }
//            });
//
//            gsap.set(".services-item-wrap ul li", {
//                zIndex: (i, target, targets) => targets.length - i
//            });
//
//            tl4.to('.services-item-wrap ul li:last-child', {
//                yPercent: -18,
//                ease: "none"
//            });
            
            let stickyImg = ".services-item-thumb-wrap";

            $(".services-item-title").each(function (index) {
                let myImg = $(this).next(stickyImg);
                myImg.insertAfter($(this));
            });

            gsap.set($(stickyImg).first(), {
                height: "100vh"
            });

            $(stickyImg).not(":last-child").each(function (index) {
                tl4.to($(this), {
                    height: "0vh"
                });
                tl4.to($(this).nextAll(stickyImg).eq(0), {
                    height: "70vh"
                }, "<");
            });
            
            
            
            tl4.from(page8, {
                yPercent: 180,
                ease: "none"
            });
            tl4.from(page9, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page10, {
                yPercent: 100,
                ease: "none"
            });


        }
        if ($('.brand-page').length && $(window).width() > 767) {
            gsap.registerPlugin(ScrollTrigger);

            let page2 = document.querySelector(".overlay-scroll-one");
            let page3 = document.querySelector(".overlay-scroll-two");
            let page4 = document.querySelector(".branding-services-wrap");
            let page5 = document.querySelector(".design-project");
            let page6 = document.querySelector(".design-newsletter");
            let page7 = document.querySelector(".main-footer-section");
            /*let page3 = document.querySelector(".page3");*/

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 5),
                }
            });

            tl4.from(page2, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page3, {
                xPercent: 100,
                ease: "none"
            });
            tl4.from(page4, {
                yPercent: 35,
                ease: "none"
            });


            // varaibles and defaults
            let workItems = $(".work_item");
            gsap.defaults({
                ease: "none"
            });

            tl4.set($(this).find(".work_photo"), {
                transformOrigin: "0% 0%"
            });
            
            workItems.each(function (index) {
                tl4.fromTo(
                    $(this), {
                        height: "100vh"
                    }, {
                        height: "47px",
                        duration: 0.5,
                        onComplete: () => {
                            let myIndex = index - 2;
                            if (myIndex > 1 && myIndex < workItems.length - 5) {
                                gsap.to(workItems.eq(myIndex), {
                                    height: "0px",
                                    duration: 0.5
                                });
                            }
                        },
                        onReverseComplete: () => {
                            let myIndex = index - 5;
                            if (myIndex > 1) {
                                gsap.to(workItems.eq(myIndex), {
                                    height: "47px",
                                    duration: 0.5
                                });
                            }
                        }
                    }
                , ">");
                if (index > -1) {
                    tl4.fromTo($(this).find(".work_photo"), {
                        scale: 1
                    }, {
                        scale: 0,
                        duration: 0.5
                    }, "<");
                }
                
                 
            });


            // animate other photos
          
            tl4.from(page5, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page6, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page7, {
                yPercent: 100,
                ease: "none"
            });

            $('[hover-block="component"]').each(function () {
                let block = $(this);
                let blockContent = block.find(".block-content");
                let blockImg = block.find('[hover-block="img"]');
                let imgColorPrimary = block.attr("hover-block-logo-color");
                let imgColorHover = block.attr("hover-block-logo-color-hover");
                let hoverColor = block.attr("hover-block-hover-color");

                blockImg.css("color", imgColorPrimary);

                blockContent.clone().attr("hover-block", "duplicate").appendTo(block);

                let duplicateBlock = block.find('[hover-block="duplicate"]');
                duplicateBlock.css("background-color", hoverColor);
                duplicateBlock.find('[hover-block="img"]').css("color", imgColorHover);

                let hoverAnimation = gsap.timeline({
                    paused: true
                });

                gsap.set(duplicateBlock, {
                    clipPath: `circle(0% at 50% 50%)`
                });

                $(block).on("mouseenter", function (event) {
                    // find coordinates of mouse
                    let bounds = event.target.getBoundingClientRect();
                    let x = event.clientX - bounds.left;
                    let y = event.clientY - bounds.top;
                    let blockWidth = block.width();
                    let blockHeight = block.height();

                    let hoverX = (x / blockWidth) * 100 + "%";
                    let hoverY = (y / blockHeight) * 100 + "%";

                    hoverAnimation.fromTo(
                        duplicateBlock, {
                            clipPath: `circle(0% at ${hoverX} ${hoverY})`
                        }, {
                            clipPath: `circle(141.7% at ${hoverX} ${hoverY})`,
                            duration: 1,
                            ease: "power4.out"
                        }
                    );

                    hoverAnimation.play();
                });

                $(block).on("mouseleave", function (event) {
                    // find coordinates of mouse
                    let bounds = event.target.getBoundingClientRect();
                    let x = event.clientX - bounds.left;
                    let y = event.clientY - bounds.top;
                    let blockWidth = block.width();
                    let blockHeight = block.height();

                    let hoverX = (x / blockWidth) * 100 + "%";
                    let hoverY = (y / blockHeight) * 100 + "%";

                    hoverAnimation.fromTo(
                        duplicateBlock, {
                            clipPath: `circle(141.7% at ${hoverX} ${hoverY})`
                        }, {
                            clipPath: `circle(0% at ${hoverX} ${hoverY})`,
                            duration: 0.6,
                            ease: "expo.out"
                        }
                    );

                    hoverAnimation.play();
                });
            });
        }
        if ($('.hardware-page').length && $(window).width() > 767) {
            gsap.registerPlugin(ScrollTrigger);

            let page2 = document.querySelector(".hardware-services");
            let page3 = document.querySelector(".services-item-wrap");
            let page4 = document.querySelector(".services-item-wrap-inner");
            let page5 = document.querySelector(".startups-wrap");
            let page11 = document.querySelector(".develop-wrap");
            let page12 = document.querySelector(".hardware-showreel-thumb");
            let page13 = document.querySelector(".hardware-showreel-image");
            let page14 = document.querySelector(".userfeedback-wrap");
            let page15 = document.querySelector(".design-newsletter");
            let page16 = document.querySelector(".main-footer-section");

            let page6 = $(".startups-item").eq(0);
            let page7 = $(".startups-item").eq(1);
            let page8 = $(".startups-item").eq(2);
            let page9 = $(".startups-item").eq(3);
            let page10 = $(".startups-item").eq(4);
            /*let page3 = document.querySelector(".page3");*/

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 6),
                }
            });
            tl4.from(page2, {
                yPercent: 120,
                ease: "none"
            });
            tl4.from(page3, {
                xPercent: 120,
                ease: "none"
            });

            
            let stickyImg = ".services-item-thumb-wrap";

            $(".services-item-title").each(function (index) {
                let myImg = $(this).next(stickyImg);
                myImg.insertAfter($(this));
            });

            gsap.set($(stickyImg).first(), {
                height: "100vh"
            });

            $(stickyImg).not(":last-child").each(function (index) {
                tl4.to($(this), {
                    height: "0vh"
                });
                tl4.to($(this).nextAll(stickyImg).eq(0), {
                    height: "70vh"
                }, "<");
            });

            tl4.fromTo(page5, {
                    duration: 1,
                    yPercent: 150,
                    ease: "none"
                }, {
                    duration: 1,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )
            
            var item1 =  -71.5;
            var item2 =  -52;
            var item3 =  -33;
            var item4 =  -14;
            var item5 =  5;
            
            
            if ($(window).width() > 1024) {
                if ($(window).height() < 750) {
                    var item1 = -39;
                    var item2 =  -22;
                    var item3 =  -4.5;
                    var item4 = 12.7;
                    var item5 =  30.4;
                }
            }
            tl4.fromTo(page6, {
                    duration: 1,
                    yPercent: 10,
                    ease: "none"
                }, {
                    duration: 1,
                    yPercent: item1,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page7, {
                    duration: 1,
                    yPercent: 28,
                    ease: "none"
                }, {
                    duration: 1,
                    yPercent: item2,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page8, {
                    duration: 1,
                    yPercent: 46,
                    ease: "none"
                }, {
                    duration: 1,
                    yPercent: item3,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page9, {
                    duration: 1,
                    yPercent: 64,
                    ease: "none"
                }, {
                    duration: 1,
                    yPercent: item4,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page10, {
                    duration: 1,
                    yPercent: 82,
                    ease: "none"
                }, {
                    duration: 1,
                    yPercent: item5,
                    ease: "none"
                },
                ">"
            )
            
            
            

            // varaibles and defaults
            let workItems = $(".startups-item");
            gsap.defaults({
                ease: "none"
            });
            gsap.set(".startups-item", {
                zIndex: (i, target, targets) => targets.length + i
            });
            tl4.from(page11, {
                yPercent: 120,
                duration: 1,
                ease: "none"
            });
            tl4.from('.hardware-showreel', {
                xPercent: 120,
                duration: 1,
                ease: "none"
            });
            tl4.fromTo(page12, {
                    duration: 1,
                    yPercent: 55,
                    ease: "none"
                }, {
                    duration: 1,
                    yPercent: 10.5,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page13, {
                    duration: 1,
                    width: '428px',
                    height: '553px',
                    ease: "none"
                }, {
                    duration: 1,
                    width: '100%',
                    height: 'calc(100% - 8%)',
                    ease: "none"
                },
                ">"
            )

            tl4.from(page14, {
                yPercent: 120,
                duration: 1,
                ease: "none"
            });

            tl4.from(page15, {
                yPercent: 120,
                duration: 1,
                ease: "none"
            });
            tl4.from(page16, {
                yPercent: 120,
                duration: 1,
                ease: "none"
            });

            if($(window).width() > 991){
                
            var titleWidth = $('.develop-accordion-title').outerWidth()
            var titleLength = $('.develop-accordion-title').length;
            var initWidth = titleWidth * titleLength;
            var windowWidth = $(window).outerWidth();
            var totalWidth = windowWidth - initWidth;
            $('.develop-accordion-content-inner').width(totalWidth - 7);
            $('.develop-accordion-title').eq(0).addClass('accordion-active')
            $('.develop-accordion-content-wrap').eq(0).addClass('accordion-active')
            $(".develop-accordion-title").on("click touch", function () {
                console.log('red')
                $('.develop-accordion-title').removeClass("accordion-active")
                $('.develop-accordion-content-wrap').removeClass('accordion-active')
                $(this).addClass("accordion-active")
                $(this).next().addClass('accordion-active')
            })

            }

            if($(window).width() < 992){
                
            
            $('.develop-accordion-title').eq(0).addClass('accordion-active')
            $('.develop-accordion-content-wrap').eq(0).addClass('accordion-active')
            $(".develop-accordion-title").on("click touch", function () {
                console.log('red')
                $('.develop-accordion-title').removeClass("accordion-active")
                $('.develop-accordion-content-wrap').removeClass('accordion-active')
                $(this).addClass("accordion-active")
                $(this).next().addClass('accordion-active')
            })


            }



        }
        if ($('.projects-page').length && $(window).width() > 767) {
            const locoScroll = new LocomotiveScroll({
                el: document.querySelector(".smooth-scroll"),
                smooth: true
            });
        }
        
        if ($('.tricks').length) {
            var tricksWord = document.getElementsByClassName("tricks");
            for (var i = 0; i < tricksWord.length; i++) {
                var wordWrap = tricksWord.item(i);
                wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="tricksword">$2</span>');
            }
            var tricksLetter = document.getElementsByClassName("tricksword");
            for (var i = 0; i < tricksLetter.length; i++) {
                var letterWrap = tricksLetter.item(i);
                letterWrap.innerHTML = letterWrap.textContent.replace(/\S/g, "<span class='letter-text'>$&</span>");
            }

            function switchHeadlines() {
                let activeHeadline = $('.headline_text.tricks.active');
                if (activeHeadline.next().length > 0) {
                    activeHeadline.next().addClass('active');
                } else {
                    $('.headline_text.tricks').eq(0).addClass('active');
                }
                activeHeadline.removeClass('active');
            }

            function createAnimation() {

                var tl = anime.timeline({
                    loop: false,
                    autoplay: true
                });

                tl
                    .add({
                        targets: '.headline_text.active .letter-text',
                        translateY: [100, 0],
                        translateZ: 0,
                        opacity: [0, 1],
                        easing: "easeOutExpo",
                        duration: 1400,
                        delay: (el, i) => 300 + 30 * i
                    }).add({
                        targets: '.headline_text.active .letter-text',
                        translateY: [0, -100],
                        opacity: [1, 0],
                        easing: "easeInExpo",
                        duration: 1200,
                        delay: (el, i) => 100 + 30 * i,
                        // Change text on loop
                        complete: function (anim) {
                            switchHeadlines();
                            createAnimation();
                        }
                    });


            }
            createAnimation();
        }
        
        
        if ($('.about-page').length && $(window).width() > 767) {
            gsap.registerPlugin(ScrollTrigger);

            let page2 = document.querySelector(".about-content-wrap");
            let page3 = document.querySelector(".about-reel-wrap");
            let page4 = document.querySelector(".about-reel-thumb");
            let page5 = document.querySelector(".about-reel-thumb-inner");
            let page6 = document.querySelector(".circle-section");
            let page7 = document.querySelector(".branding-light-wrap");
            let page8 = document.querySelector(".about-show-reel-anim");
            let page9 = document.querySelector(".about-scroll-anim-wrap");
            let page10 = document.querySelector(".about-scroll-anim-inner");
            let page11 = document.querySelector(".team-wrap");
            let page12 = document.querySelector(".tkween-values-wrap");
            let page13 = document.querySelector(".our-mission-wrap");
            let page14 = document.querySelector(".about-marquee-section");
            let page15 = document.querySelector(".tkween-ceo-wrap");
            let page16 = document.querySelector(".opaque-anim-three");
            let page17 = document.querySelector(".opaque-anim-two");
            let page18 = document.querySelector(".tkween-ceo-content h4");
            let page19 = document.querySelector(".newsletter-wrap");
            let page20 = document.querySelector(".main-footer-section");
            //            let page5 = document.querySelector(".startups-wrap");
            //            let page6 = document.querySelector(".develop-wrap");
            //            let page7 = document.querySelector(".hardware-showreel-thumb");
            //            let page8 = document.querySelector(".hardware-showreel-image");
            //            let page9 = document.querySelector(".userfeedback-wrap");
            //            let page10 = document.querySelector(".design-newsletter");
            //            let page11 = document.querySelector(".main-footer-section");

            /*let page3 = document.querySelector(".page3");*/

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 6),
                    onLeave: ()=> ScrollTrigger.clearScrollMemory()
                }
            });
            tl4.from(page2, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page3, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.fromTo(page4, {
                    duration: 2,
                    yPercent: 65,
                    ease: "none"
                }, {
                    duration: 2,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page5, {
                    duration: 1,
                    width: '428px',
                    height: '553px',
                    ease: "none"
                }, {
                    duration: 1,
                    width: "100%",
                    height: "100%",
                    ease: "none"
                },
                ">"
            )

            tl4.from(page6, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

            // set variables
            let circleParent = $(".circle");
            let circleItem = $(".circle_item");
            let itemLength = circleItem.length;
            // 360 divided by number of items
            let rotateAmount = 360 / itemLength;
            let previousIndex = 0;
            let currentRotation = 0;

            function makeItemActive(item) {
                let itemIndex = item.index();
                let difference = itemIndex - previousIndex;
                let clockwiseRotation = (difference + itemLength) % itemLength;
                let counterclockwiseRotation = (itemLength - difference) % itemLength;
                let isClockwise = clockwiseRotation <= counterclockwiseRotation;
                let amount = (isClockwise ? clockwiseRotation : -counterclockwiseRotation) * rotateAmount;
                let total = currentRotation + amount;

                circleItem.removeClass("current");
                item.addClass("current");
                circleParent.css("transform", `rotate(${total * -1}deg)`);

                previousIndex = itemIndex;
                currentRotation = total;
            }
            makeItemActive(circleItem.first());

            // Set each item's rotation
            circleItem.each(function (index) {
                let thisItem = $(this);
                let childLink = $(this).find(".circle_link");
                let itemRotation = rotateAmount * index;
                $(this).css("transform", `rotate(${itemRotation}deg)`);

                // slide parent circle to rotation of the clicked link
                childLink.on("click", function (e) {
                    e.preventDefault();
                    console.log('red')
                    makeItemActive(thisItem);
                });
            });

            // reveal circle after item rotations are set
            circleParent.css("opacity", "1.0");


            tl4.from(page7, {
                yPercent: 130,
                duration: 2,
                ease: "none"
            });
            tl4.from(page8, {
                yPercent: 250,
                duration: 2,
                ease: "none"
            });

            tl4.fromTo(page9, {
                    duration: 1,
                    yPercent: 65,
                    ease: "none"
                }, {
                    duration: 2,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page10, {
                    duration: 2,
                    width: '428px',
                    height: '553px',
                    ease: "none"
                }, {
                    duration: 2,
                    width: "calc(100% + 10px)",
                    height: "calc(100% + 10px)",
                    ease: "none"
                },
                ">"
            )

            tl4.from(page11, {
                yPercent: 150,
                duration: 1,
                ease: "none"
            });

            tl4.from(page12, {
                yPercent: 120,
                duration: 1,
                ease: "none"
            });

            tl4.fromTo(page13, {
                    duration: 2,
                    yPercent: 150,
                    ease: "none"
                }, {
                    duration: 2,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )


            //            // Team Slider
            const teamSwiper = new Swiper(".swiper.is-team", {
                // Optional parameters
                slidesPerView: "auto",
                keyboard: true,
                direction: "horizontal",
                loop: false,
                speed: 800,
                mousewheel: {
                    forceToAxis: true
                },
                touchEventsTarget: "container",
                freeMode: true
            });
            let myTimeout;
            teamSwiper.on("progress", function (e) {
                clearTimeout(myTimeout);
                $(".team-component-thumb").addClass("scaled");
                myTimeout = setTimeout(function () {
                    // $(".cursor_dot").removeClass("hide");
                    $(".team-component-thumb").removeClass("scaled");
                }, 100);
            });

            ////////////////////////////////////////////////////////////
            // POPUP CODE HERE
            // get the relative size & position values to apply to an image
            function getDifference(cardImg, popupImg) {
                let cardWidth = cardImg.innerWidth();
                let cardHeight = cardImg.innerHeight();
                let offsetLeft = cardImg.offset().left - popupImg.offset().left;
                let offsetTop = cardImg.offset().top - popupImg.offset().top;
                // return transformValue
                return [offsetLeft, offsetTop, cardWidth, cardHeight];
            }

            // OPEN POPUP
            $(".team_link").on("click", function (e) {
                e.preventDefault()
                console.log('red')
                //            $('html, body').css('overflow', 'hidden');
                // get images to animate to & from
                let myIndex = $(this).parent().index();
                let cardImg = $(this).find(".image");
                let popupImg = $(".popup_item").eq(myIndex).find(".image");

                // set initial display states
                $(".popup_item").removeClass("active");
                $(".popup_item").eq(myIndex).addClass("active");
                $(".popup").css("display", "block");
                cardImg.css("opacity", "0");
                //            $("body").addClass("no-scroll");
                $("body").addClass("popup-open");

                let transformValue = getDifference(cardImg, popupImg);

                // animations
                gsap.fromTo(
                    popupImg, {
                        x: transformValue[0],
                        y: transformValue[1],
                        width: transformValue[2],
                        height: transformValue[3]
                    }, {
                        x: 0,
                        y: 0,
                        width: "100%",
                        height: "100%",
                        duration: 0.6,
                        ease: "power2.inOut"
                    }
                );
                gsap.to(".popup_bg, .popup_close", {
                    opacity: 1,
                    duration: 0.3,
                    delay: 0.3,
                    ease: "power2.inOut"
                });
                gsap.to(".popup_content", {
                    opacity: 1,
                    duration: 0.3,
                    delay: 0.3,
                    ease: "power2.inOut"
                });
            });

            // CLOSE POPUP
            $(".popup_close").on("click", function (e) {
                e.preventDefault()
                // get images to animate to & from
                let myIndex = $(".popup_item.active").index();
                let popupImg = $(".popup_item.active .image");
                let cardImg = $(".team_link").eq(myIndex).find(".image");

                let transformValue = getDifference(cardImg, popupImg);
                $("body").removeClass("popup-open");

                function closePopup() {
                    //                $('html, body').css('overflow', 'visible');
                    cardImg.css("opacity", "1");
                    $(".popup").css("display", "none");
                    popupImg.removeAttr("style");
                    $("body").removeClass("no-scroll");
                }

                // animations
                gsap.fromTo(
                    popupImg, {
                        x: 0,
                        y: 0,
                        width: "100%",
                        height: "100%"
                    }, {
                        x: transformValue[0],
                        y: transformValue[1],
                        width: transformValue[2],
                        height: transformValue[3],
                        onComplete: closePopup,
                        duration: 0.6,
                        ease: "power3.inOut"
                    }
                );
                gsap.to(".popup_bg, .popup_content, .popup_close", {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power3.inOut"
                });
            });

            // set variables
            var items = $(".marquee_item");
            var wrap = $(".marquee_wrap");
            var totalItems = items.length / 2 + 1;
            var duration = totalItems * 3.2;

            // switch which item is active
            function makeItemActive1(myIndex) {
                $(".marquee_item").removeClass("active");
                $(".marquee_list").each(function (index) {
                    $(this).find(".marquee_item").eq(myIndex).addClass("active");
                });
                $(".marquee_text-item").removeClass("active");
                $(".marquee_text-item").eq(myIndex).addClass("active");
            }
            makeItemActive1(3);

            // check if item is in center of wrapper
            function checkPosition() {
                let wrapCenter = wrap.offset().top + wrap.height() / 2;
                $(".marquee_item").each(function (index) {
                    let itemHeight = $(this).height() / 2;
                    let offsetTop1 = $(this).offset().top + itemHeight;
                    if (offsetTop1 < wrapCenter + itemHeight / 2 && offsetTop1 > wrapCenter) {
                        let myIndex = $(this).index();
                        makeItemActive1(myIndex);
                    }
                });
            }

            // create vertical loop
            let marquee = gsap.timeline({
                repeat: -1
            }).fromTo(
                ".marquee_track", {
                    yPercent: 0
                }, {
                    yPercent: -50,
                    duration: duration,
                    ease: "none",
                    onUpdate: () => {
                        checkPosition();
                    }
                }
            );


            let typeSplit;
            //            // Split the text up
            function runSplit() {
                typeSplit = new SplitType(".split-lines", {
                    types: "lines, words"
                });
                $(".line").append("<div class='line-mask'></div>");
                createAnimation();
            }
            runSplit();


            // Update on window resize
            let windowWidth = $(window).innerWidth();
            window.addEventListener("resize", function () {
                if (windowWidth !== $(window).innerWidth()) {
                    windowWidth = $(window).innerWidth();
                    typeSplit.revert();
                    runSplit();

                }
            });

            function createAnimation() {
                $(".line").each(function (index) {
                    tl4.fromTo($(this).find(".line-mask"), {
                            width: "100%",
                        }, {
                            width: "0%",
                        },
                        ">"
                    )
                    /*tl4.fromTo($(this), {
                        yPercent: 0,
                        }, {
                        yPercent: -50,
                        },
                        "<"
                    )*/


                });
            }

            tl4.from(page14, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

            tl4.from(page15, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            //            $(".opaque-anim-three").each(function (index) {
            tl4.fromTo($('.opaque-anim-three'), {
                    opacity: 1,

                    duration: 2,
                }, {
                    opacity: 0,
                    duration: 2,
                },
                ">"
            )
            tl4.fromTo($('.opaque-anim-two'), {
                    opacity: 1,

                    duration: 2,
                }, {
                    opacity: 0,
                    duration: 2,
                },
                ">"
            )
            tl4.fromTo($('.tkween-ceo-content h4'), {
                    opacity: 1,

                    duration: 2,
                }, {
                    opacity: 0,
                    duration: 2,
                },
                ">"
            )


            tl4.from(page19, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

            tl4.from(page20, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            //                });



            //            
            $('.marquee').marquee({
                //speed in milliseconds of the marquee
                duration: 10000,
                //gap in pixels between the tickers
                gap: 50,
                //time in milliseconds before the marquee will start animating
                delayBeforeStart: 0,
                //'left' or 'right'
                direction: 'left',
                //true or false - should the marquee be duplicated to show an effect of continues flow
                duplicated: true
            });
            //          
            //            
            //            
            //            


            class Stage {
                constructor() {
                    this.renderParam = {
                        clearColor: 0x666666,
                        width: window.innerWidth,
                        height: window.innerHeight
                    };

                    this.cameraParam = {
                        left: -1,
                        right: 1,
                        top: 1,
                        bottom: 1,
                        near: 0,
                        far: -1
                    };

                    this.scene = null;
                    this.camera = null;
                    this.renderer = null;
                    this.geometry = null;
                    this.material = null;
                    this.mesh = null;

                    this.isInitialized = false;
                }

                init() {
                    this._setScene();
                    this._setRender();
                    this._setCamera();

                    this.isInitialized = true;
                }

                _setScene() {
                    this.scene = new THREE.Scene();
                }

                _setRender() {
                    this.renderer = new THREE.WebGLRenderer({
                        canvas: document.getElementById("webgl-canvas")
                    });
                    this.renderer.setPixelRatio(window.devicePixelRatio);
                    this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));
                    this.renderer.setSize(this.renderParam.width, this.renderParam.height);
                }

                _setCamera() {
                    if (!this.isInitialized) {
                        this.camera = new THREE.OrthographicCamera(
                            this.cameraParam.left,
                            this.cameraParam.right,
                            this.cameraParam.top,
                            this.cameraParam.bottom,
                            this.cameraParam.near,
                            this.cameraParam.far
                        );
                    }

                    const windowWidth = window.innerWidth - 100;
                    const windowHeight = window.innerHeight - 100;

                    this.camera.aspect = windowWidth / windowHeight;

                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(windowWidth, windowHeight);
                }

                _render() {
                    this.renderer.render(this.scene, this.camera);
                }

                onResize() {
                    this._setCamera();
                }

                onRaf() {
                    this._render();
                }
            }

            class Mesh {
                constructor(stage) {
                    this.canvas = document.getElementById("webgl-canvas");
                    this.canvasWidth = this.canvas.width;
                    this.canvasHeight = this.canvas.height;

                    this.uniforms = {
                        resolution: {
                            type: "v2",
                            value: [this.canvasWidth, this.canvasHeight]
                        },
                        time: {
                            type: "f",
                            value: 0.0
                        },
                        xScale: {
                            type: "f",
                            value: 1.0
                        },
                        yScale: {
                            type: "f",
                            value: 0.5
                        },
                        distortion: {
                            type: "f",
                            value: 0.050
                        }
                    };

                    this.stage = stage;

                    this.mesh = null;

                    this.xScale = 1.0;
                    this.yScale = 0.5;
                    this.distortion = 0.050;
                }

                init() {
                    this._setMesh();
                    // this._setGui();
                }

                _setMesh() {
                    const position = [
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, 1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, 1.0, 0.0,
       1.0, 1.0, 0.0
    ];

                    const positions = new THREE.BufferAttribute(new Float32Array(position), 3);

                    const geometry = new THREE.BufferGeometry();
                    geometry.setAttribute("position", positions);

                    const material = new THREE.RawShaderMaterial({
                        vertexShader: document.getElementById("js-vertex-shader").textContent,
                        fragmentShader: document.getElementById("js-fragment-shader").textContent,
                        uniforms: this.uniforms,
                        side: THREE.DoubleSide
                    });

                    this.mesh = new THREE.Mesh(geometry, material);

                    this.stage.scene.add(this.mesh);
                }

                _diffuse() {
                    // gsap.to(this.mesh.material.uniforms.xScale, {
                    //   value: 2,
                    //   duration: 0.1,
                    //   ease: 'power2.inOut',
                    //   repeat: -1,
                    //   yoyo: true
                    // });
                    // gsap.to(this.mesh.material.uniforms.yScale, {
                    //   value: 1,
                    //   duration: 0.1,
                    //   ease: 'power2.inOut',
                    //   repeat: -1,
                    //   yoyo: true
                    // });
                }

                _render() {
                    this.uniforms.time.value += 0.01;
                }

                _setGui() {
                    const parameter = {
                        xScale: this.xScale,
                        yScale: this.yScale,
                        distortion: this.distortion
                    }
                    const gui = new dat.GUI();
                    gui.add(parameter, "xScale", 0.00, 5.00, 0.01).onChange((value) => {
                        this.mesh.material.uniforms.xScale.value = value;
                    });
                    gui.add(parameter, "yScale", 0.00, 1.00, 0.01).onChange((value) => {
                        this.mesh.material.uniforms.yScale.value = value;
                    });
                    gui.add(parameter, "distortion", 0.001, 0.100, 0.001).onChange((value) => {
                        this.mesh.material.uniforms.distortion.value = value;
                    });
                }

                onRaf() {
                    this._render();
                }
            }

            (() => {
                const stage = new Stage();

                stage.init();

                const mesh = new Mesh(stage);

                mesh.init();

                window.addEventListener("resize", () => {
                    stage.onResize();
                });

                window.addEventListener("load", () => {
                    setTimeout(() => {
                        mesh._diffuse();
                    }, 1000);
                });

                const _raf = () => {
                    window.requestAnimationFrame(() => {
                        stage.onRaf();
                        mesh.onRaf();

                        _raf();
                    });
                };

                _raf();
            })();


        }
        if ($('.code-page').length && $(window).width() > 767) {
            gsap.registerPlugin(ScrollTrigger);

            let page2 = document.querySelector(".services-wrap");
            let page3 = document.querySelector(".tech-stack-wrap");
            let page4 = document.querySelector(".code-process-wrap");
            let page5 = document.querySelector(".code-with-us-wrap");
            let page6 = document.querySelector(".our-project-wrap");
            let page7 = document.querySelector(".faq-wrap");
            let page8 = document.querySelector(".newsletter-wrap");
            let page9 = document.querySelector(".main-footer-section");
            let page10 = document.querySelector(".services-item-wrap");
            
            let item1 = $(".services-item-wrap ul li").eq(0);
            let item2 = $(".services-item-wrap ul li").eq(1);
            let item3 = $(".services-item-wrap ul li").eq(2);

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 5),
                    onLeave: ()=> ScrollTrigger.clearScrollMemory()
                }
            });
            tl4.from(page2, {
                yPercent: 150,
                ease: "none"
            });
            tl4.from(page10, {
                xPercent: 150,
                ease: "none"
            });
            
            
           let stickyImg = ".services-item-thumb-wrap";

            $(".services-item-title").each(function (index) {
                let myImg = $(this).next(stickyImg);
                myImg.insertAfter($(this));
            });

            gsap.set($(stickyImg).first(), {
                height: "100vh"
            });

            $(stickyImg).not(":last-child").each(function (index) {
                tl4.to($(this), {
                    height: "0vh"
                });
                tl4.to($(this).nextAll(stickyImg).eq(0), {
                    height: "70vh"
                }, "<");
            });

            
            
            
       
            
            
            tl4.from(page3, {
                yPercent: 130,
                duration: 2,
                ease: "none"
            });
            
            
            tl4.from(page4, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page5, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page6, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page7, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page8, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page9, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            
            // set variables
            let items = $(".tech-stack-content-item");
            let textItem = $(".tech-stack-visual-item");
            let wrap = $(".tech-stack-content-wrap");
            let totalItems = items.length / 2 + 1;
            let duration = totalItems * 3.2;

            // switch which item is active
            function makeItemActive(myIndex) {
                items.removeClass("active");
                $(".tech-stack-content-list").each(function (index) {
                    $(this).find(".tech-stack-content-item").eq(myIndex).addClass("active");
                });
                textItem.removeClass("active");
                textItem.eq(myIndex).addClass("active");
            }
            makeItemActive(3);

            // check if item is in center of wrapper
            function checkPosition() {
                let wrapCenter = wrap.offset().top + wrap.height() / 2;
                items.each(function (index) {
                    let itemHeight = $(this).height() / 2;
                    let offsetTop = $(this).offset().top + itemHeight;
                    if (offsetTop < wrapCenter + itemHeight / 2 && offsetTop > wrapCenter) {
                        let myIndex = $(this).index();
                        makeItemActive(myIndex);
                    }
                });
            }

            // create vertical loop
            let marquee = gsap.timeline({
                repeat: -1
            }).fromTo(
                ".tech-stack-content", {
                    yPercent: 0
                }, {
                    yPercent: -50,
                    duration: duration,
                    ease: "none",
                    onUpdate: () => {
                        checkPosition();
                    }
                }
            );   
            
            
            
            
            
            let items1 = $(".work_item");
            let textItem1 = $(".box");
            let wrap1 = $(".code-container");
            let totalitems1 = items1.length / 2 + 1;
            let duration1 = totalitems1 * 3.2;

            // switch which item is active
            function makeItemActive1(myIndex) {
                items1.removeClass("active");
                $(".work_list").each(function (index) {
                    $(this).find(".work_item").eq(myIndex).addClass("active");
                });
                textItem1.removeClass("active");
                textItem1.eq(myIndex).addClass("active");
            }
            makeItemActive1(3);

            // check if item is in center of wrapper
            function checkPosition1() {
                let wrapCenter1 = wrap1.offset().top + wrap1.height() / 2;
                items1.each(function (index) {
                    let itemHeight1 = $(this).height() / 2;
                    let offsetTop1 = $(this).offset().top + itemHeight1;
                    if (offsetTop1 < wrapCenter1 + itemHeight1 / 2 && offsetTop1 > wrapCenter1) {
                        let myIndex1 = $(this).index();
                        makeItemActive1(myIndex1);
                    }
                });
            }

            // create vertical loop
            let marquee1 = gsap.timeline({
                repeat: -1
            }).fromTo(
                ".work_wrap", {
                    yPercent: 0
                }, {
                    yPercent: -50,
                    duration: duration1,
                    ease: "none",
                    onUpdate: () => {
                        checkPosition1();
                    }
                }
            );   
            
            
            class Stage {
                constructor() {
                    this.renderParam = {
                        clearColor: 0x666666,
                        width: window.innerWidth,
                        height: window.innerHeight
                    };

                    this.cameraParam = {
                        left: -1,
                        right: 1,
                        top: 1,
                        bottom: 1,
                        near: 0,
                        far: -1
                    };

                    this.scene = null;
                    this.camera = null;
                    this.renderer = null;
                    this.geometry = null;
                    this.material = null;
                    this.mesh = null;

                    this.isInitialized = false;
                }

                init() {
                    this._setScene();
                    this._setRender();
                    this._setCamera();

                    this.isInitialized = true;
                }

                _setScene() {
                    this.scene = new THREE.Scene();
                }

                _setRender() {
                    this.renderer = new THREE.WebGLRenderer({
                        canvas: document.getElementById("webgl-canvas")
                    });
                    this.renderer.setPixelRatio(window.devicePixelRatio);
                    this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));
                    this.renderer.setSize(this.renderParam.width, this.renderParam.height);
                }

                _setCamera() {
                    if (!this.isInitialized) {
                        this.camera = new THREE.OrthographicCamera(
                            this.cameraParam.left,
                            this.cameraParam.right,
                            this.cameraParam.top,
                            this.cameraParam.bottom,
                            this.cameraParam.near,
                            this.cameraParam.far
                        );
                    }

                    const windowWidth = window.innerWidth - 100;
                    const windowHeight = window.innerHeight - 100;

                    this.camera.aspect = windowWidth / windowHeight;

                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(windowWidth, windowHeight);
                }

                _render() {
                    this.renderer.render(this.scene, this.camera);
                }

                onResize() {
                    this._setCamera();
                }

                onRaf() {
                    this._render();
                }
            }

            class Mesh {
                constructor(stage) {
                    this.canvas = document.getElementById("webgl-canvas");
                    this.canvasWidth = this.canvas.width;
                    this.canvasHeight = this.canvas.height;

                    this.uniforms = {
                        resolution: {
                            type: "v2",
                            value: [this.canvasWidth, this.canvasHeight]
                        },
                        time: {
                            type: "f",
                            value: 0.0
                        },
                        xScale: {
                            type: "f",
                            value: 1.0
                        },
                        yScale: {
                            type: "f",
                            value: 0.5
                        },
                        distortion: {
                            type: "f",
                            value: 0.050
                        }
                    };

                    this.stage = stage;

                    this.mesh = null;

                    this.xScale = 1.0;
                    this.yScale = 0.5;
                    this.distortion = 0.050;
                }

                init() {
                    this._setMesh();
                    // this._setGui();
                }

                _setMesh() {
                    const position = [
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, 1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, 1.0, 0.0,
       1.0, 1.0, 0.0
    ];

                    const positions = new THREE.BufferAttribute(new Float32Array(position), 3);

                    const geometry = new THREE.BufferGeometry();
                    geometry.setAttribute("position", positions);

                    const material = new THREE.RawShaderMaterial({
                        vertexShader: document.getElementById("js-vertex-shader").textContent,
                        fragmentShader: document.getElementById("js-fragment-shader").textContent,
                        uniforms: this.uniforms,
                        side: THREE.DoubleSide
                    });

                    this.mesh = new THREE.Mesh(geometry, material);

                    this.stage.scene.add(this.mesh);
                }

                _diffuse() {
                    // gsap.to(this.mesh.material.uniforms.xScale, {
                    //   value: 2,
                    //   duration: 0.1,
                    //   ease: 'power2.inOut',
                    //   repeat: -1,
                    //   yoyo: true
                    // });
                    // gsap.to(this.mesh.material.uniforms.yScale, {
                    //   value: 1,
                    //   duration: 0.1,
                    //   ease: 'power2.inOut',
                    //   repeat: -1,
                    //   yoyo: true
                    // });
                }

                _render() {
                    this.uniforms.time.value += 0.01;
                }

                _setGui() {
                    const parameter = {
                        xScale: this.xScale,
                        yScale: this.yScale,
                        distortion: this.distortion
                    }
                    const gui = new dat.GUI();
                    gui.add(parameter, "xScale", 0.00, 5.00, 0.01).onChange((value) => {
                        this.mesh.material.uniforms.xScale.value = value;
                    });
                    gui.add(parameter, "yScale", 0.00, 1.00, 0.01).onChange((value) => {
                        this.mesh.material.uniforms.yScale.value = value;
                    });
                    gui.add(parameter, "distortion", 0.001, 0.100, 0.001).onChange((value) => {
                        this.mesh.material.uniforms.distortion.value = value;
                    });
                }

                onRaf() {
                    this._render();
                }
            }

            (() => {
                const stage = new Stage();

                stage.init();

                const mesh = new Mesh(stage);

                mesh.init();

                window.addEventListener("resize", () => {
                    stage.onResize();
                });

                window.addEventListener("load", () => {
                    setTimeout(() => {
                        mesh._diffuse();
                    }, 1000);
                });

                const _raf = () => {
                    window.requestAnimationFrame(() => {
                        stage.onRaf();
                        mesh.onRaf();

                        _raf();
                    });
                };

                _raf();
            })();
            
            
            
            
            
            
            
            
            
            
}
        

        // Mobile animation 
        if ($('.design-page').length && $(window).width() < 768) {
            gsap.registerPlugin(ScrollTrigger);

            let page2 = $(".design-approach-wrap");
            let page3 = $(".design-about.timeless");
            let page4 = $(".design-about.strategic");
            let page5 = $(".design-about.creative");
            let page6 = $(".services-wrap");
            let page7 = $(".services-item-wrap");
            let page8 = $(".design-project");
            let page9 = $(".design-newsletter");
            let page10 = $(".main-footer-section");
            let page11 = $(".services-item-wrap ul li").eq(0);
            let page12 = $(".services-item-wrap ul li").eq(1);
            let page13 = $(".services-item-wrap ul li").eq(2);
            let page14 = $(".services-item-wrap ul li").eq(3);
            /*let page3 = document.querySelector(".page3");*/

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 9),
                    onLeave: ()=> ScrollTrigger.clearScrollMemory()
                }
            });

            tl4.from(page2, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page3, {
                yPercent: 81.5,
                ease: "none"
            });
            tl4.from(page4, {
                yPercent: 87.5,
                ease: "none"
            });
            tl4.from(page5, {
                yPercent: 93.7,
                ease: "none"
            });
            tl4.from(page6, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page7, {
                yPercent: 100,
                ease: "none"
            });

            
            tl4.fromTo(page11, {
                    duration: 1,
                    yPercent: 89.3,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )
            
            tl4.fromTo(page12, {
                    duration: 1,
                    yPercent: 98.8,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 9.7,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page13, {
                    duration: 1,
                    yPercent: 108.4,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 19.5,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page14, {
                    duration: 1,
                    yPercent: 118,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 29.3,
                    ease: "none"
                },
                ">"
            )
            


            tl4.from(page8, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page9, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page10, {
                yPercent: 100,
                ease: "none"
            });


            var offY = $(".design-approach-wrap").offset().top;
            console.log(offY)
            $(window).on('scroll', function () {
                var scrollY = $(this).scrollTop();
                console.log(scrollY)
                if (scrollY > 150) {
                    $('.design-about').addClass('animate-start')
                } else {
                    $('.design-about').removeClass('animate-start')
                }


            })

            $(window).on('load resize', function () {
                $('.design-newsletter, .main-footer-section').each(function (i) {
                    var $this = $(this);
                    var windowHeight = $(window).outerHeight()
                    var mainTop = $this.outerHeight() - windowHeight;
                    if ($this.outerHeight() > (windowHeight)) {
                        $this.css('top', -(mainTop))
                    } else {
                        $this.css('top', 0)
                    }
                })
            })

        }
        if ($('.brand-page').length && $(window).width() < 768) {
            gsap.registerPlugin(ScrollTrigger);

            let page2 = document.querySelector(".overlay-scroll-one");
            let page3 = document.querySelector(".overlay-scroll-three");
            let page4 = document.querySelector(".branding-services-wrap");
            let page5 = document.querySelector(".design-project");
            let page6 = document.querySelector(".design-newsletter");
            let page7 = document.querySelector(".main-footer-section");
            /*let page3 = document.querySelector(".page3");*/

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 5),
                    onLeave: ()=> ScrollTrigger.clearScrollMemory()
                }
            });

            tl4.from(page2, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page3, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page4, {
                yPercent: 100,
                ease: "none"
            });


            // varaibles and defaults
            let workItems = $(".work_item");
            gsap.defaults({
                ease: "none"
            });

            // moving tab content
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".work_wrapper",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });
            workItems.each(function (index) {
                tl4.fromTo(
                    $(this), {
                        height: "100vh",
                    }, {
                        height: "46px",
                        duration: 0.5,
                        onComplete: () => {
                            let myIndex = index - 2;
                            if (myIndex > -1 && myIndex < workItems.length - 4) {
                                gsap.to(workItems.eq(myIndex), {
                                    height: "0px",
                                    duration: 0.5
                                });
                            }
                        },
                        onReverseComplete: () => {
                            let myIndex = index - 3;
                            if (myIndex > -1) {
                                gsap.to(workItems.eq(myIndex), {
                                    height: "46px",
                                    duration: 0.5
                                });
                            }
                        }
                    }

                );
            });


            tl4.from(page5, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page6, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page7, {
                yPercent: 100,
                ease: "none"
            });

            $('[hover-block="component"]').each(function () {
                let block = $(this);
                let blockContent = block.find(".block-content");
                let blockImg = block.find('[hover-block="img"]');
                let imgColorPrimary = block.attr("hover-block-logo-color");
                let imgColorHover = block.attr("hover-block-logo-color-hover");
                let hoverColor = block.attr("hover-block-hover-color");

                blockImg.css("color", imgColorPrimary);

                blockContent.clone().attr("hover-block", "duplicate").appendTo(block);

                let duplicateBlock = block.find('[hover-block="duplicate"]');
                duplicateBlock.css("background-color", hoverColor);
                duplicateBlock.find('[hover-block="img"]').css("color", imgColorHover);

                let hoverAnimation = gsap.timeline({
                    paused: true
                });

                gsap.set(duplicateBlock, {
                    clipPath: `circle(0% at 50% 50%)`
                });

                $(block).on("mouseenter", function (event) {
                    // find coordinates of mouse
                    let bounds = event.target.getBoundingClientRect();
                    let x = event.clientX - bounds.left;
                    let y = event.clientY - bounds.top;
                    let blockWidth = block.width();
                    let blockHeight = block.height();

                    let hoverX = (x / blockWidth) * 100 + "%";
                    let hoverY = (y / blockHeight) * 100 + "%";

                    hoverAnimation.fromTo(
                        duplicateBlock, {
                            clipPath: `circle(0% at ${hoverX} ${hoverY})`
                        }, {
                            clipPath: `circle(141.7% at ${hoverX} ${hoverY})`,
                            duration: 1,
                            ease: "power4.out"
                        }
                    );

                    hoverAnimation.play();
                });

                $(block).on("mouseleave", function (event) {
                    // find coordinates of mouse
                    let bounds = event.target.getBoundingClientRect();
                    let x = event.clientX - bounds.left;
                    let y = event.clientY - bounds.top;
                    let blockWidth = block.width();
                    let blockHeight = block.height();

                    let hoverX = (x / blockWidth) * 100 + "%";
                    let hoverY = (y / blockHeight) * 100 + "%";

                    hoverAnimation.fromTo(
                        duplicateBlock, {
                            clipPath: `circle(141.7% at ${hoverX} ${hoverY})`
                        }, {
                            clipPath: `circle(0% at ${hoverX} ${hoverY})`,
                            duration: 0.6,
                            ease: "expo.out"
                        }
                    );

                    hoverAnimation.play();
                });
            });

            $(window).on('load resize', function () {
                $('.top-end').each(function (i) {
                    var $this = $(this);
                    var windowHeight = $(window).outerHeight()
                    var mainTop = $this.outerHeight() - windowHeight;
                    if ($this.outerHeight() > windowHeight) {
                        $this.css('top', -mainTop)
                    } else {
                        $this.css('top', 0)
                    }
                })
            })
        }
        if ($(window).width() < 992 && $('.panel').length) {
            $(window).on('load', function () {
                var windowHeight = $(window).outerHeight();
                $('.show-reel-anim-main.panel').css('min-height', (windowHeight * 2))
            })


            let page3 = document.querySelector(".show-reel-anim-main");
            let page4 = document.querySelector(".show-reel-anim-text");
            let page5 = document.querySelector(".show-reel-anim-video");
            var windowHeight = $(window).outerHeight()   * 2;
            $('.show-reel-anim-wrap').css({
                'min-height': windowHeight
            })
            let tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".show-reel-anim-wrap",
                    scrub: 1,
                    start: 'top top',
                    end: windowHeight,
                    onLeave: ()=> ScrollTrigger.clearScrollMemory()
                }
            });

            tl4.fromTo(page3, {
                    duration: 1,
                    yPercent: 65,
                    ease: "none"
                }, {
                    duration: 2,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )


            tl4.fromTo(page4, {
                    duration: 2,
                    width: '100%',
                    ease: "none"
                }, {
                    duration: 2,
                    width: "75%",
                    ease: "none"
                },
                "<"
            )

            tl4.fromTo(page5, {
                    duration: 2,
                    width: '294px',
                    height: '497px',
                    ease: "none"
                }, {
                    duration: 2,
                    width: "100%",
                    height: "50%",
                    ease: "none"
                },
                ">"
            )

            tl4.fromTo(page4, {
                    duration: 2,
                    width: '75%',
                    ease: "none"
                }, {
                    duration: 2,
                    width: "35%",
                    ease: "none"
                },
                "<"
            )
            
            
            var $animation_elements1 = $('.inview-anim');
            var $window1 = $(window);

            function check_if_in_view1() {
                
                var window_height1 = $window1.height() / 1.05;
                var window_top_position1 = $window1.scrollTop();
                var window_bottom_position1 = (window_top_position1 + window_height1);
                $.each($animation_elements1, function () {
                    var $element1 = $(this);
                    var element_height1 = $element1.outerHeight();
                    var element_top_position1 = $element1.offset().top;
                    var element_bottom_position1 = (element_top_position1 + element_height1);
                    if (element_top_position1 <= window_bottom_position1) {
                        $element1.addClass('inview')
                    } else {
                        $element1.removeClass('inview')
                    }
                });
            }
            $window1.on('scroll resize', check_if_in_view1);
            $window1.trigger('scroll');
            
            
            
            
            
            
            

            let typeSplit;
            // Split the text up
            function runSplit() {
                typeSplit = new SplitType(".split-lines", {
                    types: "lines, words"
                });
                $(".line").append("<div class='line-mask'></div>");
            }
            runSplit();
            // Update on window resize
            let windowWidth = $(window).innerWidth();
            window.addEventListener("resize", function () {
                if (windowWidth !== $(window).innerWidth()) {
                    windowWidth = $(window).innerWidth();
                    typeSplit.revert();
                    runSplit();
                }
            });


            var $animation_elements = $('.line-mask');
            var $window = $(window);

            function check_if_in_view() {
                if ($(window).width() < 992) {
                    var window_height = $window.height() / 1.5;
                }
                if ($(window).width() < 768) {
                    var window_height = $window.height() / 1.3;
                }
                var window_top_position = $window.scrollTop();
                var window_bottom_position = (window_top_position + window_height);
                $.each($animation_elements, function () {
                    var $element = $(this);
                    var element_height = $element.outerHeight();
                    var element_top_position = $element.offset().top;
                    var element_bottom_position = (element_top_position + element_height);
                    if (element_top_position <= window_bottom_position) {
                        $element.width(0);
                    } else {
                        $element.width('100%')
                    }
                });
            }
            $window.on('scroll resize', check_if_in_view);
            $window.trigger('scroll');

            $(window).on('load resize', function () {
                $('.panel').each(function (i) {
                    var $this = $(this);
                    var windowHeight = $(window).outerHeight()
                    var mainTop = $this.outerHeight() - windowHeight;
                    if ($this.outerHeight() > windowHeight) {
                        $this.css('top', -mainTop)
                    } else {
                        $this.css('top', 0)
                    }
                })
            })
        }
        if ($('.hardware-page').length && $(window).width() < 768) {
            gsap.registerPlugin(ScrollTrigger);

            let page2 = document.querySelector(".hardware-services");
            let page3 = document.querySelector(".services-item-wrap");
            let page4 = document.querySelector(".services-item-wrap-inner");
            let page5 = document.querySelector(".startups-wrap");
            let page11 = document.querySelector(".develop-wrap");
            let page12 = document.querySelector(".hardware-showreel-thumb");
            let page13 = document.querySelector(".hardware-showreel-image");
            let page14 = document.querySelector(".userfeedback-wrap");
            let page15 = document.querySelector(".design-newsletter");
            let page16 = document.querySelector(".main-footer-section");

            let page6 = $(".startups-item").eq(0);
            let page7 = $(".startups-item").eq(1);
            let page8 = $(".startups-item").eq(2);
            let page9 = $(".startups-item").eq(3);
            let page10 = $(".startups-item").eq(4);
            /*let page3 = document.querySelector(".page3");*/

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 12),
                    onLeave: ()=> ScrollTrigger.clearScrollMemory()
                }
            });
            tl4.from(page2, {
                yPercent: 100,
                ease: "none"
            });
            tl4.from(page3, {
                yPercent: 92,
                ease: "none"
            });

            let page17 = $('.services-item-wrap ul li').eq(0);
            let page18 = $('.services-item-wrap ul li').eq(1);
            let page19 = $('.services-item-wrap ul li').eq(2);
            let page20 = $('.services-item-wrap ul li').eq(3);
            let page21 = $('.services-item-wrap ul li').eq(4);
            let page22 = $('.services-item-wrap ul li').eq(5);
            let page23 = $('.services-item-wrap ul li').eq(6);


            tl4.fromTo(page17, {
                    duration: 1,
                    yPercent: 42,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: -0.5,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page18, {
                    duration: 1,
                    yPercent: 48,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 5.5,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page19, {
                    duration: 1,
                    yPercent: 54,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 11.5,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page20, {
                    duration: 1,
                    yPercent: 60,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 17.5,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page21, {
                    duration: 1,
                    yPercent: 66,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 23.5,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page22, {
                    duration: 1,
                    yPercent: 72,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 29.5,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page23, {
                    duration: 1,
                    yPercent: 78,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 35.5,
                    ease: "none"
                },
                ">"
            )

            gsap.set(".services-item-wrap ul li", {
                zIndex: (i) => i
            });


            tl4.from(page5, {
                xPercent: 100,
                ease: "none"
            });

            tl4.fromTo(page6, {
                    duration: 1,
                    yPercent: 55.8,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )

            tl4.fromTo(page7, {
                    duration: 1,
                    yPercent: 63.3,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 17,
                    ease: "none"
                },
                ">"
            )

            tl4.fromTo(page8, {
                    duration: 1,
                    yPercent: 70.5,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 34,
                    ease: "none"
                },
                ">"
            )

            tl4.fromTo(page9, {
                    duration: 1,
                    yPercent: 77.7,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 51,
                    ease: "none"
                },
                ">"
            )

            tl4.fromTo(page10, {
                    duration: 1,
                    yPercent: 85,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 68,
                    ease: "none"
                },
                ">"
            )

            // varaibles and defaults
            let workItems = $(".startups-item");
            gsap.defaults({
                ease: "none"
            });
            gsap.set(".startups-item", {
                zIndex: (i, target, targets) => targets.length + i
            });
            tl4.fromTo(page11, {
                    duration: 1,
                    yPercent: 100,
                    ease: "none"
                }, {
                    duration: 1,
                    yPercent: -10,
                    ease: "none"
                },
                ">"
            )
            tl4.from('.hardware-showreel', {
                xPercent: 130,
                duration: 1,
                ease: "none"
            });
            tl4.fromTo(page12, {
                    duration: 1,
                    yPercent: 35,
                    ease: "none"
                }, {
                    duration: 1,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page13, {
                    duration: 1,
                    width: '294px',
                    height: '470px',
                    ease: "none"
                }, {
                    duration: 1,
                    width: '100%',
                    height: 'calc(100% - 160px)',
                    ease: "none"
                },
                ">"
            )

            tl4.fromTo(page14, {
                    duration: 1,
                    yPercent: 125,
                    ease: "none",
                    zIndex: 9,
                }, {
                    duration: 1,
                    yPercent: 0,
                    ease: "none",
                    zIndex: 9,
                },
                ">"
            )

            tl4.fromTo(page15, {
                    duration: 1,
                    yPercent: 125,
                    ease: "none",
                    zIndex: 9,
                }, {
                    duration: 1,
                    yPercent: 0,
                    ease: "none",
                    zIndex: 9,
                },
                ">"
            )

            tl4.from(page16, {
                yPercent: 100,
                duration: 1,
                ease: "none",
                zIndex: 10
            });


            $('.develop-accordion-title').eq(0).addClass('accordion-active')
            $('.develop-accordion-content-wrap').eq(0).addClass('accordion-active')
            $(".develop-accordion-title").on("click touch", function () {
                console.log('red')
                $('.develop-accordion-title').removeClass("accordion-active")
                $('.develop-accordion-content-wrap').removeClass('accordion-active')
                $(this).addClass("accordion-active")
                $(this).next().addClass('accordion-active')
            })

            $(window).on('load resize', function () {
                $('.design-newsletter, .main-footer-section,  .userfeedback-wrap').each(function (i) {
                    var $this = $(this);
                    var windowHeight = $(window).outerHeight()
                    var mainTop = $this.outerHeight() - windowHeight;
                    if ($this.outerHeight() > (windowHeight)) {
                        $this.css('top', -(mainTop + 50))
                    } else {
                        $this.css('top', 0)
                    }
                })
            })

        }
        if ($('.about-page').length && $(window).width() < 768) {
            gsap.registerPlugin(ScrollTrigger);

            let page2 = document.querySelector(".about-content-wrap");
            let page3 = document.querySelector(".about-reel-wrap");
            let page4 = document.querySelector(".about-reel-thumb");
            let page5 = document.querySelector(".about-reel-thumb-inner");
            let page6 = document.querySelector(".circle-section");
            let page7 = document.querySelector(".branding-light-wrap");
            let page8 = document.querySelector(".about-show-reel-anim");
            let page9 = document.querySelector(".about-scroll-anim-wrap");
            let page10 = document.querySelector(".about-scroll-anim-inner");
            let page11 = document.querySelector(".team-wrap");
            let page12 = document.querySelector(".tkween-values-wrap");
            let page13 = document.querySelector(".our-mission-wrap");
            let page14 = document.querySelector(".about-marquee-section");
            let page15 = document.querySelector(".tkween-ceo-wrap");
            let page16 = document.querySelector(".opaque-anim-three");
            let page17 = document.querySelector(".opaque-anim-two");
            let page18 = document.querySelector(".tkween-ceo-content h4");
            let page19 = document.querySelector(".newsletter-wrap");
            let page20 = document.querySelector(".main-footer-section");
            
            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 15),
                    onLeave: ()=> ScrollTrigger.clearScrollMemory()
                }
            });
            tl4.from(page2, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page3, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
           

            tl4.from(page6, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

            // set variables
            let circleParent = $(".circle");
            let circleItem = $(".circle_item");
            let itemLength = circleItem.length;
            // 360 divided by number of items
            let rotateAmount = 360 / itemLength;
            let previousIndex = 0;
            let currentRotation = 0;

            function makeItemActive(item) {
                let itemIndex = item.index();
                let difference = itemIndex - previousIndex;
                let clockwiseRotation = (difference + itemLength) % itemLength;
                let counterclockwiseRotation = (itemLength - difference) % itemLength;
                let isClockwise = clockwiseRotation <= counterclockwiseRotation;
                let amount = (isClockwise ? clockwiseRotation : -counterclockwiseRotation) * rotateAmount;
                let total = currentRotation + amount;

                circleItem.removeClass("current");
                item.addClass("current");
                circleParent.css("transform", `rotate(${total * -1}deg)`);

                previousIndex = itemIndex;
                currentRotation = total;
            }
            makeItemActive(circleItem.first());

            // Set each item's rotation
            circleItem.each(function (index) {
                let thisItem = $(this);
                let childLink = $(this).find(".circle_link");
                let itemRotation = rotateAmount * index;
                $(this).css("transform", `rotate(${itemRotation}deg)`);

                // slide parent circle to rotation of the clicked link
                childLink.on("click", function (e) {
                    e.preventDefault();
                    console.log('red')
                    makeItemActive(thisItem);
                });
            });

            // reveal circle after item rotations are set
            circleParent.css("opacity", "1.0");


            tl4.from(page7, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page8, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

            tl4.fromTo(page9, {
                    duration: 1,
                    yPercent: 65,
                    ease: "none"
                }, {
                    duration: 2,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page10, {
                    duration: 2,
                    width: '294px',
                    height: '470px',
                    ease: "none"
                }, {
                    duration: 2,
                    width: "100%",
                    height: "100%",
                    ease: "none"
                },
                ">"
            )

            tl4.from(page11, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

            tl4.from(page12, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

            tl4.fromTo(page13, {
                    duration: 2,
                    yPercent: 100,
                    ease: "none"
                }, {
                    duration: 2,
                    yPercent: 0,
                    ease: "none"
                },
                ">"
            )


            //            // Team Slider
            const teamSwiper = new Swiper(".swiper.is-team", {
                // Optional parameters
                slidesPerView: "auto",
                keyboard: true,
                direction: "horizontal",
                loop: false,
                speed: 800,
                mousewheel: {
                    forceToAxis: true
                },
                touchEventsTarget: "container",
                freeMode: true
            });
            let myTimeout;
            teamSwiper.on("progress", function (e) {
                clearTimeout(myTimeout);
                $(".team-component-thumb").addClass("scaled");
                myTimeout = setTimeout(function () {
                    // $(".cursor_dot").removeClass("hide");
                    $(".team-component-thumb").removeClass("scaled");
                }, 100);
            });

            ////////////////////////////////////////////////////////////
            // POPUP CODE HERE
            // get the relative size & position values to apply to an image
            function getDifference(cardImg, popupImg) {
                let cardWidth = cardImg.innerWidth();
                let cardHeight = cardImg.innerHeight();
                let offsetLeft = cardImg.offset().left - popupImg.offset().left;
                let offsetTop = cardImg.offset().top - popupImg.offset().top;
                // return transformValue
                return [offsetLeft, offsetTop, cardWidth, cardHeight];
            }

            // OPEN POPUP
            $(".team_link").on("click", function (e) {
                e.preventDefault()
                console.log('red')
                //            $('html, body').css('overflow', 'hidden');
                // get images to animate to & from
                let myIndex = $(this).parent().index();
                let cardImg = $(this).find(".image");
                let popupImg = $(".popup_item").eq(myIndex).find(".image");

                // set initial display states
                $(".popup_item").removeClass("active");
                $(".popup_item").eq(myIndex).addClass("active");
                $(".popup").css("display", "block");
                cardImg.css("opacity", "0");
                //            $("body").addClass("no-scroll");
                $("body").addClass("popup-open");

                let transformValue = getDifference(cardImg, popupImg);

                // animations
                gsap.fromTo(
                    popupImg, {
                        x: transformValue[0],
                        y: transformValue[1],
                        width: transformValue[2],
                        height: transformValue[3]
                    }, {
                        x: 0,
                        y: 0,
                        width: "100%",
                        height: "100%",
                        duration: 0.6,
                        ease: "power2.inOut"
                    }
                );
                gsap.to(".popup_bg, .popup_close", {
                    opacity: 1,
                    duration: 0.3,
                    delay: 0.3,
                    ease: "power2.inOut"
                });
                gsap.to(".popup_content", {
                    opacity: 1,
                    duration: 0.3,
                    delay: 0.3,
                    ease: "power2.inOut"
                });
            });

            // CLOSE POPUP
            $(".popup_close").on("click", function (e) {
                e.preventDefault()
                // get images to animate to & from
                let myIndex = $(".popup_item.active").index();
                let popupImg = $(".popup_item.active .image");
                let cardImg = $(".team_link").eq(myIndex).find(".image");

                let transformValue = getDifference(cardImg, popupImg);
                $("body").removeClass("popup-open");

                function closePopup() {
                    //                $('html, body').css('overflow', 'visible');
                    cardImg.css("opacity", "1");
                    $(".popup").css("display", "none");
                    popupImg.removeAttr("style");
                    $("body").removeClass("no-scroll");
                }

                // animations
                gsap.fromTo(
                    popupImg, {
                        x: 0,
                        y: 0,
                        width: "100%",
                        height: "100%"
                    }, {
                        x: transformValue[0],
                        y: transformValue[1],
                        width: transformValue[2],
                        height: transformValue[3],
                        onComplete: closePopup,
                        duration: 0.6,
                        ease: "power3.inOut"
                    }
                );
                gsap.to(".popup_bg, .popup_content, .popup_close", {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power3.inOut"
                });
            });

            // set variables
            var items = $(".marquee_item");
            var wrap = $(".marquee_wrap");
            var totalItems = items.length / 2 + 1;
            var duration = totalItems * 3.2;

            // switch which item is active
            function makeItemActive1(myIndex) {
                $(".marquee_item").removeClass("active");
                $(".marquee_list").each(function (index) {
                    $(this).find(".marquee_item").eq(myIndex).addClass("active");
                });
                $(".marquee_text-item").removeClass("active");
                $(".marquee_text-item").eq(myIndex).addClass("active");
            }
            makeItemActive1(3);

            // check if item is in center of wrapper
            function checkPosition() {
                let wrapCenter = wrap.offset().top + wrap.height() / 2;
                $(".marquee_item").each(function (index) {
                    let itemHeight = $(this).height() / 2;
                    let offsetTop1 = $(this).offset().top + itemHeight;
                    if (offsetTop1 < wrapCenter + itemHeight / 2 && offsetTop1 > wrapCenter) {
                        let myIndex = $(this).index();
                        makeItemActive1(myIndex);
                    }
                });
            }

            // create vertical loop
            let marquee = gsap.timeline({
                repeat: -1
            }).fromTo(
                ".marquee_track", {
                    yPercent: 0
                }, {
                    yPercent: -50,
                    duration: duration,
                    ease: "none",
                    onUpdate: () => {
                        checkPosition();
                    }
                }
            );


            let typeSplit;
            function runSplit() {
                typeSplit = new SplitType(".split-lines", {
                    types: "lines, words"
                });
                $(".line").append("<div class='line-mask'></div>");
                createAnimation();
            }
            runSplit();


            // Update on window resize
            let windowWidth = $(window).innerWidth();
            window.addEventListener("resize", function () {
                if (windowWidth !== $(window).innerWidth()) {
                    windowWidth = $(window).innerWidth();
                    typeSplit.revert();
                    runSplit();

                }
            });

            function createAnimation() {
                $(".line").each(function (index) {
                    tl4.fromTo($(this).find(".line-mask"), {
                            width: "100%",
                        }, {
                            width: "0%",
                        },
                        ">"
                    )
                    /*tl4.fromTo($(this), {
                        yPercent: 0,
                        }, {
                        yPercent: -50,
                        },
                        "<"
                    )*/


                });
            }

            tl4.from(page14, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

            tl4.from(page15, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            
            tl4.fromTo($('.opaque-anim-three'), {
                    opacity: 1,

                    duration: 2,
                }, {
                    opacity: 0,
                    duration: 2,
                },
                ">"
            )
            tl4.fromTo($('.opaque-anim-two'), {
                    opacity: 1,

                    duration: 2,
                }, {
                    opacity: 0,
                    duration: 2,
                },
                ">"
            )
            tl4.fromTo($('.tkween-ceo-content h4'), {
                    opacity: 1,

                    duration: 2,
                }, {
                    opacity: 0,
                    duration: 2,
                },
                ">"
            )

            tl4.from(page19, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

            tl4.from(page20, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });

           
            $('.marquee').marquee({
                //speed in milliseconds of the marquee
                duration: 10000,
                //gap in pixels between the tickers
                gap: 50,
                //time in milliseconds before the marquee will start animating
                delayBeforeStart: 0,
                //'left' or 'right'
                direction: 'left',
                //true or false - should the marquee be duplicated to show an effect of continues flow
                duplicated: true
            });
                    

            $(window).on('load resize', function () {
                $('.rlt-wrap').not('.rlt-wrap .rlt-wrap').each(function (i) {
                    var $this = $(this);
                    var windowHeight = $(window).outerHeight()
                    var mainTop = $this.outerHeight() - windowHeight;
                    if ($this.outerHeight() > (windowHeight)) {
                        $this.css('top', -(mainTop + 50))
                    } else {
                        $this.css('top', 63)
                    }
                })
            })


        }
        if ($('.code-page').length && $(window).width() < 768) {
            gsap.registerPlugin(ScrollTrigger);

            let page2 = document.querySelector(".services-wrap");
            let page3 = document.querySelector(".tech-stack-wrap");
            let page4 = document.querySelector(".code-process-wrap");
            let page5 = document.querySelector(".code-with-us-wrap");
            let page6 = document.querySelector(".our-project-wrap");
            let page7 = document.querySelector(".faq-wrap");
            let page8 = document.querySelector(".newsletter-wrap");
            let page9 = document.querySelector(".main-footer-section");
            let page10 = document.querySelector(".services-item-wrap");
            
            let item1 = $(".services-item-wrap ul li").eq(0);
            let item2 = $(".services-item-wrap ul li").eq(1);
            let item3 = $(".services-item-wrap ul li").eq(2);

            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pinThis",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * 10),
                    onLeave: ()=> ScrollTrigger.clearScrollMemory()
                }
            });
            tl4.from(page2, {
                yPercent: 100,
                ease: "none"
            });
            tl4.fromTo(page10, {
                    duration: 1,
                    yPercent: 40,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: -0.5,
                    ease: "none"
                },
                ">"
            )
            
            
            let page17 = $('.services-item-wrap ul li').eq(0);
            let page18 = $('.services-item-wrap ul li').eq(1);
            let page19 = $('.services-item-wrap ul li').eq(2);


            tl4.fromTo(page17, {
                    duration: 1,
                    yPercent: 90,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: -0.5,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page18, {
                    duration: 1,
                    yPercent: 100,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 9.3,
                    ease: "none"
                },
                ">"
            )
            tl4.fromTo(page19, {
                    duration: 1,
                    yPercent: 110,
                    ease: "none",
                }, {
                    duration: 1,
                    yPercent: 19.3,
                    ease: "none"
                },
                ">"
            )

            gsap.set(".services-item-wrap ul li", {
                zIndex: (i) => i
            });


            
       
            
            
            tl4.from(page3, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            
            
            tl4.from(page4, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page5, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page6, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page7, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page8, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            tl4.from(page9, {
                yPercent: 110,
                duration: 2,
                ease: "none"
            });
            
            // set variables
            let items = $(".tech-stack-content-item");
            let textItem = $(".tech-stack-visual-item");
            let wrap = $(".tech-stack-content-wrap");
            let totalItems = items.length / 2 + 1;
            let duration = totalItems * 3.2;

            // switch which item is active
            function makeItemActive(myIndex) {
                items.removeClass("active");
                $(".tech-stack-content-list").each(function (index) {
                    $(this).find(".tech-stack-content-item").eq(myIndex).addClass("active");
                });
                textItem.removeClass("active");
                textItem.eq(myIndex).addClass("active");
            }
            makeItemActive(3);

            // check if item is in center of wrapper
            function checkPosition() {
                let wrapCenter = wrap.offset().top + wrap.height() / 2;
                items.each(function (index) {
                    let itemHeight = $(this).height() / 2;
                    let offsetTop = $(this).offset().top + itemHeight;
                    if (offsetTop < wrapCenter + itemHeight / 2 && offsetTop > wrapCenter) {
                        let myIndex = $(this).index();
                        makeItemActive(myIndex);
                    }
                });
            }

            // create vertical loop
            let marquee = gsap.timeline({
                repeat: -1
            }).fromTo(
                ".tech-stack-content", {
                    yPercent: 0
                }, {
                    yPercent: -50,
                    duration: duration,
                    ease: "none",
                    onUpdate: () => {
                        checkPosition();
                    }
                }
            );   
            
            
            
            
            
            let items1 = $(".work_item");
            let textItem1 = $(".box");
            let wrap1 = $(".code-container");
            let totalitems1 = items1.length / 2 + 1;
            let duration1 = totalitems1 * 3.2;

            // switch which item is active
            function makeItemActive1(myIndex) {
                items1.removeClass("active");
                $(".work_list").each(function (index) {
                    $(this).find(".work_item").eq(myIndex).addClass("active");
                });
                textItem1.removeClass("active");
                textItem1.eq(myIndex).addClass("active");
            }
            makeItemActive1(3);

            // check if item is in center of wrapper
            function checkPosition1() {
                let wrapCenter1 = wrap1.offset().top + wrap1.height() / 2;
                items1.each(function (index) {
                    let itemHeight1 = $(this).height() / 2;
                    let offsetTop1 = $(this).offset().top + itemHeight1;
                    if (offsetTop1 < wrapCenter1 + itemHeight1 / 2 && offsetTop1 > wrapCenter1) {
                        let myIndex1 = $(this).index();
                        makeItemActive1(myIndex1);
                    }
                });
            }

            // create vertical loop
            let marquee1 = gsap.timeline({
                repeat: -1
            }).fromTo(
                ".work_wrap", {
                    yPercent: 0
                }, {
                    yPercent: -50,
                    duration: duration1,
                    ease: "none",
                    onUpdate: () => {
                        checkPosition1();
                    }
                }
            );   
            
            
             $(window).on('load resize', function () {
                $('.rlt-wrap').not('.rlt-wrap .rlt-wrap').each(function (i) {
                    var $this = $(this);
                    var windowHeight = $(window).outerHeight()
                    var mainTop = $this.outerHeight() - windowHeight;
                    if ($this.outerHeight() > (windowHeight)) {
                        $this.css('top', -(mainTop + 50))
                    } else {
                        $this.css('top', 63)
                    }
                })
            })
            
}

        $(".faq-item").each(function () {
            var $this = $(this);
            $this.find(".faq-item-title").on("click touch", function () {
                $(".faq-item").removeClass("active")
                $(".faq-item-content").slideUp();
                if ($this.find(".faq-item-content:visible").length) {
                    $(".faq-item").removeClass("active")
                    $(".faq-item-content").slideUp();
                } else {
                    $this.addClass("active")
                    $(".faq-item-content").slideUp();
                    $this.find(".faq-item-content").slideDown();
                }
            })
        });
    }) // End ready function.


})(jQuery)