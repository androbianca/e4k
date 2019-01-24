getOwnerAdress()

function getOwnerAdress() {
  var owners = [];
  var adresses = JSON.stringify(JSON.parse(window.localStorage.getItem("owners"))).replace(/"/g, '').split(",");
  if (adresses.length == 1){
    document.getElementById('page').innerHTML = "No owners yet"
  }

  var len =  adresses.length - 2;
  for (i = 0; i < adresses.length - 1; i++) {
    httpGet(adresses[i], owners ,len,i )
  }
}

function httpGet(adress, owners, len,i) {
  var name = '';
  const url = 'https://api.cryptokitties.co/kitties?owner_wallet_address=' + adress + '&limit=100&offset=0';
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url);
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      var response = JSON.parse(xmlHttp.responseText);
      if(!response.kitties[0].owner.nickname){
         name = "John Doe";
      }
      else{
         name = response.kitties[0].owner.nickname
      }
      var owner = {
        adress: adress,
        img: 'https://www.cryptokitties.co/profile/profile-' + response.kitties[0].owner.image + '.png',
        name: name,
        total: response.total
      }
      owners.push(owner);
      
      if(len == i){
        setTimeout(function(){ owners.sort(function (a, b) {
          var ownerA = a.total
          var ownerB = b.total;
          if (ownerA < ownerB) {
            return 1;
          }
          if (ownerA > ownerB) {
            return -1;
          }
          return 0;
        })
      display(owners,'displayOthers',"top-template",1);
  
    } , 5000);       
}
  }}
  xmlHttp.send();
}

function display(obj,id,temp,place) {
  document.getElementById(id).innerHTML = generateTemplate(obj,temp,place);
}

function generateTemplate(obj,id,place) {
  var template = document.getElementById(id);
  var templateHtml = template.innerHTML;
  var listHtml = ""
  for (i in obj) {
    listHtml += templateHtml.replace(/{{name}}/g, obj[i].name)
    .replace(/{{nr}}/g, obj[i].total)
    .replace(/{{place}}/g, place)
    .replace(/{{img}}/g, obj[i].img)
    .replace(/{{href}}/g, '#user-profile/' + obj[i].adress);
    place = place +1 ;
  }
  return listHtml;
}