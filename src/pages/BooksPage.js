import React, {Component} from 'react'
import {observer} from "mobx-react";
import userData from "../stores/userStore";
import bookStore from '../stores/BookStore';

@observer
class BooksPage extends Component {

    componentWillMount() {
        /*
         This will fetch data each time you navigate to this route
         Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
         */
        userData.getData();
    }

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
                <input id="title" type="text" placeholder="Title" value={this.state.value}
                       onChange={this.handleChange}/><br/>
                <input id="info" type="text" placeholder="Info" value={this.state.value}
                       onChange={this.handleChange}/><br/>
                <input id="moreInfo" type="text" placeholder="More" value={this.state.value}
                       onChange={this.handleChange}/><br/>
                <button onClick={this.saveBook}>Add</button>
                <p>{JSON.stringify(this.state.book)}</p>
            </form>

        </div>
    }
}
export default BooksPage;