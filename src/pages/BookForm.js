/**
 * Created by Jamie on 04-04-2017.
 */
import React, {Component} from 'react'
import {observer} from "mobx-react";
import userData from "../stores/userStore";
import bookStore from '../stores/BookStore';

@observer
class BookForm extends Component {

    constructor() {
        super();
        this.state = {
            book: {
                title: "",
                info: "",
                moreInfo: "",
            }
        };
    }

    handleChange = (event) => {
        var book = this.state.book;
        var id = event.target.id;
        if (id === "title") {
            book.title = event.target.value;
        } else if (id === "info") {
            book.info = event.target.value;
        } else if (id === "moreInfo") {
            book.moreInfo = event.target.value;
        }
        this.setState(book);
    };

    saveBook = (event) => {
        bookStore.addBook(this.state.book);
        event.preventDefault();
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