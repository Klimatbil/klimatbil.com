function DOMReady()
{
    console.log("DOM loaded");
}

DOMReady();

/**
 * Toggles the visibility of the modal drawer and elements that relate to it (the reset div, for example). 
 */
function ToggleSidebar()
{
    document.getElementById("js-sidebar").classList.toggle("sidebar-active");
    document.getElementById("js-sidebar-reset-background").classList.toggle("transparent-background");
    document.getElementById("js-sidebar-reset").classList.toggle("hidden");
}
