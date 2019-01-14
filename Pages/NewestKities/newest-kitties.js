httpGet();

function httpGet() {
    const url = 'https://api.cryptokitties.co/kitties?limit=100&offset=0&generation=25';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url); 
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var response = JSON.parse(xmlHttp.responseText)
            displayKitties(response.kitties);
          }
    }
    
    xmlHttp.send();
}


function displayKitties(kitties) {
  document.getElementById("displayKitties").innerHTML = generateTemplate(kitties);
}

function generateTemplate(dataObject) {
    var template = document.getElementById("template-list-item");
    var templateHtml = template.innerHTML;
    var listHtml = "";

    for (key in dataObject) {
        listHtml += templateHtml.replace(/{{name}}/g, dataObject[key]["name"])
                                .replace(/{{href}}/g, dataObject[key]["image_url_png"])
                                .replace(/{{kitty-id}}/g, dataObject[key]["id"])
    }

    return listHtml;
}
