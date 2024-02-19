var timeout;


const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    })


        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            Delay: -1,
            stagger: 0.2,
        })

        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            Delay: -1,
            ease: Expo.easeInOut,
        });
}

var timeout;

function circleChaptaKaro() {

    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - xprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        // xscale = gsap.utils.clamp(.8,1.2, xdiff); 
        // yscale = gsap.utils.clamp(.8,1.2, ydiff);

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector(
                "#circle"
                ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);

    });
}



function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector(
            "#circle"
            ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    });

}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

// second page 


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;


    elem.addEventListener("mouseleave", function (dets) {
        // var diff = dets.clientY - elem.getBoundingClientRect().top;
        // diffrot = rotate - dets.clientX;
        // rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration:0.5, 

        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = rotate - dets.clientX;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot *0.5),  //(min degree, max degree, clamp value) using for rotate the image
        });
    });
});
