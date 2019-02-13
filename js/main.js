function DOMReady()
{
    console.log("DOM loaded");
}

DOMReady();

function SetWindowLocationTo(newLocation)
{
    window.location.href = newLocation;
}

function ToggleNavBar()
{
    let navBar = document.getElementById("js-nav-bar");
    navBar.classList.toggle("nav-bar-active");
    navBar.classList.toggle("nav-bar-inactive");

    let overlapBackground = document.getElementById("js-overlap-background");
    overlapBackground.classList.toggle("half-opaque-background");
    overlapBackground.classList.toggle("transparent-background");

    let overlapHide = document.getElementById("js-overlap-hide");
    overlapHide.classList.toggle("hidden");
}

/**
 * Toggles the visibility of the modal drawer and elements that relate to it (the reset div, for example). 
 */
/*
function ToggleDrawer()
{
    document.getElementById("js-drawer").classList.toggle("drawer-active");
    document.getElementById("js-drawer-hide-background").classList.toggle("transparent-background");
    document.getElementById("js-drawer-hide").classList.toggle("hidden");
}
*/
