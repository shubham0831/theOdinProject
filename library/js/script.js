/*
Things done so far :
    Input is taken from form already, and new book is added to the library
    Add and Remove from library is done

TODO:
    When user clicks on the book, show pop up screen with all the info about the book and let user change read status

    Add sorting functionality

    Improve design of the SideBar

    Implement save to cloud or save to local or dummy(if neither options are selected)

    Improve design
*/
class Book {
    constructor(id, name, author, pages, read) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor(){
        this.shelf = [];
        this.bookCount = this.shelf.length;
        this.id = 0;
    }

    addBook (name, author, pages, read) {
        // console.log(this.bookCount);
        let book = new Book(this.id, name, author, pages, read);
        //console.log(book.author); 
        this.shelf.push(book);
        this.bookCount = this.shelf.length; //need to update book count after 
        // console.log(this.bookCount);
        this.id += 1;      
    }

    removeBook(idNum){
        if (idNum > this.id){
            console.log("Element doesnt exist in Library");
            return "Element doesnt exist in Library";
        }
        this.shelf.splice(idNum, 1); //removing book with particular id
        this.bookCount = this.shelf.length; //updating bookCount
        //changing id of every book after id = N, where N is the id of the book that was deleted
        for (let i = idNum; i<this.bookCount; i++){
            this.shelf[i].id = i;
        }
        //updating id, so that we do not end up skipping an id
        this.id -= 1;
    }

    showBookDetails (idNum) {
        //func takes in an id number and returns and array of the book details

        //todo : find better way to loop over all properties of the book class
        let bookTBDisplay = this.shelf[idNum];
        let bookDetails = {
            name : bookTBDisplay.name,
            author : bookTBDisplay.author,
            page : bookTBDisplay.pages,
            read : bookTBDisplay.read,
        }
        return bookDetails;
    }

    getShelf(){
        return this.shelf;
    }

    getLastBook (){
        //function that returns that last book in the shelf
        //since id is created in the library class, to get access to the id we need this to get the id of the last added book
        return this.shelf[this.shelf.length - 1];
    }
}
function showForm(addButton){
    addButton.addEventListener('click', () => {
        form.reset();
        popup.classList.add('popupContainerActivated');
        overlay.classList.add("overlay--active");
    })
}

function closePopup() {
    popup.classList.remove("popupContainerActivated");
    overlay.classList.remove("overlay--active");
}

function getBookContainer(id, name){
    let bookContainer = document.createElement('div');
    bookContainer.className = 'bookContainer';
    let bookId = 'b'+id;
    bookContainer.id = bookId;

    let deleteBookContainer = document.createElement('div');
    deleteBookContainer.className = 'deleteBookContainer';

    let infoText = document.createElement('h3');
    infoText.textContent = 'Click Book for Info';
    infoText.className = 'showBookInfo';
    deleteBookContainer.appendChild(infoText);

    let deleteButton = document.createElement('button');
    let delId = 'd'+id;
    deleteButton.className = 'deleteBookButton';
    deleteButton.id = delId;
    deleteButton.type = 'close';
    deleteButton.innerText = 'Del';
    deleteBook(deleteButton) //adding delete button functionality over here itself
    
    deleteBookContainer.appendChild(deleteButton);
    bookContainer.appendChild(deleteBookContainer);

    let book = document.createElement('div');
    book.className = 'book'
    book.innerText = name;
    
    bookContainer.appendChild(book);
    return bookContainer;
}

function createBook (event){
    event.preventDefault();
    //console.log(event)
    let bookName = authorName = pageNumber = '';
    let bookRead = false;

    for (let i = 0; i< form.length-1; i++){ //form.length-1 because the final element in the form is the submit button which will have an undefined value
        // console.log(form.elements[i], form.elements[i].value);
        if(form.elements[i].id == 'bookName'){
            bookName = form.elements[i].value;
        }
        else if (form.elements[i].id == 'authorName'){
            authorName = form.elements[i].value;
        }
        else if (form.elements[i].id == 'pageNumber'){
            pageNumber = form.elements[i].value;
        }

        if (document.getElementById('isRead').checked == true){
            bookRead = true;
        }
    }
    closePopup();

    library.addBook(bookName, authorName, pageNumber, bookRead);
    // library.showBookDetails()
    let book = library.getLastBook(); //the book that was just added in the library. Will be used to get the id of the book.

    let bookContainer = getBookContainer(book.id, bookName);

    let addBookContainer = document.querySelector('.addNewBookContainer');
    const shelf = document.querySelector('.shelf');
    shelf.insertBefore(bookContainer, addBookContainer);    

}

function deleteBook(button){
    button.addEventListener('click', () => {
        let bookId = button.id;
        bookId = Number(bookId.substring(1,)) //we need the number after the first character
        library.removeBook(bookId);
        // let shelf = library.getShelf(); //contains updated list all the book in the library
        let bookDivID = 'b'+bookId;
        //console.log(bookDivID)
        let elToBeDeleted = document.getElementById(bookDivID);
        bookShelf.removeChild(elToBeDeleted);

        //console.log(`bookId is ${bookId} and lib id is ${library.id}`);
        for (let i = bookId+1; i<library.id ; i++){
            let newIdNum = i-1;
            let bookIdToBeChanged = document.getElementById('b'+i);
            let delIdToBeChanged = document.getElementById('d'+i);
            bookIdToBeChanged.id = 'b'+newIdNum;
            delIdToBeChanged.id = 'd'+newIdNum;

        }
    })
}

function showBookProp(button){
    button.addEventListener('hover',() => {
        //do something, see if we can get the pressing effect
        let aaaaaaaaaa = 11;
    })
    button.addEventListener('click', () => {
        let bookId = button.parentNode.id;
        bookId = Number(bookId.substring(1,));
        let bookInfo = library.showBookDetails(bookId)
        console.log(bookInfo);
        /*
            Continue from here
            We have the book info now of the given ID. Use it show 
            the book details in the popup

            Do similarly to how we did the popup form
                -> write html and css for the pop up and before and after class
                -> fill details in it using the bookInfo we have
                -> for Read do something like (design):
                    Read : true  changeStatus

                    where changeStatus is the button which will change the status of the read field
                    if button is pressed {
                        library.shelf[i].read = !library.shelf[i].read
                    }
                    essentially read = !read  

        */

    })
}

function addButtonFunctionality(){
    addButtons.forEach(showForm); //clicking on these buttons will show the form

    //clicking on the overlay or escape button will hide the form
    overlay.addEventListener("click", closePopup);
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closePopup();
    });

    form.addEventListener("submit", createBook); //if user presses the submit button

    /*
    functionality which lets user press the enter button to submit the form. TODO
    window.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && popup.classList.contains('popupContainerActivated')){
            doSomething()
        } 
    });
    */

    deleteButton.forEach(deleteBook) //this is just as to showcase an example, can remove if we remove all the pre inserted books
    bookDivs.forEach(showBookProp);
}

const library = new Library();
library.addBook(1,2,3,true);
library.addBook(4,5,6,true);
library.addBook(7,8,9,true);
library.addBook(10,11,12,false);
library.addBook(13,14,15,false);

const bookShelf = document.querySelector('.shelf')
const addButtons = document.querySelectorAll('.addBooksButton');
const popup = document.querySelector('.popupContainer');
const overlay = document.querySelector(".js-overlay");
const form = document.querySelector(".bookInfoForm");
const formSubmitButton = document.querySelector('#submitButton');

const deleteButton = document.querySelectorAll('.deleteBookButton');
const bookDivs = document.querySelectorAll('.book')


//console.log(delButton.parentNode.parentNode.id) //could have used this to get id of book, but instead will just assign each del its own id

//bookShelf.removeChild(document.getElementById('b200'))
addButtonFunctionality();






