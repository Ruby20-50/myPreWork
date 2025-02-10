// SELECT iTEMS
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.add-btn');
const container = document.querySelector('.list-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

//*****EDIT OPTION*****
let editElement;
let editFlag = false;
let editID = ''; 

// ********EVENT LISTENER******
//submit form
form.addEventListener("submit", addItem);
//clear items
clearBtn.addEventListener("click", clearItems);
//load items
window.addEventListener('DOMContentLoaded', setupItems);



 // *******fUNCTIONS*********
function addItem(e){

    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    console.log(id);
   if(value && !editFlag){
    createListItem(id,value); 
    displayAlert("item added to the list", "success");
    addToLocalStorage(id, value);
    setBackToDefault();
       //  const element = document.createElement('article');
        //add class
       // element.classList.add('grocery-item');
        //add id
      
         //display alert
        
        //show container
        //container.classList.add("hide-container");
        //add to local Storage
        
        //set back to default
       

    }else if(value  && editFlag){
        console.log(editFlag);
        editElement.innerHTML = value;
        displayAlert("item edited", "success");
        //edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    }else{
       displayAlert("empty value", "danger");
        }
}
function displayAlert(text , action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function (){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    } , 1000);
}
//clear items
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0){
        items.forEach(function (item){
            list.removeChild(item);
    })
    }
    container.classList.remove("hide-container");
    displayAlert("empty List", "danger");
    localStorage.removeItem('list');
}
//delete item
function deleteItem(e){
    console.log("item deleted");
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length == 0){
        container.classList.remove("hide-container");
    }
    displayAlert("item deleted", "danger");
    setBackToDefault();
    //remove form local storage
    removeFromLocalStorage(id);
}
//edit item
function editItem(e){
    editFlag= true;
    const element = e.currentTarget.parentElement.parentElement;
    console.log(element);
    //set edit item
    editElement = e.currentTarget.parentElement.
    previousElementSibling; 
    console.log(editElement);
    //set form value
    grocery.value = editElement.innerHTML;
    
    editID= element.dataset.id;
    submitBtn.textContent = "edit";
    
}
//set back to default
    function setBackToDefault(){
        console.log("set back to default");
        grocery.value= "";
        editFlag= false;
        editID="";
        submitBtn.textContent = "Add";
    }
// ******LOCAL STORAGE*********
    function addToLocalStorage(id, value){
        //console.log("added to the local storage");
        const grocery = {id, value};
        let items = localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
        console.log(items);
        items.push(grocery);
        localStorage.setItem("list", JSON.stringify(items));
    }
    //remove from local storage
    function removeFromLocalStorage(id){
        let item = getLocalstorage();
        item = item.filter(function(item){
            if(item.id !== id){
                return item;
            }
        });
        localStorage.setItem("list", JSON.stringify(item));

    }
    //edit local storage
    function editLocalStorage(id, value) {
        let item = getLocalstorage();
        item
        item = item.map(function(item){
            if(item.id === id){
                item.value = value;
            }
            return item;
        });
        localStorage.setItem("list", JSON.stringify(item));
    }
    function getLocalstorage(){
        return localStorage.getItem("list")?
        JSON.parse(localStorage.getItem("list")):
        [];
    }
    //localStorage API
    //getItem
    //setItem
    //removeItem
    //save as strings
//***** */ SET UP ITEMS*******
function setupItems(){
   let items = getLocalstorage();
   if(items.length > 0){
    items.forEach(function(item){
        createListItem(item.id, item.value);
    })
   } 
   container.classList.add('hide-container');
}
function createListItem(id, value){
    const element = document.createElement('article');
    //add class
    element.classList.add('grocery-item');
    //add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="item">${value}</p>
                <div class="btn-container">
                    <button type="button" class="edit-btn">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button type="button" class="del-btn">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>`;
    const deleteBtn = element.querySelector(".del-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem); 
    //appendChild
    list.appendChild(element);
    container.classList.add("hide-container");
}
