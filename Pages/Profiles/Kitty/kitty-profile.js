httpGet();


function httpGet() {
    id= getId();
    const url = 'https://api.cryptokitties.co/kitties/' + id;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var response = JSON.parse(xmlHttp.responseText)
            console.log(response);
            displayCattributes(response.enhanced_cattributes);
            displayInfo(response);
            displayChildren(response.children);
        }

    }
    xmlHttp.send();
}

function getId(){
  var query = window.location.search.substring(1);
  return query.split('id=')[1];
}

function displayInfo(response) {
    url = 'https://www.cryptokitties.co/profile/profile-' + response.owner.image + '.png';

    document.getElementById("profile-img").src = response.image_url_png;
    document.getElementById("name").innerHTML = response.name;
    document.getElementById('bio').innerHTML = response.bio;
    document.getElementById("owner").innerHTML = response.owner.nickname;
    document.getElementById('owner-img').src = url;

    console.log(!response.matron || !response.sire );
    if (!response.matron || !response.sire) {
        document.getElementById("list").innerHTML = 'No parents found';
        console.log(response.matron );
      

    } else {
        document.getElementById("matron").src = response.matron.image_url_png;
        document.getElementById("sire").src = response.sire.image_url_png;
       
    }
}


function displayCattributes(cattributes) {
    if (generateChildren(cattributes)) {
        document.getElementById("displayCattributes").innerHTML = generateCattributes(cattributes);
        return;
    }
    document.getElementById("displayCattributes").innerHTML = "No cattributes"
}


function displayChildren(children) {

    if (generateChildren(children)) {
        document.getElementById("displayChildren").innerHTML = generateChildren(children);
        return;
    }
    document.getElementById("displayChildren").innerHTML = "No children"

}


function generateChildren(children) {

    var template = document.getElementById("children-list");
    var templateHtml = template.innerHTML;
    var listHtml = "";

    for (child in children) {
        listHtml += templateHtml.replace(/{{href}}/g, children[child]["image_url_png"])
    }

    return listHtml;
}

function generateCattributes(cattributes) {


    var template = document.getElementById("template-list-item");

    var templateHtml = template.innerHTML;
    var listHtml = "";

    for (cattribute in cattributes) {
        listHtml += templateHtml.replace(/{{type}}/g, cattributes[cattribute]["type"])
            .replace(/{{description}}/g, cattributes[cattribute]["description"])


    }

    return listHtml;
}