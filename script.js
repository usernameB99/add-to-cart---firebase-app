
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-e7407-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const addBtn = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
const shoppingList = document.getElementById("shopping-list");

addBtn.addEventListener("click", function() {
    let inputValue = inputField.value;

    push(shoppingListInDB, inputValue);

    clearInput();
})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){


    let itemsArray = Object.entries(snapshot.val())

    clearShoppingListElement();
    
    for(let i = 0; i < itemsArray.length; i++){
        let currentItem = itemsArray[i];
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1]

        appendItemToShoppingListElement(currentItem);
    }

    }
    else{
        shoppingList.innerHTML = "no items here yet";
    }
})

function clearInput() {
    inputField.value = "";
}

function appendItemToShoppingListElement(item){
    /* shoppingList.innerHTML += `<li>${itemValue}</li>`; */

    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function(){
        console.log(itemID);
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    })

    shoppingList.append(newEl);

}

function clearShoppingListElement(){
    shoppingList.innerHTML = "";
}