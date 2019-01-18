httpGet();
function getId() {
    var query = window.location.hash.substring(1);
    return query.split('/')[1];
}

var numberOfKitties = 0;
function httpGet() {
    id = getId();
    const url = 'https://api.cryptokitties.co/kitties?owner_wallet_address='+ id +'&limit=100&offset=0' ;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url); 
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var response = JSON.parse(xmlHttp.responseText);
            console.log(response);
            displayKitties(response.kitties);
            displayOwnerInfo(response);
            
           
          }
    }
    
    xmlHttp.send();
}
function displayKitties(kitties) {
    document.getElementById("kitty").innerHTML = generateTemplate(kitties);
}

function displayOwnerInfo(response){
    document.getElementById("name").innerHTML= response.kitties[0].owner.nickname;
    document.getElementById("total").innerHTML= response.total + ' kitties';
    document.getElementById("owner-img").src=  'https://www.cryptokitties.co/profile/profile-' + response.kitties[0].owner.image + '.png'
}
 
  function generateTemplate(dataObject) {
      var template = document.getElementById("list");
      var templateHtml = template.innerHTML;
      var listHtml = "";
  
      for (key in dataObject) {
          numberOfKitties = numberOfKitties + 1;
          listHtml += templateHtml.replace(/{{name}}/g, dataObject[key]["name"])
                                  .replace(/{{src}}/g, dataObject[key]["image_url_png"])
                                  .replace(/{{href}}/g,  '../Kitty/kitty-profile.html?id=' + dataObject[key]["id"])
      }
  
      return listHtml;
  }