// Using the ES6 Classes
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
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

    showAlert(message, className){
        // creating div element
        const div = document.createElement('div');
    
        // adding className 
        div.className = `alert ${className}`;
    
        // add text 
        div.appendChild(document.createTextNode(message));
    
        // get parent 
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
    
        // insert alert
        container.insertBefore(div, form);
    
        // setting the time out
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },2000)
    }

    deleteBook(target){
        if(target.className === 'delete'){
            /*as the delete button will only delete the 
           link not the whole tr 
           so we use parentElemet twice to reach to td and to tr 
           so to delete the whole tr just traversing the DOM*/
           target.parentElement.parentElement.remove();
       }
    }

    clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

class Store {
    static getBooks(){
        let books;
        // Validation
        if(localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;
            ui.addBookToList(book);
        });
    }

    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    
    static removeBooks(isbn){
        const books = Store.getBooks();

        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        });
        localStorage.setItem('books',JSON.stringify(books));

    }
}

// add event listner in DOM
document.addEventListener('DOMContentLoaded',Store.displayBooks);

// add event listener
document.querySelector('#book-form').addEventListener('submit',function (e){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // instantiate book
    const book = new Book(title, author, isbn);

    // instantiate the UI
    const ui = new UI();
    
    // validation
    if(title ==='' || author === '' || isbn === ''){
        // show Alert
        ui.showAlert('Please fill in all the fields','error');
    }else {
        // instantiate ui
        ui.addBookToList(book);

        // add book to LS
        Store.addBooks(book);
        
        // show success msg
        ui.showAlert('Book is added to the list', 'success');

        // clear the fields
        ui.clearFields();
    }   
   
    e.preventDefault();
});

// event listenr for delete button
document.querySelector('#book-list').addEventListener('click', function(e){
    // instantiate ui
    const ui = new UI();
    ui.deleteBook(e.target);

    
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

    // show alert
    ui.showAlert('Book is Removed !!', 'success');

    e.preventDefault();
});