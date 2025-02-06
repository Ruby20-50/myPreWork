// SELECT iTEMS
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.add-btn');
const container = document.querySelector('.list-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

//EDIT OPTION
let editElement;
let editFlag = false;
let editID = ''; 

// EVENT LISTENER
//submit form
form.addEventListener("submit", addItem);
//clear items
clearBtn.addEventListener("click", clearItems);




 // fUNCTIONS
function addItem(e){

    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    console.log(id);
   if(value && !editFlag){
        console.log("add item to the list");
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
         //display alert
        displayAlert("item added to the list", "success");
        //show container
        container.classList.add("hide-container");

        
               
        //add to local Storage
        addToLocalStorage(id, value);
        //set back to default
        setBackToDefault();
    }else if(value  && editFlag){
        console.log("editing");
        const element = document.createElement('article');
        element.classList.add('grocery-item')
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
    //localStorage.removeItem('list');
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
}
//edit item
function editItem(){
    console.log("item edited");
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    const editElement = e.currentTarget.parentElement.
    previousElementSibling; 
    //set form value
    grocery.value = editElement.innerHTML;
    editFlag= true;
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
// LOCAL STORAGE
    function addToLocalStorage(id, value){
        console.log("added to the local storage");
    }
    function removeFromLocalStorage(id){

    }
// SET UP ITEMS