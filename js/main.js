function DOMReady()
{
    console.log("DOM loaded");
}

DOMReady();

/**
 * Toggles the visibility of the modal drawer and elements that relate to it (the reset div, for example). 
 */
function ToggleDrawer()
{
    document.getElementById("js-drawer").classList.toggle("drawer-active");
    document.getElementById("js-drawer-hide-background").classList.toggle("transparent-background");
    document.getElementById("js-drawer-hide").classList.toggle("hidden");
}
