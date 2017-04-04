//DataStore for this Demo
import mobx, {computed, observable, action, useStrict} from "mobx";

useStrict(true);
class BookStore {
    @observable _books = [];

    constructor() {
        this._books.replace([
            {
                title: "How to Learn JavaScript - Vol 1",
                info: "Study hard"
            }
            , {
            title: "How to Learn ES6",
                info: "Complete all exercises :-)"
            }
            , {
                title: "How to Learn React",
                info: "Complete all your CA's",
                moreInfo: ""
            }
            , {
                title: "How to become a specialist in Computer Science - Vol 4",
                info: "Don't drink beers, until Friday (after four)",
                moreInfo: "5 Points = 5 beers ;-)"
            }
        ])
    }

    @computed get bookCount() {
        return this._books.length;
    }

    @computed get books() {
        return this._books;
    }

    @action addBook(book){
        this._books.push(book);
    }

    @action editBook(book,i){
        this._books[i]=(book);
    }
}

export default new BookStore();

