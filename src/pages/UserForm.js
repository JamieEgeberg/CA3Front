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
        userStore.getData();
        userStore.getRoles();
    }

    constructor(props) {
        super(props);

        let user = {
            userName: "",
            roles: []
        };

        if (this.props.params.id) {
            let tempUsers = userStore.users.filter((b) => b.userName === this.props.params.id);
            if (tempUsers.length === 1) {
                user = {
                    userName: tempUsers[0].userName,
                    roles: tempUsers[0].roles
                };
                console.log(user);
            }
        }
        user.passwordHash = "";
        this.state = {
            edit: !!this.props.params.id,
            user: user
        };
    }

    handleChange = (event) => {
        console.log(this.state.edit);
        let user = this.state.user;
        let id = event.target.id;
        if (id === "userName") {
            user.userName = event.target.value;
        } else if (id === "password") {
            user.passwordHash = event.target.value;
        } else if (id === "roles") {
            user.roles = [].filter.call(event.target.options, o => o.selected)
                .map(o => {
                    return {roleName: o.value};
                });
        }
        this.setState({user: user});
    };

    saveUser = (event) => {
        if (!this.state.edit) {
            userStore.addUser(this.state.user);
        } else {
            userStore.editUser(this.state.user);
        }
        event.preventDefault();
        hashHistory.push('/users');
    };

    render() {
        return <div>
            <h2>{this.props.params.id ? "Edit" : "Add"} user</h2>
            <form>
                {this.state.edit ? (<h4>{this.state.user.userName}</h4>) : ""}
                {this.state.edit || (<div>
                    <div className="form-group">
                        <input id="userName" type="text" placeholder="Name"
                               className="form-control"
                               value={this.state.user.userName}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input id="password" type="password"
                               placeholder="Password"
                               className="form-control"
                               value={this.state.user.passwordHash}
                               onChange={this.handleChange}/>
                    </div>
                </div>)}
                <div className="form-group">
                    <p>Choose roles: (hold Ctrl to select more)</p>
                    <select name="roles" id="roles" multiple="multiple"
                            className="form-control"
                            onChange={this.handleChange}>
                        {userStore.roles.map((r, idx) => {
                            if (this.state.user.roles
                                    .filter(r2 => r2.roleName === r.roleName).length === 1) {
                                return <option key={idx} selected
                                               value={r.roleName}>{r.roleName}</option>;
                            } else {
                                return <option key={idx}
                                               value={r.roleName}>{r.roleName}</option>;
                            }

                        })}
                    </select>
                </div>
                <button onClick={this.saveUser}>save</button>
                <p>{JSON.stringify(this.state.user)}</p>
            </form>

        </div>
    }
}
export default UserForm;