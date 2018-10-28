var isMenuActive = false;

function toggleMenu() {
    var menu = document.getElementsByClassName("navigation");
    var body = document.getElementsByTagName("body")[0];
    if(isMenuActive == true){
        menu[0].classList.add("hidden");
        isMenuActive = false;
        body.classList.remove("no-overflow");   
    }
    else
    {
        menu[0].classList.remove("hidden");
        isMenuActive = true;
        body.classList.add("no-overflow");
    }
}