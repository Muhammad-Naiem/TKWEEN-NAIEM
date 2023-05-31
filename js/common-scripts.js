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
        if ($('.loading-screen').length) {

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
                    var el = $('.hero-wrap h2 .word-char');
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
                    var el = $('.hero-wrap p.word-char');
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
        })



        if ($(window).width() > 991) {


            $('.home-content-wrap').removeClass('panel')


            gsap.registerPlugin(ScrollTrigger);

            const locoScroll = new LocomotiveScroll({
                el: document.querySelector(".smooth-scroll"),
                inertia: 0.8,
                smooth: true,
                getDirection: true,
                mobile: {
                    smooth: false,
                    getDirection: true,
                },
                tablet: {
                    smooth: true,
                    getDirection: true,
                },
            });

            // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
            locoScroll.on("scroll", ScrollTrigger.update);

            // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
            ScrollTrigger.scrollerProxy(".smooth-scroll", {
                scrollTop(value) {
                    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
                }, // we don't have to define a scrollLeft because we're only scrolling vertically.
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                },
                // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
                pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
            });

            ScrollTrigger.create({
                trigger: '.hero-wrap',
                start: "top top",
                pin: true,
                pinSpacing: false,
                scroller: '.smooth-scroll'
            })

            const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".show-reel-anim-wrap",
                        scrub: true,
                        pin: true,
                        pinSpacing: false,
                        scroller: '.smooth-scroll',
                        start: "0% 0%",
                        end: "60%"
                    }
                })
                .fromTo(
                    ".show-reel-anim-text", {
                        duration: 1,
                        width: "100%"
                    }, {
                        duration: 1,
                        width: "50%"
                    }
                )


            const tl1 = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".show-reel-anim-main",
                        scrub: true,
                        pin: true,
                        pinSpacing: false,
                        scroller: '.smooth-scroll',
                        start: "0% 0%",
                        end: "90%"
                    }
                })

                .fromTo(
                    ".show-reel-anim-bg figure", {
                        duration: 1,
                        width: '428px',
                        height: '553px',
                    }, {
                        duration: 1,
                        width: '200%',
                        height: '150%',
                    },
                    "<"
                )



            gsap.utils.toArray(".home-about-us-wrap").forEach((panel, i) => {
                ScrollTrigger.create({
                    trigger: panel,
                    start: "0% 0%",
                    pin: true,
                    pinSpacing: false,
                    scroller: '.smooth-scroll',
                    start: "0% 0%",
                    end: "100%"
                })
            });

            ScrollTrigger.create({
                trigger: '.our-approach-wrap',
                start: "top top",
                pin: true,
                pinSpacing: false,
                scroller: '.smooth-scroll',
                start: "0% 0%",
                end: "100%"
            })

            ScrollTrigger.create({
                trigger: '.partners-wrap',
                start: "top top",
                pin: true,
                pinSpacing: false,
                scroller: '.smooth-scroll'
            })

            ScrollTrigger.create({
                trigger: '.our-project-wrap',
                start: "top top",
                pin: true,
                pinSpacing: false,
                scroller: '.smooth-scroll'
            })

            ScrollTrigger.create({
                trigger: '.home-content-wrap',
                start: "top top",
                pin: true,
                pinSpacing: false,
                scroller: '.smooth-scroll'
            })

            let typeSplit;
            // Split the text up
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
                    let tl2 = gsap.timeline({
                        scrollTrigger: {
                            trigger: $(this),
                            // trigger element - viewport
                            scroller: '.smooth-scroll',
                            start: "bottom center",
                            end: "bottom center",
                            scrub: 1
                        }
                    });
                    tl2.to($(this).find(".line-mask"), {
                        width: "0%",
                        duration: 1
                    });
                });
            }


            ScrollTrigger.create({
                trigger: '.newsletter-wrap',
                start: "top top",
                pin: true,
                pinSpacing: false,
                scroller: '.smooth-scroll'
            })
            ScrollTrigger.create({
                trigger: '.main-footer-section',
                start: "top top",
                scroller: '.smooth-scroll'
            })




            // Snapping won't work with locomotive-scroll
            ScrollTrigger.create({
                snap: 1 / 6 // snap whole page to the closest section!
            });
            // Snapping won't work with locomotive-scroll



            // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

            // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
            ScrollTrigger.refresh();



        }

        if ($(window).width() < 992) {

            $(window).on('load', function () {
                var windowHeight = $(window).outerHeight();
                var offsetY = $('.show-reel-anim-thumb').offset().top
                var offsetYWH = offsetY + windowHeight;
                var offsetVottom = $('.offset-bottom').offset().top;
                console.log(offsetY, offsetYWH)
                var windowHeightHalf = windowHeight / 2;
                $('.show-reel-anim-main.panel').css('min-height', (windowHeight * 2))
                if ($(window).width() < 992) {
                    $('.show-reel-anim-text').width($(window).width())
                }
                if ($(window).width() < 768) {
                    $('.show-reel-anim-text').width($(window).width() * 1.68)
                }
                var winWidth = $('.show-reel-anim-text').width();
                $(window).on('scroll', function () {
                    var scrollY = $(this).scrollTop();
                    var mainScroll = offsetY - scrollY;

                    if ($(window).width() < 992) {
                        var mainScrollInt = 1.0 - (mainScroll / 300);
                    }
                    if ($(window).width() < 768) {
                        var mainScrollInt = 1.0 - (mainScroll / 1000);
                    }
                    console.log(scrollY)
                    if (scrollY < offsetY) {
                        if ($(window).width() < 768) {
                            $('.show-reel-anim-text').stop(false).css('opacity', 0);
                        }
                    }
                    if (scrollY > offsetY && scrollY < offsetVottom) {
                        $('.show-reel-anim-thumb figure').stop(false).css({
                            'transform': 'scale(' + mainScrollInt + ')'
                        });
                        if ($(window).width() < 768) {
                            $('.show-reel-anim-text').stop(false).css('opacity', 1);
                        }
                        $('.show-reel-anim-text').stop(false).width(winWidth + (mainScroll));
                    }



                })
            })

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
                    var window_height = $window.height() / 1.1;
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




    }) // End ready function.


})(jQuery)