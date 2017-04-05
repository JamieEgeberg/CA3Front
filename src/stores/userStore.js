import {computed, observable, action} from "mobx";
import fetchHelper from "./fetchHelpers"
const URL = require("../../package.json").serverURL;


class UserStore {
    @observable messageFromServer = "";
    @observable errorMessage = "";
    @observable _users = [];

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
        let errorCode = 200;
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/footballclubs", options)
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
                    this._users = res;
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }

    @computed get userCount() {
        return this._users.length;
    }

    @computed get users() {
        return this._users;
    }

    @action addUser(user) {
        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        let options = fetchHelper.makeOptions("POST", true);

        options.body = JSON.stringify(user);
        fetch(URL + "api/user", options)
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
                    this._users.push(res);
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })

    }
}

let userStore = new UserStore();

//Only for debugging
//window.userStore = userStore;
export default userStore;
