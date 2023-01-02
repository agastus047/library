let myLibrary = []; 

document.querySelector('#myForm').style.display = 'none';

let inputForm = document.querySelector('#myForm');
let titleIP, authorIP, pagesIP, readIP,newBook;
let submitButton = document.querySelector('#submit');
let container = document.querySelector(".container");

function getBookInfo() {
    titleIP = document.querySelector('#title').value;
    authorIP = document.querySelector('#author').value;
    pagesIP = document.querySelector("#pages").value;
    readIP = document.querySelector('input[name="read"]:checked').value;
    newBook = new Book(titleIP,authorIP,pagesIP,readIP);
    newBook.indexNumber = myLibrary.length;
    myLibrary.push(newBook);
    document.querySelector('#myForm').style.display= 'none';

    function displayBooks() {
        container.textContent = '';
        for(let book of myLibrary) {
            book.indexNumber = myLibrary.indexOf(book);
            let card = document.createElement('div');
            card.classList.add('card');
            container.appendChild(card);
            card.textContent = `Title: ${book.title} \r\nAuthor: ${book.author} \r\nPages: ${book.pages} \r\n${book.read}`;
            let btnRow = document.createElement('div');
            card.appendChild(btnRow);
            let dltBtn = document.createElement('button');
            dltBtn.classList.add('dltBtn');
            dltBtn.setAttribute('data-index-number',book.indexNumber);
            dltBtn.textContent = 'Delete';
            btnRow.appendChild(dltBtn);

            dltBtn.addEventListener('click', () => {
                myLibrary.splice(+dltBtn.dataset.indexNumber,1);
                displayBooks();
            });

            let readBtn = document.createElement('button');
            readBtn.classList.add('readBtn');
            readBtn.setAttribute('data-index-number',book.indexNumber);
            readBtn.textContent = 'Read?';
            btnRow.appendChild(readBtn);

            readBtn.addEventListener('click', () => {
                if(book.read === 'Read')
                    book.read = 'Not read yet';
                else
                    book.read = 'Read';
                displayBooks();
            });
        }
    }

    displayBooks();
}

inputForm.addEventListener('submit',(e)=> {
    e.preventDefault();
    getBookInfo();
});
const titleField = document.querySelector('#myForm #title');
titleField.addEventListener("blur",()=>{
    if(titleField.validity.valueMissing) {
        titleField.setCustomValidity("Please enter the title");
    }
    else {
        titleField.setCustomValidity('');
    }
    titleField.reportValidity();
});
const authorField = document.querySelector('#myForm #author');
authorField.addEventListener('blur',()=> {
    if(authorField.validity.valueMissing) {
        authorField.setCustomValidity("Please eneter the name of the author");
    }
    else {
        authorField.setCustomValidity('');
    }
    authorField.reportValidity();
});
const pagesField = document.querySelector("#myForm #pages");
pagesField.addEventListener('blur',()=> {
    if(pagesField.validity.valueMissing) {
        pagesField.setCustomValidity("Please enter the number of pages");
    }
    else {
        pagesField.setCustomValidity('');
    }
    pagesField.reportValidity();
});
let newBookButton = document.querySelector('#addBook');
newBookButton.addEventListener('click', () => {
    document.querySelector('#myForm').style.display = 'block';
});

class Book {
    constructor(title,author,pages,read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function() {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${read}.`;
        };
    }
}



