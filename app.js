// book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// creating UI cunstructor 
function UI() {}

// add book to list
UI.prototype.addBookToList = function(book){
    const list = document.querySelector('#book-list');
    // create a tr element
    const row = document.createElement('tr');
    
    // insert coloums 
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        
    `;

    // append to list
    list.appendChild(row);
}

// clear fields
UI.prototype.clearFields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';

}

// add event listener
document.querySelector('#book-form').addEventListener('submit',function (e){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // instantiate book
    const book = new Book(title, author, isbn);
    
    // instantiate ui
    const ui = new UI();
    ui.addBookToList(book);
    
    // clear the fields
    ui.clearFields();

    e.preventDefault();
});