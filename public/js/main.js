const deleteBtn = document.querySelectorAll('#del')
const todoItems = document.querySelectorAll('span.todo')
const doingItems = document.querySelectorAll('span.doing')
const doneItems = document.querySelectorAll('span.done')

const editButtons = document.querySelectorAll('#edit-button')
const modal = document.getElementById('modal')
const editTitleInput = document.getElementById('edit-title')
const editContentTextarea = document.getElementById('edit-content');
const saveButton = document.getElementById('save-button');
const closeButton = document.querySelectorAll('.close-button')

Array.from(deleteBtn).forEach(el=> el.addEventListener('click', deleteTodo))
Array.from(todoItems).forEach(el => el.addEventListener('click', markDoing))
Array.from(doingItems).forEach(el => el.addEventListener('click', markDone))
Array.from(editButtons).forEach(el => el.addEventListener('click', openModal))
Array.from(closeButton).forEach(el => el.addEventListener('click', closeModal))




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

    saveButton.addEventListener('click', saveChanges);
}

  // save the changes function
  async function saveChanges() {
    event.preventDefault()

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
  
  function closeModal(){
    modal.style.display = 'none';
  }

//Nav Menu
const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-menu')
const navLink = document.querySelectorAll('.nav-menu a')

hamburger.addEventListener('click', openMenu)
navLink.forEach(link => link.addEventListener('click', closeMenu))

function openMenu() {
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
}

function closeMenu() {
    hamburger.classList.remove('active')
    navMenu.classList.remove('active')
}

//Change Background
function switchToBackgroundMenu() {
	// Hide the current menu items
	const menuItems = document.querySelectorAll('.nav-item');
	menuItems.forEach(item => item.style.display = 'none');
	openMenu();
  
	// Create the new menu elements
	const backButton = document.createElement('div');
	backButton.classList.add('back-button');
	backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';

	const searchInput = document.createElement('input');
	searchInput.classList.add('search-input-background');
	searchInput.setAttribute('type', 'text');
	searchInput.setAttribute('placeholder', 'Search for photos');
	searchInput.id = 'searchInput';
	
	const submitButton = document.createElement('button')
	submitButton.classList.add('submit-button');
	submitButton.innerText = 'Search';

	const photoGrid = document.createElement('div');
	photoGrid.classList.add('photo-grid');
  
	// Append the new menu elements to the menu container
	const menuContainer = document.querySelector('.nav-menu');
	menuContainer.appendChild(backButton);
	menuContainer.appendChild(searchInput);
	menuContainer.appendChild(submitButton);
	menuContainer.appendChild(photoGrid);
  
	// Add event listener to the back button
	backButton.addEventListener('click', switchToMainMenu);

	submitButton.addEventListener('click', submitSearch);
}

// Event listener for "Change Background" menu item
const changeBackgroundLink = document.querySelector('#change-background');
changeBackgroundLink.addEventListener('click', switchToBackgroundMenu);

function switchToMainMenu() {
	// Remove the background menu elements
	const backButton = document.querySelector('.back-button');
	const searchInput = document.querySelector('input[type="text"]');
	const photoGrid = document.querySelector('.photo-grid');
	const submitButton = document.querySelector('.submit-button');
  
	backButton.remove();
	searchInput.remove();
	photoGrid.remove();
	submitButton.remove();
  
	// Show the original menu items
	const menuItems = document.querySelectorAll('.nav-item');
	menuItems.forEach(item => item.style.display = 'block');
}

function submitSearch() {
	const searchInput = document.getElementById('searchInput').value.trim()

	fetch(`/todo/searchPhotos?searchInput=${encodeURIComponent(searchInput)}`)
		.then((response) => response.json())
		.then((data) => {
			displayPhotos(data)
			console.log(data)
		})
		.catch((error) => {
			console.error('Error searching for photos', error)
		})
}

function displayPhotos(data) {
	const photoGrid = document.querySelector('.photo-grid');
	photoGrid.innerHTML = '';

	if (data.photos && Array.isArray(data.photos)) {
		data.photos.forEach((photo) => {
			const img = document.createElement('img')
			img.src = photo.urls.regular
			img.alg = photo.alt_description

			img.addEventListener('click', function () {
				const bgImage = new Image()
				bgImage.src = photo.urls.full
				bgImage.onload = function () {
					const backgroundContainer = document.querySelector('.background-container')
					backgroundContainer.style.backgroundImage = `url('${photo.urls.full}')`
				}
			})

			const photographerLink = document.createElement('a');
			photographerLink.href = photo.user.links.html;
			photographerLink.target = '_blank'
			photographerLink.textContent = photo.user.name;
	  
			const photographerName = document.createElement('div');
			photographerName.classList.add('photographer-name');
			photographerName.appendChild(photographerLink);
	  
			const photoContainer = document.createElement('div');
			photoContainer.classList.add('photo-container');
			photoContainer.appendChild(img);
			photoContainer.appendChild(photographerName);
	  
			photoGrid.appendChild(photoContainer);

			// Add event listener for hover effect
			photoContainer.addEventListener('mouseenter', () => {
		  		img.style.filter = 'grayscale(100%)';
		  		photographerName.style.visibility = 'visible';
			});
  
			photoContainer.addEventListener('mouseleave', () => {
		  		img.style.filter = '';
		  		photographerName.style.visibility = 'hidden';
			});
	  	});
	} else {
	  console.log('Invalid data format:', data);
	}
}
  