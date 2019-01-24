httpGet();

function httpGet() {
    const url = 'https://api.cryptokitties.co/kitties?limit=100&offset=0&generation=25';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url); 
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var response = JSON.parse(xmlHttp.responseText)
            kitties = response.kitties;          
            kitties.sort(function (a, b) {
                var ownerA = a.created_at
                var ownerB = b.created_at;
                if (ownerA < ownerB) {
                  return 1;
                }
                if (ownerA > ownerB) {
                  return -1;
                }
                return 0;
              })        
            displayKitties(kitties);
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
        if(!dataObject[key]["name"]){
            dataObject[key]["name"] = 'John Doe';
        }
        if(!dataObject[key]["image_url_png"]){
            dataObject[key]["image_url_png"] = "../Images/unk.png"
        }
        listHtml += templateHtml.replace(/{{name}}/g, dataObject[key]["name"])
                                .replace(/{{href}}/g, dataObject[key]["image_url_png"])
                                .replace(/{{id}}/g, dataObject[key]["id"])           
    }

    return listHtml;
}
