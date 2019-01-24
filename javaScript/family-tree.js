function getId() {
    var query = window.location.hash.substring(1);
    return query.split('/')[1];
}

httpGet();

var i = 0;
var response;
var parents;
var relatives = [];

function httpGet() {
    var id = getId();
    get(id);
}

function get(id) {
    const url = 'https://api.cryptokitties.co/kitties/' + id;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var response = JSON.parse(xmlHttp.responseText);
            i = i + 1;
            var child = {
                name: response.name,
                id: response.id,
                img: response.image_url_png
            }
            var matron = {
                name: response.matron.name,
                id: response.matron.id,
                img: response.matron.image_url_png
            }
            var sire = {
                id: response.sire.id,
                name: response.sire.name,
                img: response.sire.image_url_png
            }
            if (i == 1) {
                relatives.push(child);
            }
            if (matron.id == null || sire.id == null) {
                displayInfo(relatives);
                return;
            }
            relatives.push(matron);
            relatives.push(sire);
            if (i < 3 && matron.id != null) {
                get(matron.id);
            }

            if (i < 3 && sire.id != null) {
                get(sire.id);
            }

            if (i == 3) {
                displayInfo(relatives);
            }

        }
    }
    xmlHttp.send();
    return parents;
}

function displayInfo(relatives) {
    grid1 = [];
    grid2 = [];
    grid3 = [];
    grid1.push(relatives[0]);
    grid2.push(relatives[1]);
    grid2.push(relatives[2]);

    for (var i = 3; i <= 6; i++) {
        grid3.push(relatives[i])
    }

    document.getElementById("mydiv1").innerHTML = generateTemplate(grid1, 'child');
    document.getElementById("mydiv2").innerHTML = generateTemplate(grid2, 'parent');
    document.getElementById("mydiv3").innerHTML = generateTemplate(grid3, 'grandparent');
}

function generateTemplate(dataObject, rel) {
    var template = document.getElementById("family");
    var templateHtml = template.innerHTML;
    var listHtml = "";

    for (key in dataObject) {

        if(!dataObject[key].img){
            dataObject[key].img= "../Images/unk.png"
        }
        if(!dataObject[key].name){
            dataObject[key].name= "John Doe"
        }

        listHtml += templateHtml.replace(/{{name}}/g, dataObject[key].name)
            .replace(/{{href}}/g, '#kitty-profile/' + dataObject[key].id)
            .replace(/{{src}}/g, dataObject[key].img)
            .replace(/{{rel}}/g, rel)
    }

    return listHtml;
}
