var baseUrl = '#kitty-profile/';
httpGet();

function getId() {
    var query = window.location.hash.substring(1);
    return query.split('/')[1];
}

function httpGet() {
    var id = getId();
    const url = 'https://api.cryptokitties.co/kitties/' + id;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var response = JSON.parse(xmlHttp.responseText);
            var kitty = {
                id: response.id,
                price: response.auction.current_price,
                name: response.name,
                profile_img: response.image_url_png,
                description: response.bio,
                cattributes: response.enhanced_cattributes,
                children: response.children,
                matron: response.matron,
                sire: response.sire,
                owner_name: response.owner.nickname,
                owner_img: 'https://www.cryptokitties.co/profile/profile-' + response.owner.image + '.png',
                owner_address: response.owner.address,
            }
            displayInfo(kitty);
        }
    }
    xmlHttp.send();
}

function displayInfo(kitty) {

    var parents = setParents(kitty);
    var url = '#user-profile/' + kitty.owner_address;
    var family_tree_url = '#family-tree/' + kitty.id;

    display(kitty.cattributes, 'displayCattributes', 'No cattributes', generateCattributes, "cattributes-template");
    display(kitty.children, 'displayChildren', 'No children', generateFamily, 'family-template');
    display(parents, 'displayparents', 'No parents found', generateFamily, 'family-template');

    if (kitty.profile_img) {
        document.getElementById("kitty-profile").src = kitty.profile_img;
    } else
        document.getElementById("kitty-profile").src = '../../Images/unk.png';

    if (kitty.name) {
        document.getElementById("kitty-name").innerHTML = kitty.name;
    }
    else {
        document.getElementById("kitty-name").innerHTML = 'John Doe';
    }
    document.getElementById('owner-profile').src = kitty.owner_img;

    document.getElementById('owner-href').setAttribute('href', url);
    document.getElementById('fam-href').setAttribute('href', family_tree_url);

    setValue(kitty.description, 'description', 'No description');
    setValue(kitty.owner_name, 'owner-name', 'John Doe');
    setValue(kitty.price, 'price', 'None yet');
}

function setParents(kitty) {
    var parents = [];

    if (kitty.matron.id && kitty.sire.id) {
        parents = [kitty.matron, kitty.sire];
    }

    return parents;
}

function setValue(item, id, string) {
    if (item) {
        document.getElementById(id).innerHTML = item;
        return;
    }
    document.getElementById(id).innerHTML = string;
}


function display(info, id, message, func, templateid) {
    if (generateTemplate(info, templateid, func)) {
        document.getElementById(id).innerHTML = generateTemplate(info, templateid, func);
        return;
    }
    document.getElementById(id).innerHTML = message;
}

function generateFamily(list, element, templateHtml) {
    if(!list[element]["image_url_png"]){
        list[element]["image_url_png"]= '../Images/unk.png'
    }
    return templateHtml
        .replace(/{{src}}/g, list[element]["image_url_png"])
        .replace(/{{id}}/g, list[element]["id"])
}


function generateCattributes(list, element, templateHtml) {
    return templateHtml.replace(/{{type}}/g, list[element]["type"])
        .replace(/{{description}}/g, list[element]["description"])
}

function generateTemplate(list, id, func) {
    var template = document.getElementById(id);
    var templateHtml = template.innerHTML;
    var listHtml = "";

    for (element in list) {
        listHtml += func(list, element, templateHtml);
    }

    return listHtml;
}