$(function()
{
    console.log("DOM loaded (msg from jQuery)");
});


/**
 * Adds or removes class "sidebar-active" to the sidebar which either toggles it to be displayed or hidden.
 * @param {boolean} displayed - Determines whether the sidebar should be displayed or not.
 */
function setSidebarDisplayed(displayed)
{
    if (displayed === true)
    {
        $("#js-sidebar").addClass("sidebar-active");
        $("#js-sidebar-reset-background").removeClass("transparent-background");
        $("#js-sidebar-reset").removeClass("hidden");
    }
    else 
    {
        $("#js-sidebar").removeClass("sidebar-active");
        $("#js-sidebar-reset-background").addClass("transparent-background");
        $("#js-sidebar-reset").addClass("hidden");
    }
}
