function DOMReady()
{
    console.log("DOM loaded");
}

DOMReady();

function SetWindowLocationTo(newLocation)
{
    window.location.href = newLocation;
}

let navBar = document.getElementById("js-nav-bar");
let overlapBackground = document.getElementById("js-overlap-background");
let overlapHide = document.getElementById("js-overlap-hide");
let hamburger = document.getElementById("js-nav-hamburger");

function ToggleNavBar()
{
    navBar.classList.toggle("nav-bar-active");
    navBar.classList.toggle("nav-bar-inactive");

    overlapBackground.classList.toggle("half-opaque-background");
    overlapBackground.classList.toggle("transparent-background");

    overlapHide.classList.toggle("hidden");

    hamburger.classList.toggle("close");
}
