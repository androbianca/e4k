var i = 1;
var response;
var parents;
var relatives = [];


httpGet();

function getId() {
    var query = window.location.hash.substring(1);
    return query.split('/')[1];
}

function httpGet() {
    var id = getId();
    var response = get(id);
    var family_array = +response;
    // console.log(response);


}

function get(id) {
   
    const url = 'https://api.cryptokitties.co/kitties/' + id;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var response = JSON.parse(xmlHttp.responseText);
            i = i + 1;

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
        
             relatives.push(matron);
             relatives.push(sire);

            if (i < 3) {
                get(matron.id);
            }
            if (i < 3) {
                get(sire.id);
            }

            if(i==3){
                displayInfo(relatives);
            }
        }
    }

    xmlHttp.send();
    return parents;
}

function displayInfo(relatives){
    document.getElementById("matron-name").innerHTML = relatives[0].name;
    

}
