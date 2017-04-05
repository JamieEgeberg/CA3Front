//DataStore for this Demo
import {computed, observable, action, useStrict} from "mobx";
import fetchHelper from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

useStrict(true);
class BookStore {
    @observable _books = [];
    @observable messageFromServer = "";
    @observable errorMessage = "";

    constructor() {
        this.getData();
    }

    @action
    setErrorMessage = (err) => {
        this.errorMessage = err;
    };

    @action
    getData = () => {
        this.errorMessage = "";
        this.messageFromServer = "";
        this._books = [];
        let errorCode = 200;
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/book", options)
            .then((res) => {
                if (res.status > 210 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then(action((res) => {  //Note the action wrapper to allow for useStrict
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    this._books = res;
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    };

    @computed get bookCount() {
        return this._books.length;
    }

    @computed get books() {
        return this._books;
    }

    @action addBook(book) {
        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        let options = fetchHelper.makeOptions("POST", true);

        options.body = JSON.stringify(book);
        fetch(URL + "api/book", options)
            .then((res) => {
                if (res.status > 210 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then(action((res) => {  //Note the action wrapper to allow for useStrict
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    console.log(res);
                    this._books.push(res);
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })

    }

    @action editBook(book) {
        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        let options = fetchHelper.makeOptions("PUT", true);
        options.body = JSON.stringify(book);
        fetch(URL + "api/book", options)
            .then((res) => {
                if (res.status > 210 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then(action((res) => {  //Note the action wrapper to allow for useStrict
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    console.log(res);
                    this._books.forEach(action((b, i) => {
                        if (b.id === res.id) {
                            this._books.splice(i, 1, res);
                        }
                    }));
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        });
    }

    @action deleteBook(bid) {
        let id = Number(bid);

        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        let options = fetchHelper.makeOptions("DELETE", true);

        let t = {};
        this._books.forEach(action((b, i) => {
            if (Number(b.id) === id) {
                t = {book: b, idx: i};
            }
        }));

        fetch(URL + "api/book/" + t.book.id, options)
            .then((res) => {
                if (res.status > 210 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then(action((res) => {  //Note the action wrapper to allow for useStrict
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    console.log(res);
                    this._books.splice(t.idx, 1);
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        });
    }
}

export default new BookStore();

