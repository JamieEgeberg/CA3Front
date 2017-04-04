import React, {Component} from 'react'
import {observer} from "mobx-react";

import {hashHistory} from "react-router"
import userData from "../stores/userStore";
import bookStore from '../stores/BookStore';

@observer
class BooksPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book: {
                title: "",
                info: "",
                moreInfo: "",
            }
        };
    }


    onAdd = (e) => {
        e.preventDefault();
        hashHistory.push('/books/form');
    };

    onEdit = (e) => {
        e.preventDefault();
        hashHistory.push('/books/form/' + e.target.id);
    };

    onDelete = (e) => {
        e.preventDefault();
        bookStore.deleteBook(e.target.id);
    };

    render() {
        return <div>
            <h2>New Book</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Description</th>
                    <th>
                        <button onClick={this.onAdd}>+</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {bookStore.books.map((book, idx) => {
                    return (<tr key={idx}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.isbn}</td>
                            <td>{book.description}</td>
                            <td>
                                <button id={book.id}
                                        onClick={this.onEdit = this.onEdit.bind(this)}>
                                    edit
                                </button>
                                <button id={book.id}
                                        onClick={this.onDelete = this.onDelete.bind(this)}>
                                    delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <button onClick={this.onAdd}>Add Book</button>
        </div>
    }
}
export default BooksPage;