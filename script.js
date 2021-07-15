window.addEventListener('load', function () {//initialize the function when was loaded the window
    let requestURL = 'ships.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        let ships = request.response;
        fillFilters(ships);//calling the function which fill the filters from json-file.
        showShips(ships);
    };

});
document.getElementById('search').addEventListener('keyup', function () {//function for searching ships by symbols
    var searchPhrase = this.value;
    let requestURL = 'ships.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        let ships = request.response;
        let shipsarray = [];
        if (searchPhrase == '') {
            clearScreen();
            showShips(ships);
        }
        for (var ship of ships) {
            if (ship.title.includes(searchPhrase)) {
                shipsarray.push(ship);
            }
        }
        if (shipsarray.length != 0) {
            clearScreen();
            showShips(shipsarray);
        }
    };
});
/* document.getElementById('ships').addEventListener('click', function (e) {
    e.target.style.backgroundColor = "green";
    e.target.style.transition = "all .3s";
}); */
function clearScreen() {
    document.getElementById('ships').textContent = '';
}
function fillFilters(jsonObj) {
    let ships = jsonObj;

    fillNation(ships);//call filter by the Nation
    fillType(ships);//call filter by the Type
    fillLevel(ships);//call filter by the Level
}
function fillNation(jsonObj) {
    var shipNations = [];
    for (var i = 0; i < jsonObj.length; i++) {
        if (hasElement(shipNations))
            shipNations.push(jsonObj[i].nation);
        else if (shipNations.includes(jsonObj[i].nation))
            continue;
        else shipNations.push(jsonObj[i].nation);
    }
    var selectElement = document.getElementById('nation');
    createOption(selectElement, shipNations);
    console.log(shipNations);
}
function fillType(jsonObj) {
    var shipType = [];
    for (var i = 0; i < jsonObj.length; i++) {
        if (hasElement(shipType))
            shipType.push(jsonObj[i].type);
        else if (shipType.includes(jsonObj[i].type))
            continue;
        else shipType.push(jsonObj[i].type);
    }
    var selectElement = document.getElementById('type');
    createOption(selectElement, shipType);
    console.log(shipType);
}
function fillLevel(jsonObj) {
    var shipLevel = [];
    for (var i = 0; i < jsonObj.length; i++) {
        if (hasElement(shipLevel))
            shipLevel.push(jsonObj[i].level);
        else if (shipLevel.includes(jsonObj[i].level))
            continue;
        else shipLevel.push(jsonObj[i].level);
    }
    var selectElement = document.getElementById('level');
    createOption(selectElement, shipLevel);
    console.log(shipLevel);
}
function hasElement(element) {//validation on exicting the first value
    if (element == 0) {
        return true;
    }
    else return false;
}
function compareNumbers(a, b) {
    return a - b;
}
function createOption(selectElement, element) {//the interface for creating options
    if (typeof (element[0]) === 'string') {
        element.sort();
    }
    else {
        element.sort(compareNumbers);
    }
    for (let option of element) {
        var newOption = document.createElement('option');
        newOption.value = option;
        newOption.text = option;
        selectElement.appendChild(newOption);
    }
}
function showShips(jsonObj) {
    var ship = [];
    var shipsContainer = document.getElementById('ships');

    for (var i = 0; i < jsonObj.length; i++) {
        var element = document.createElement('div');
        element.classList.add("ship");
        element.setAttribute("id", jsonObj[i].title);
        var title = document.createElement('h3');
        var nation = document.createElement('span');
        nation.textContent = jsonObj[i].nation;
        title.textContent = jsonObj[i].title;
        element.appendChild(title);
        element.appendChild(nation);
        shipsContainer.appendChild(element);
    }
}