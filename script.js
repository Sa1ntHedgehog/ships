class Ship {
    constructor(title, nation, type, level, status) {
        this.title = title;
        this.nation = nation;
        this.type = type;
        this.level = level;
        this.status = status;
    }
    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }
    setNation(nation) {
        this.nation = nation;
    }
    getNation() {
        return this.nation;
    }
    setType(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }
    setLevel(level) {
        this.level = level;
    }
    getLevel() {
        return this.level;
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
}
class Sidebar {
    constructor() {
        this.ships = Array();
        this.levels = 0;
        this.Container = document.getElementById('selected_ships');
        this.ContainerLevel = document.getElementById('ships_level');
    }
    addToSidebar(ship) {
        this.ships.push(ship);
        clearContainer(this.Container);
        showShipsSidebar(this.Container, this.getSidebar());
        showLevelSidebar(this.ContainerLevel);
    }
    removeFromSidebar(ship) {
        this.ships.splice(this.ships.indexOf(ship), 1);
        this.getSidebar();
        clearContainer(this.Container);
        showShipsSidebar(this.Container, this.getSidebar());
        showLevelSidebar(this.ContainerLevel);
    }
    getSidebar() {
        return this.ships;
    }
    sumLevel(shipLevel) {
        var buffer = this.levels;
        buffer += shipLevel;
        if (buffer > 40)
            return false;
        else if (buffer <= 40) {
            this.levels = buffer;
            return true;
        }
    }
    subtractionLevel(shipLevel) {
        this.levels -= shipLevel;
    }
    getLevels() {
        return this.levels;
    }

}
class Query {
    constructor() {
        this.nation = "Нация";
        this.type = "Класс";
        this.level = "Уровень";
    }
    setNation(nation) {
        this.nation = nation;
    }
    getNation() {
        return this.nation;
    }
    setType(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }
    setLevel(level) {
        this.level = level;
    }
    getLevel() {
        return this.level;
    }
}
function clearContainer(Container) {
    Container.textContent = '';
}
window.addEventListener('load', function () {//initialize the function when was loaded the window
    let requestURL = 'ships.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        let ships = request.response;
        fillArray(ships);
    };
});
var sidebar = new Sidebar();
var query = new Query();
var shipsArray = [];
function fillArray(jsonObj) {
    for (var i = 0; i < jsonObj.length; i++)
        shipsArray.push(new Ship(jsonObj[i].title, jsonObj[i].nation, jsonObj[i].type, jsonObj[i].level, 0));
    var shipsContainer = document.getElementById('ships');
    showShips(shipsContainer, shipsArray);
    fillFilters(shipsArray);
}
function fillFilters(shipsArray) {
    let ships = shipsArray;
    fillNation(ships);//call filter by the Nation
    fillType(ships);//call filter by the Type
    fillLevel(ships);//call filter by the Level
}
function showShips(Container, shipsArray) {
    console.log(shipsArray);
    var shipsContainer = Container;
    for (var i = 0; i < shipsArray.length; i++) {
        var element = document.createElement('div');
        if (shipsArray[i].getStatus() == 0) {
            element.classList.add("ship");
            element.setAttribute("id", shipsArray[i].title);
        }
        else {
            element.classList.add("ship");
            element.classList.toggle("highlight");
            element.setAttribute("id", shipsArray[i].title);
        }
        var title = document.createElement('h3');
        var level = document.createElement('span');
        var nation = document.createElement('span');
        nation.textContent = shipsArray[i].nation;
        level.textContent = shipsArray[i].level;
        title.textContent = shipsArray[i].title;
        element.appendChild(title);
        element.appendChild(level);
        element.appendChild(nation);
        shipsContainer.appendChild(element);
    }
}
function showShipsSidebar(Container, shipsArray) {
    console.log(shipsArray);
    var shipsContainer = Container;
    for (var i = 0; i < shipsArray.length; i++) {
        var element = document.createElement('div');
        element.classList.add("ship");
        element.setAttribute("id", shipsArray[i].title);
        var title = document.createElement('h3');
        var level = document.createElement('span');
        var nation = document.createElement('span');
        nation.textContent = shipsArray[i].nation;
        level.textContent = shipsArray[i].level;
        title.textContent = shipsArray[i].title;
        element.appendChild(title);
        element.appendChild(level);
        element.appendChild(nation);
        shipsContainer.appendChild(element);
    }
}
function showLevelSidebar(Container) {
    var levelsContainer = Container;
    clearContainer(levelsContainer);
    levelsContainer.textContent = sidebar.getLevels();
}
document.getElementById('ships').addEventListener('click', function (e) {
    if (e.target.id && e.target.id != 'ships') {
        for (var i = 0; i < shipsArray.length; i++) {
            if (shipsArray[i].title == e.target.id) {
                if (shipsArray[i].getStatus() == 0) {
                    if (sidebar.sumLevel(shipsArray[i].getLevel())) {
                        if (sidebar.getSidebar().length < 7) {
                            sidebar.addToSidebar(shipsArray[i]);
                            console.log("Sum levels: " + sidebar.getLevels() + " Sum ships: " + sidebar.getSidebar().length);
                            e.target.classList.toggle('highlight');
                            e.target.style.transition = "all .3s";
                            shipsArray[i].setStatus(1);
                            console.log(shipsArray[i]);
                        }
                        else {
                            sidebar.subtractionLevel(shipsArray[i].getLevel());
                        }
                    }
                }
                else {
                    sidebar.subtractionLevel(shipsArray[i].getLevel());
                    sidebar.removeFromSidebar(shipsArray[i]);
                    console.log("Sum levels: " + sidebar.getLevels());
                    e.target.classList.toggle('highlight');
                    e.target.style.transition = "all .3s";
                    shipsArray[i].setStatus(0);
                    console.log(shipsArray[i]);
                }
            }
        }
    }
});
document.getElementById('search').addEventListener('keyup', function () {//function for searching ships by symbols
    var searchedShips = [];
    var searchPhrase = this.value;
    var shipsContainer = document.getElementById('ships');
    if (searchPhrase == '') {
        clearContainer(shipsContainer);
        showShips(shipsContainer, ships);
    }
    for (var ship of shipsArray) {
        if (ship.title.includes(searchPhrase)) {
            searchedShips.push(ship);
            clearContainer(shipsContainer);
            showShips(shipsContainer, searchedShips);
        }
    }
});

function fillNation(shipsArray) {
    var shipNations = [];
    for (var i = 0; i < shipsArray.length; i++) {
        if (hasElement(shipNations))
            shipNations.push(shipsArray[i].nation);
        else if (shipNations.includes(shipsArray[i].nation))
            continue;
        else shipNations.push(shipsArray[i].nation);
    }
    var selectElement = document.getElementById('nation');
    createOption(selectElement, shipNations);
    console.log(shipNations);
}
function fillType(shipsArray) {
    var shipType = [];
    for (var i = 0; i < shipsArray.length; i++) {
        if (hasElement(shipType))
            shipType.push(shipsArray[i].type);
        else if (shipType.includes(shipsArray[i].type))
            continue;
        else shipType.push(shipsArray[i].type);
    }
    var selectElement = document.getElementById('type');
    createOption(selectElement, shipType);
    console.log(shipType);
}
function fillLevel(shipsArray) {
    var shipLevel = [];
    for (var i = 0; i < shipsArray.length; i++) {
        if (hasElement(shipLevel))
            shipLevel.push(shipsArray[i].level);
        else if (shipLevel.includes(shipsArray[i].level))
            continue;
        else shipLevel.push(shipsArray[i].level);
    }
    var selectElement = document.getElementById('level');
    createOption(selectElement, shipLevel);
    console.log(shipLevel);
}
function compareNumbers(a, b) {
    return a - b;
}
function hasElement(element) {//validation on exicting the first value
    if (element == 0) {
        return true;
    }
    else return false;
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
document.getElementById("nation").addEventListener("change", function (e) {
    if (this.value) {
        query.setNation(this.value);
        applyFilter();
    }

});
document.getElementById("type").addEventListener("change", function (e) {
    if (this.value) {
        query.setType(this.value);
        applyFilter();
    }
});
document.getElementById("level").addEventListener("change", function (e) {
    if (this.value) {
        query.setLevel(this.value);
        applyFilter();
    }
});
function applyFilter() {
    if ((query.getNation() == "Нация") && (query.getType() == "Класс") && (query.getLevel() == "Уровень")) {
        var shipsContainer = document.getElementById('ships');
        clearContainer(shipsContainer);
        showShips(shipsContainer, shipsArray);
    }
    else if ((query.getNation()) && (query.getType() == "Класс") && (query.getLevel() == "Уровень")) {
        var ships = shipsArray.filter(function (filter) {
            if (filter.nation == query.getNation())
                return filter;
        });
        var shipsContainer = document.getElementById('ships');
        clearContainer(shipsContainer);
        showShips(shipsContainer, ships);
    }
    else if ((query.getNation() == "Нация") && (query.getType()) && (query.getLevel() == "Уровень")) {
        var ships = shipsArray.filter(function (filter) {
            if (filter.type == query.getType())
                return filter;
        });
        var shipsContainer = document.getElementById('ships');
        clearContainer(shipsContainer);
        showShips(shipsContainer, ships);
    }
    else if ((query.getNation() == "Нация") && (query.getType() == "Класс") && (query.getLevel())) {
        var ships = shipsArray.filter(function (filter) {
            if (filter.level == query.getLevel())
                return filter;
        });
        var shipsContainer = document.getElementById('ships');
        clearContainer(shipsContainer);
        showShips(shipsContainer, ships);
    }
    else if ((query.getNation()) && (query.getType()) && (query.getLevel() == "Уровень")) {
        var ships = shipsArray.filter(function (filter) {
            if ((filter.nation == query.getNation()) && (filter.type == query.getType()))
                return filter;
        });
        var shipsContainer = document.getElementById('ships');
        clearContainer(shipsContainer);
        showShips(shipsContainer, ships);
    }
    else if ((query.getNation() == "Нация") && (query.getType()) && (query.getLevel())) {
        var ships = shipsArray.filter(function (filter) {
            if ((filter.type == query.getType()) && (filter.level == query.getLevel()))
                return filter;
        });
        var shipsContainer = document.getElementById('ships');
        clearContainer(shipsContainer);
        showShips(shipsContainer, ships);
    }
    else if ((query.getNation()) && (query.getType() == "Класс") && (query.getLevel())) {
        var ships = shipsArray.filter(function (filter) {
            if ((filter.nation == query.getNation()) && (filter.level == query.getLevel()))
                return filter;
        });
        var shipsContainer = document.getElementById('ships');
        clearContainer(shipsContainer);
        showShips(shipsContainer, ships);
    }
    else if ((query.getNation()) && (query.getType()) && (query.getLevel())) {
        var ships = shipsArray.filter(function (filter) {
            if ((filter.nation == query.getNation()) && (filter.type == query.getType()) && (filter.level == query.getLevel()))
                return filter;
        });
        var shipsContainer = document.getElementById('ships');
        clearContainer(shipsContainer);
        showShips(shipsContainer, ships);
    }
}
