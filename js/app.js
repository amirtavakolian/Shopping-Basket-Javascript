// ************** Variables **************

let localStorageKey = "course";
let add = document.querySelector("#courses-list");
let basketList = document.querySelector("#cart-content>tbody");
let clearBasket = document.querySelector("#clear-cart");

// ******************************************


// ************** Listeners **************

add.addEventListener("click", addToBasket);
document.addEventListener("DOMContentLoaded", setItemsOnLoad);
clearBasket.addEventListener("click", clearAllItemsFromBasket);

// ******************************************




// ************** Functions **************

// Add course to basket
function addToBasket(e) {
    e.preventDefault();

    if (e.target.classList.contains("add-to-cart")) {
        let info = getCourseInfo(e);

        addInfoToList(info);
        addToLocalStorage(info);
    }
}

// ===========================================================

// Get info of selected course:
function getCourseInfo(e) {
    return {
        title: e.target.parentElement.children[0].innerText,
        price: e.target.parentElement.children[3].children[0].innerText,
        image: e.target.parentElement.children[3].parentElement.parentElement.children[0].children[0].currentSrc
    }
}

// ===========================================================

// Add info of course to the list
function addInfoToList(info) {
    let tr = document.createElement("tr");
    var allInfo = `
            <tr>
            <td>${info.title}</td>
            <td>${info.price}</td>
            <td><img src="${info.image}" style="width:50px; height:50px"></td>
            <td><span class="removeItem" onclick="removeThisItem(event)">X</span></td>
            </tr>
        `
    tr.innerHTML = allInfo;
    basketList.appendChild(tr);
}

// ===========================================================

function addToLocalStorage(info) {
    let local = getLocalStorage(localStorageKey);
    local.push(info);
    localStorage.setItem(localStorageKey, JSON.stringify(local));
}

// ===========================================================

function getLocalStorage(key) {
    let item = localStorage.getItem(key);

    if (item != null) {
        return JSON.parse(item);
    } else {
        return [];
    }
}

// ===========================================================

// Set items from local storage to basket
function setItemsOnLoad() {
    let data = getLocalStorage(localStorageKey);
    if (data.length != 0) {
        data.forEach((data) => {
            addInfoToList(data);
        });
    }
}

// ===========================================================

function clearAllItemsFromBasket(e) {
    //let items = e.target.parentElement.children[0].children[1].children;
    clearLocalStorage();
    let items = document.querySelector("#cart-content>tbody");

    while (items.firstChild) {
        items.firstChild.remove();
    }
}

// ===========================================================

// Clear all items from loca storage
function clearLocalStorage() {
    localStorage.removeItem(localStorageKey);
}

// ===========================================================


function removeThisItem(e) {
    //console.dir(e.target.parentElement.parentElement.remove());
    e.target.parentElement.parentElement.remove();
}