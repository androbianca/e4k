var isMenuActive = false;

function toggleMenu() {
    var menu = document.getElementsByClassName("navigation");
    if(isMenuActive == true){
        menu[0].classList.add("hidden");
        isMenuActive = false;
        console.log("Inactive");
    }
    else
    {
        menu[0].classList.remove("hidden");
        isMenuActive = true;
        console.log("Active");
    }
}