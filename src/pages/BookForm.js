/**
 * Created by Jamie on 04-04-2017.
 */
import React, {Component} from 'react';
import {observer} from "mobx-react";
import bookStore from '../stores/BookStore';
import {hashHistory} from "react-router";


@observer
class BookForm extends Component {

    constructor(props) {
        super(props);

        let book = {
            id: -1,
            title: "",
            isbn: "",
            description: "",
        };
        if (this.props.params.id) {
            let tempBooks = bookStore.books.filter((b) => Number(b.id) === Number(this.props.params.id));
            if (tempBooks.length === 1) {
                book = {
                    id: tempBooks[0].id,
                    title: tempBooks[0].title,
                    isbn: tempBooks[0].isbn,
                    description: tempBooks[0].description,
                };
                console.log(book);
            }
        }
        this.state = {
            book: book
        };
    }

    handleChange = (event) => {
        let book = this.state.book;
        let id = event.target.id;
        if (id === "id") {
            book.id = event.target.value;
        } else if (id === "title") {
            book.title = event.target.value;
        } else if (id === "isbn") {
            book.isbn = event.target.value;
        } else if (id === "description") {
            book.description = event.target.value;
        }
        this.setState({book: book});
    };

    saveBook = (event) => {
        if (this.state.book.id === -1) {
            let book = this.state.book;
            delete book.id;
            bookStore.addBook(book);
        } else if (this.state.book.id > 0) {
            bookStore.editBook(this.state.book);
        }
        event.preventDefault();
        hashHistory.push('/books');
    };

    render() {
        return <div>
            <h2>{this.props.params.id ? "Edit" : "Add"} book</h2>
            <form>
                <div className="form-group">
                    <input id="id" type="hidden" placeholder="Title"
                           value={this.state.book.id} className="form-control"
                           onChange={this.handleChange}/></div>
                <div className="form-group">
                    <input id="title" type="text" placeholder="Title"
                           value={this.state.book.title}
                           className="form-control"
                           onChange={this.handleChange}/></div>
                <div className="form-group">
                    <input id="isbn" type="text" placeholder="ISBN"
                           value={this.state.book.isbn} className="form-control"
                           onChange={this.handleChange} maxLength="13"/></div>
                <div className="form-group">
                    <input id="description" type="text"
                           placeholder="Description"
                           value={this.state.book.description}
                           className="form-control"
                           onChange={this.handleChange}/></div>
                <button onClick={this.saveBook}>save</button>
                <p>{JSON.stringify(this.state.book)}</p>
            </form>
        </div>
    }
}
export default BookForm;