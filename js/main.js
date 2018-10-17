$(function()
{
    /* jQuery test */
    let header = $("#js-header");
    /*
    header.click(
        function()
        {
            location.href = "../aboutus.html"
        });
*/
    header.hover(
        function()
        {
            $(this).addClass("highlighted")
        }, 
        function()
        {
            $(this).removeClass("highlighted")
        });
})
