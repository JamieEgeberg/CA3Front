/**
 * Created by Jamie on 05-04-2017.
 */
import React, {Component} from 'react';
import {observer} from "mobx-react";
import userStore from '../stores/UserStore';
import {hashHistory} from "react-router";

@observer
class UserForm extends Component {
    componentWillMount() {
        /*
         This will fetch data each time you navigate to this route
         Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
         */
        userStore.getRoles();
    }

    constructor(props) {
        super(props);

        let user = {
            id: -1,
            userName: "",
            roles: []
        };

        if (this.props.params.id) {
            let tempUsers = userStore.users.filter((b) => Number(b.id) === Number(this.props.params.id));
            if (tempUsers.length === 1) {
                user = {
                    id: tempUsers[0].id,
                    userName: tempUsers[0].userName,
                    roles: tempUsers[0].roles
                };
                console.log(user);
            }
        }
        this.state = {
            user: user
        };
    }

    handleChange = (event) => {
        let user = this.state.user;
        let id = event.target.id;
        if (id === "id") {
            user.id = event.target.value;
        } else if (id === "userName") {
            user.userName = event.target.value;
        } else if (id === "roles") {
            user.roles = event.target.options.filter(o => o.selected).map(o => o.value);
        }
        this.setState({user: user});
    };

    saveUser = (event) => {
        if (this.state.user.id === -1) {
            let user = this.state.user;
            delete user.id;
            userStore.addUser(user);
        } else if (this.state.user.id > 0) {
            userStore.editUser(this.state.user);
        }
        event.preventDefault();
        hashHistory.push('/users');
    };

    render() {
        return <div>
            <h2>{this.props.params.id ? "Edit" : "Add"} user</h2>
            <form>
                <div className="form-group">
                    <input id="userName" type="text" placeholder="Name" className="form-control"
                           value={this.state.user.userName}
                           onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <p>Choose roles: (hold Ctrl to select more)</p>
                    <select name="roles" id="roles" multiple="multiple" className="form-control">
                        {userStore.roles.map((r, idx) => <option key={idx} value={r.roleName}>{r.roleName}</option>)}
                    </select>
                </div>
                <button onClick={this.saveUser}>save</button>
                <p>{JSON.stringify(this.state.user)}</p>
            </form>

        </div>
    }
}
export default UserForm;