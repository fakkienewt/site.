import advantages from "./mock/advantages.mjs";
import { usersMock } from "./mock/users.mjs";
let users = usersMock
    .map((user, index) => ({
        ...user,
        id: index,
    }));
const usersList = document.querySelector('.users-list');

let buttonExit = document.querySelector('.header-button');
buttonExit.addEventListener('click', clickExit);
function clickExit() {
    window.location.assign('index.html');
}

// sort
document.querySelector('#select-sort').addEventListener('change', () => refreshUserList());
// user list

function refreshUserList() {
    const sortBy = document.querySelector('#select-sort').value;
    if (sortBy === 'alphabet') {
        users.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    } else if (sortBy === 'priceAsc') {
        users.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
        users.sort((a, b) => b.price - a.price);
    }
    let html = '';
    users.forEach(item => {
        html += `
<div class="item">
    <img class="avatar" src="${item.avatar}">
    <div class="name">${item.name}</div>
    <div class ="description">${item.description}</div>
    <div class ="role">${item.role}</div>
    <div class ="price">${item.price}$</div>
    <div data-id ="${item.id}" class="edit">edit</div>
    <div data-id ="${item.id}" class="delete">delete</div>
</div>`;
    });
    usersList.innerHTML = html;
    document.querySelectorAll('.delete').forEach(el => el.addEventListener('click', deleteFunc));
    document.querySelectorAll('.edit').forEach(el => el.addEventListener('click', editFunc));
}

let mainFormEdit = document.querySelector('#main-form-edit');

function editFunc() {
    mainFormEdit.style.display = 'flex';

    const id = this.getAttribute("data-id");
    buttonSave.setAttribute('data-id', id);
    const user = users.find(u => u.id == id);

    let nameInputEdit = document.querySelector('#name-edit');
    let descriptionInputEdit = document.querySelector('#description-edit');
    let avatarInputEdit = document.querySelector('#avatar-edit');
    let roleInputEdit = document.querySelector('#role-edit');
    let priceInputEdit = document.querySelector('#price-edit');
    nameInputEdit.value = user.name;
    descriptionInputEdit.value = user.description;
    avatarInputEdit.value = user.avatar;
    roleInputEdit.value = user.role;
    priceInputEdit.value = user.price;
}

let buttonSave = document.querySelector('.button-save');
buttonSave.addEventListener('click', clickSave);

function clickSave() {
    const id = this.getAttribute("data-id");
    let nameInput = document.querySelector('#name-edit');
    let descriptionInput = document.querySelector('#description-edit');
    let avatarInput = document.querySelector('#avatar-edit');
    let roleInput = document.querySelector('#role-edit');
    let priceInput = document.querySelector('#price-edit');
    const name = nameInput.value;
    const description = descriptionInput.value;
    const avatar = avatarInput.value;
    const role = roleInput.value;
    const price = priceInput.value;

    if (!name || !description || !avatar || !role || !price) {
        return;
    }

    nameInput.value = '';
    descriptionInput.value = '';
    avatarInput.value = '';
    roleInput.value = '';
    priceInput.value = '';
    const user = users.find(u => u.id == id);
    user.name = name;
    user.description = description;
    user.avatar = avatar;
    user.role = role;
    user.price = price;
    refreshUserList();
    mainFormEdit.style.display = 'none';
}


function deleteFunc() {
    let id = this.getAttribute("data-id");
    users = users.filter(user => user.id != id);
    refreshUserList();
}

refreshUserList();

// user form
let buttonAdd = document.querySelector('.button-add');
buttonAdd.addEventListener('click', clickAdd);

function clickAdd() {
    let nameInput = document.querySelector('#name');
    let descriptionInput = document.querySelector('#description');
    let avatarInput = document.querySelector('#avatar');
    let roleInput = document.querySelector('#role');
    let priceInput = document.querySelector('#price');
    const name = nameInput.value;
    const description = descriptionInput.value;
    const avatar = avatarInput.value;
    const role = roleInput.value;
    const price = priceInput.value;
    let id = Math.max(...users.map(user => user.id)) + 1;
    if (!name || !description || !avatar || !role || !price) {
        return;
    }

    nameInput.value = '';
    descriptionInput.value = '';
    avatarInput.value = '';
    roleInput.value = '';
    priceInput.value = '';
    let item = {
        name, description, avatar, role, id, price
    };
    users.push(item);
    refreshUserList();
}

// adv
let sectionAdvantagesEl = document.querySelector('.section-advantages');

advantages.forEach((item, index) => {
    const card = document.createElement('div');
    card.innerHTML = `
        <div class="advantage ${index % 2 === 0 ? '' : 'reverse'}">
            <img src="${item.image}" alt="card image" class="card-image"/>
            <div class="card-content">
                <div class="card-title">${item.title}</div>
                <div class="card-text">${item.description}</div>
                <a href="${item.link}">Learn More</a>
            </div>
        </div>`;
    sectionAdvantagesEl.appendChild(card);
});

let loader = document.getElementById('loader');
let container = document.getElementById('users-container');


const simulateLoading = () => {
    loader.style.display = 'flex';
    container.style.display = 'none';

    setTimeout(() => {
        loader.style.display = 'none';
        container.style.display = 'flex';
    }, 1000);
}

simulateLoading();

let mainFormUsers = document.querySelector('#main-form-users')
let addUsersButton = document.querySelector('#add-users');

addUsersButton.addEventListener('click', addUsersFunc);

function addUsersFunc() {
    mainFormUsers.style.display = 'flex';
}

document.querySelector('.close-add').addEventListener('click', () => mainFormUsers.style.display = 'none');
document.querySelector('.close-edit').addEventListener('click', () => mainFormEdit.style.display = 'none');
buttonAdd.addEventListener('click', () => mainFormUsers.style.display = 'none');

//burlywood
