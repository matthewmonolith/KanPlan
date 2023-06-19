const deleteBtn = document.querySelectorAll('#del')
const todoItems = document.querySelectorAll('span.todo')
const doingItems = document.querySelectorAll('span.doing')
const doneItems = document.querySelectorAll('span.done')

const editButtons = document.querySelectorAll('#edit-button')
const modal = document.getElementById('modal')
const editTitleInput = document.getElementById('edit-title')
const editContentTextarea = document.getElementById('edit-content');
const saveButton = document.getElementById('save-button');

Array.from(deleteBtn).forEach(el=> el.addEventListener('click', deleteTodo))
Array.from(todoItems).forEach(el => el.addEventListener('click', markDoing))
Array.from(doingItems).forEach(el => el.addEventListener('click', markDone))
Array.from(editButtons).forEach(el => el.addEventListener('click', openModal))


async function deleteTodo(){
    const todoId = this.parentNode.parentNode.dataset.id
    console.log(todoId)
    try{
        const response = await fetch('todo/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markDoing() {
    console.log('markDoing called');
  
    const todoId = this.parentNode.dataset.id;
  
    const doingcolumn = document.getElementsByClassName('kanplan-column-doing')[0];
  
    try {
      const response = await fetch('todo/markDoing', {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          todoIdFromJSFile: todoId
        })
      });
  
      const data = await response.json();
  
      console.log(data);
      location.reload()
    } catch (err) {
      console.log(err);
    }
  }
  


async function markDone(){ //function to add task to the done column
    const todoId = this.parentNode.dataset.id

    console.log('markDone called')

    const doneColumn = document.getElementsByClassName('kanplan-column-done')[0]

    try{
        const response = await fetch('todo/markDone', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// opens modal box with the content of the todo inside of it
function openModal() {
    console.log('openModal has been called');
  
    // grab the necessary parts of the todo
    const todoItem = this.parentNode.parentNode;
    const todoId = todoItem.dataset.id;
    const title = todoItem.querySelector('span').textContent;
    const content = todoItem.querySelector('p').textContent;
  
    // put title and content of todo into the modal edit areas
    editTitleInput.value = title;
    editContentTextarea.value = content;
  
    // set the todo ID as a data attribute on the save button
    saveButton.dataset.id = todoId;
  
    modal.style.display = 'block';
  }
  
  saveButton.addEventListener('click', saveChanges);
  
  // save the changes function
  async function saveChanges() {
    const updatedTitle = editTitleInput.value;
    const updatedContent = editContentTextarea.value;
    const todoId = this.dataset.id; // Access the todo ID from the save button's data attribute
    
    try {
      const response = await fetch('todo/updateContent', {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          todoIdFromJSFile: todoId,
          updatedTitleFromModal: updatedTitle,
          updatedContentFromModal: updatedContent,
        }),
      });
  
      const data = await response.json();
      // Handle the response data or update the UI accordingly
      console.log(data);
      // Close the modal
      modal.style.display = 'none';
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  
  

//Nav Menu
const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-menu')
const navLink = document.querySelectorAll('.nav-menu a')

hamburger.addEventListener('click', mobileMenu)
navLink.forEach(link => link.addEventListener('click', closeMenu))

function mobileMenu() {
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
}

function closeMenu() {
    hamburger.classList.remove('active')
    navMenu.classList.remove('active')
}