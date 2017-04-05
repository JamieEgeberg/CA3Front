import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Link} from "react-router";
import bookStore from '../stores/BookStore';

@ observer
class ProductsPage extends Component {

        render() {
        return <div>
            <h2>Our Products</h2>
            <h4>All our great books </h4>
            <ul>
                {bookStore.books.map((book, index) => <li key={index}>
                    {book.title} <Link to={`products/details/${index}`}>(details)</Link></li>)}
            </ul>
        </div>

    }
}
export default ProductsPage;