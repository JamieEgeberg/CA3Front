/**
 * Created by Jamie on 04-04-2017.
 */
import React, {Component} from 'react'
import {observer} from "mobx-react";
import userData from "../stores/userStore";
import bookStore from '../stores/BookStore';
import {hashHistory} from "react-router"

@observer
class BookForm extends Component {

    constructor() {
        super();
        this.state = {
            book: {
                id: -1,
                title: "",
                isbn: "",
                description: "",
            }
        };
    }

    handleChange = (event) => {
        var book = this.state.book;
        var id = event.target.id;
        if (id === "id") {
            book.id = event.target.value;
        } else if (id === "title") {
            book.title = event.target.value;
        } else if (id === "isbn") {
            book.isbn = event.target.value;
        } else if (id === "description") {
            book.description = event.target.value;
        }
        this.setState(book);
    };

    saveBook = (event) => {
        if (this.state.book.id === -1) {
            let book = this.state.book;
            delete book.id;
            bookStore.addBook(book);
        }else if(this.state.book.id > 0){
            bookStore.editBook(this.state.book);
        }
        event.preventDefault();
        hashHistory.push('/books');
    };

    render() {
        return <div>
            <h2>New Book</h2>
            <form >
                <input id="id" type="hidden" placeholder="Title" value={this.state.value}
                       onChange={this.handleChange}/><br/>
                <input id="title" type="text" placeholder="Title" value={this.state.value}
                       onChange={this.handleChange}/><br/>
                <input id="isbn" type="text" placeholder="ISBN" value={this.state.value}
                       onChange={this.handleChange}/><br/>
                <input id="description" type="text" placeholder="Description" value={this.state.value}
                       onChange={this.handleChange}/><br/>
                <button onClick={this.saveBook}>Add</button>
                <p>{JSON.stringify(this.state.book)}</p>
            </form>

        </div>
    }
}
export default BookForm;