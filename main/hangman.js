var guesses = 10;

const head = document.getElementById("head");
const l_eye = document.getElementById("l-eye");
const r_eye = document.getElementById("r-eye");
const nose = document.getElementById("nose");
const mouth = document.getElementById("mouth");
const torso = document.getElementById("torso");
const l_arm = document.getElementById("l-arm");
const r_arm = document.getElementById("r-arm");
const l_leg = document.getElementById("l-leg");
const r_leg = document.getElementById("r-leg");
const parts = document.querySelectorAll(".part");


function editHangman() {
    guesses--;

    switch(guesses) {
        case 10:
            parts.forEach((part) => {
                part.style.opacity = "1";
            });
            break;
        case 9:
            head.style.opacity = "1";
            break;
        case 8:
            l_eye.style.opacity = "1";
            break;
        case 7:
            r_eye.style.opacity = "1";
            break;
        case 6:
            nose.style.opacity = "1";
            break;
        case 5:
            mouth.style.opacity = "1";
            break;
        case 4:
            torso.style.opacity = "1";
            break;
        case 3:
            l_arm.style.opacity = "1";
            break;
        case 2:
            r_arm.style.opacity = "1";
            break;
        case 1:
            l_leg.style.opacity = "1";
            break;
        case 0:
            r_leg.style.opacity = "1";
            break;
    }
}