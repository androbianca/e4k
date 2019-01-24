httpGet();

function getId() {
    var query = window.location.hash.substring(1);
    return query.split('/')[1];
}

function httpGet() {
    var cart = "";
    var id = getId();
    const url = 'https://api.cryptokitties.co/kitties?owner_wallet_address=' + id + '&limit=100&offset=0';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var response = JSON.parse(xmlHttp.responseText);
            displayKitties(response.kitties);
            displayOwnerInfo(response);
        }

        if (window.localStorage.getItem("cart")) {
            cart = JSON.parse(window.localStorage.getItem("cart")).replace(/\\/g, '');
        }
        if (cart.match(id) == null) {
            cart += id + ',';
            window.localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
    xmlHttp.send();
}

function displayKitties(kitties) {
    document.getElementById("kitty").innerHTML = generateTemplate(kitties);
}

function displayOwnerInfo(response) {
    document.getElementById("name").innerHTML = response.kitties[0].owner.nickname;
    document.getElementById("total").innerHTML = response.total + ' kitties';
    document.getElementById("owner-img").src = 'https://www.cryptokitties.co/profile/profile-' + response.kitties[0].owner.image + '.png'
}

function generateTemplate(dataObject) {
    var template = document.getElementById("list");
    var templateHtml = template.innerHTML;
    var listHtml = "";

    for (key in dataObject) {
  
            if(!dataObject[key]["name"]){
                dataObject[key]["name"] = 'John Doe';
            }
            if(!dataObject[key]["image_url_png"]){
                dataObject[key]["image_url_png"] = "../Images/unk.png";
            }
        listHtml += templateHtml.replace(/{{name}}/g, dataObject[key]["name"])
            .replace(/{{src}}/g, dataObject[key]["image_url_png"])
            .replace(/{{href}}/g, '#kitty-profile/' + dataObject[key]["id"])
    }
    return listHtml;
    }