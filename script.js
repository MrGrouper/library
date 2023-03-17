let myLibrary = [];
let tableStatus = ""
let tableStatusClass = ""

const $title = document.querySelector("#title");
const $author = document.querySelector("#author");
const $pages = document.querySelector("#pages");
const $status = document.querySelector("#status");
const $tableBody = document.querySelector("#bookTableBody")
const $emptyTable = document.querySelector("#empty")
const $form = document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    console.log($status.options[$status.selectedIndex].value)
    makeTable();
    clearForm();
});
const $tableButtons = document.querySelector("table").addEventListener('click', (e) =>{
    let currentTargetTitle = e.target.parentNode.parentNode.childNodes[1].innerText
    if (e.target.innerHTML === "Delete"){
        if(confirm(`Are you sure you want to remove ${currentTargetTitle}?`))
        deleteBook(findBook(myLibrary, currentTargetTitle))
    }
    else
    {changeStatus(findBook(myLibrary, currentTargetTitle))}

    makeTable();

})


class Book {
    constructor(title, author, pages, status){
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}
}

function addBookToLibrary() {
    const newBook = new Book($title.value, $author.value, $pages.value, $status.value);

    myLibrary.push(newBook);
}

function clearForm() {
    $title.value = "";
    $author.value = "";
    $pages.value = "";
    $status.value="";
}

function makeTable(){
    if (myLibrary.length > 0){
        $emptyTable.style.display = "none";
    }
    else{$emptyTable.style.display = "initial"}
    
    $tableBody.innerHTML = "";
    
    myLibrary.forEach(book => {
        if (book.status ==="Yes"){
            tableStatus = "Read"
            tableStatusClass = "read"
        }
        else {
            tableStatus = "Not Read"
            tableStatusClass = "notRead"
        }
        const bookData = `
        <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><button class="changeStatusBtn btn ${tableStatusClass}">${tableStatus}</td>
        <td><button class="deleteBtn btn">Delete</td>
        </tr>
        `;
        $tableBody.insertAdjacentHTML("afterbegin", bookData);
    });
    }


function changeStatus(currentBook){
    console.log(myLibrary[currentBook])
    if (myLibrary[currentBook].status ==="Yes"){
       return myLibrary[currentBook].status ="No";
    }
    if (myLibrary[currentBook].status="No"){
        return myLibrary[currentBook].status = "Yes";
    };
    console.log(myLibrary[currentBook])
}

function deleteBook(currentBook){
    myLibrary.splice(currentBook, currentBook+1)
}

function findBook(array, title){
    for (book of array)
        if (book.title === title){
            console.log (array.indexOf(book))
            return array.indexOf(book)
        }
}
