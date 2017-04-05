/**
 * Created by Jamie on 05-04-2017.
 */
import React, {Component} from 'react';
import {observer} from "mobx-react";
import userStore from '../stores/UserStore';
import {hashHistory} from "react-router";


@observer
class UserForm extends Component {

    constructor(props) {
        super(props);

        let user = {
            id: -1,
            name: "",
            roles: []
        };
        if (this.props.params.id) {
            let tempUsers = userStore.users.filter((b) => Number(b.id) === Number(this.props.params.id));
            if (tempUsers.length === 1) {
                user = {
                    id: tempUsers[0].id,
                    name: tempUsers[0].name,
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
        } else if (id === "name") {
            user.name = event.target.value;
        } else if (id === "roles") {
            user.roles = event.target.value;
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
                <input id="id" type="hidden"
                       value={this.state.user.id}
                       onChange={this.handleChange}/><br/>
                <input id="name" type="text" placeholder="Name"
                       value={this.state.user.name}
                       onChange={this.handleChange}/><br/>
                <select name="roles" id="roles">
                    {userStore.roles.map((r) => <option value={r.roleName}>{r.roleName}</option>)}
                </select>
                <input id="roles" type="text" placeholder="Roles"
                       value={this.state.user.roles}
                       onChange={this.handleChange}/><br/>
                <button onClick={this.saveUser}>save</button>
                <p>{JSON.stringify(this.state.user)}</p>
            </form>

        </div>
    }
}
export default new UserForm();