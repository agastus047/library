let myLibrary = []; 

document.querySelector('#myForm').style.display = 'none';

let titleIP, authorIP, pagesIP, readIP,newBook;
let submitButton = document.querySelector('#submit');
let container = document.querySelector(".container");

function getBookInfo() {
    titleIP = document.querySelector('#title').value;
    authorIP = document.querySelector('#author').value;
    pagesIP = document.querySelector("#pages").value;
    readIP = document.querySelector('input[name="read"]:checked').value;
    newBook = new Book(titleIP,authorIP,pagesIP,readIP);
    myLibrary.push(newBook);
    document.querySelector('#myForm').style.display= 'none';
    container.textContent = '';
    for(let book of myLibrary) {
        let card = document.createElement('div');
        card.classList.add('card');
        container.appendChild(card);
        card.textContent = `Title: ${book.title} \r\nAuthor: ${book.author} \r\nPages: ${book.pages} \r\n${book.read}`;
    }  
}

submitButton.addEventListener('click',getBookInfo);

let newBookButton = document.querySelector('#addBook');
newBookButton.addEventListener('click', () => {
    document.querySelector('#myForm').style.display = 'block';
});

function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}.`;
    };
}



