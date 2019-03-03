function SetWindowLocationTo(newLocation)
{
    window.location.href = newLocation;
}

function ToggleNavBar()
{
    var navBar = document.getElementById("js-nav-bar");
    var overlapBackground = document.getElementById("js-overlap-background");
    var overlapHide = document.getElementById("js-overlap-hide");
    var hamburger = document.getElementById("js-nav-hamburger");

    navBar.classList.toggle("nav-bar-active");
    navBar.classList.toggle("nav-bar-inactive");

    overlapBackground.classList.toggle("half-opaque-background");
    overlapBackground.classList.toggle("transparent-background");

    overlapHide.classList.toggle("hidden");

    hamburger.classList.toggle("close");

    // Disable scrolling when nav bar is open
    document.querySelector("body").style.overflowY = hamburger.classList.contains("close")
    ? "hidden"
    : "visible";
}

function ToggleDropdown(dropdownElement)
{
    var dropdownContent = dropdownElement.querySelector(".dropdown-content");
    dropdownContent.classList.toggle("hidden");
    
    var isHidden = dropdownContent.classList.contains("hidden");

    dropdownElement.querySelector(".dropdown-arrow path")
        .setAttribute("transform", `rotate(${isHidden ? 0 : 180}, 5, 5)`)
}
