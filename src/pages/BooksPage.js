import React, {Component} from 'react'
import {observer} from "mobx-react";
import {hashHistory} from "react-router";
import bookStore from '../stores/BookStore';

@observer
class BooksPage extends Component {

    componentWillMount() {
        /*
         This will fetch data each time you navigate to this route
         Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
         */
        bookStore.getData();
    }

    onAdd = (e) => {
        e.preventDefault();
        hashHistory.push('/books/form');
    };

    onEdit = (e) => {
        e.preventDefault();
        hashHistory.push('/books/form/' + e.currentTarget.id);
    };

    onDelete = (e) => {
        e.preventDefault();
        bookStore.deleteBook(e.currentTarget.id);
    };

    render() {
        return <div className="row">
            <div className="col-xs-12">
                <h2>Manage Books</h2>
            </div>
            <div className="col-xs-12">
                <table className=" table table-bordered table-condensed table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>ISBN</th>
                        <th>Description</th>
                        <th width={78}>
                            <button onClick={this.onAdd} className="btn btn-primary btn-sm btn-block">+</button>
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
                                    <div className="btn-group">
                                        <button id={book.id} className="btn btn-warning btn-sm"
                                                onClick={this.onEdit = this.onEdit.bind(this)}>
                                            <span className="glyphicon glyphicon-pencil"/>
                                        </button>
                                        <button id={book.id} className="btn btn-danger btn-sm"
                                                onClick={this.onDelete = this.onDelete.bind(this)}>
                                            <span className="glyphicon glyphicon-trash"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <button onClick={this.onAdd} className="btn btn-primary">Add Book</button>
            </div>
        </div>
    }
}
export default BooksPage;