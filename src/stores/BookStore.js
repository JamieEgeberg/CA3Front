//DataStore for this Demo
import mobx, {computed, observable, action, useStrict} from "mobx";

useStrict(true);
class BookStore {
    @observable _books = [];

    constructor() {
        this._books.replace([
            {
                id: 1,
                title: "How to Learn JavaScript - Vol 1",
                isbn: "1234567891234",
                description: "Study hard"
            }
            , {
                id: 2,
                title: "How to Learn ES6",
                isbn: "1234567891234",
                description: "Complete all exercises :-)"
            }
            , {
                id: 3,
                title: "How to Learn React",
                isbn: "1234567891234",
                description: "Complete all your CA's"
            }
            , {
                id: 4,
                title: "How to become a specialist in Computer Science - Vol 4",
                isbn: "1234567891234",
                description: "Don't drink beers, until Friday (after four)"
            }
        ])
    }

    @computed get bookCount() {
        return this._books.length;
    }

    @computed get books() {
        return this._books;
    }

    @action addBook(book) {
        this._books.push(book);
    }

    @action editBook(book) {
        this._books.forEach((b, i) => {
            if (b.id === book.id) this._books.splice(i, 1, book);
        });
    }

    @action deleteBook(bid) {
        let id = Number(bid);
        this._books.forEach((b, i) => {
            if (Number(b.id) === id) this._books.slice(i, 1);
        });
    }
}

export default new BookStore();

