import React, {Component} from 'react'
import {observer} from "mobx-react";
import userStore from "../stores/UserStore";
import {hashHistory} from "react-router";

@observer
class UsersPage extends Component {

    componentWillMount() {
        /*
         This will fetch data each time you navigate to this route
         Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
         */
        userStore.getData();
        userStore.getRoles();
    }

    onAdd = (e) => {
        e.preventDefault();
        hashHistory.push('/users/form');
    };

    onEdit = (e) => {
        e.preventDefault();
        hashHistory.push('/users/form/' + e.currentTarget.id);
    };

    onDelete = (e) => {
        e.preventDefault();
        userStore.deleteUser(e.currentTarget.id);
    };

    render() {
        return (<div className="row">
                <div className="col-xs-12">
                    <h2>Manage Users</h2>
                    Current users: {userStore.userCount}
                </div>
                <div className="col-xs-12">
                    <table
                        className=" table table-bordered table-condensed table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roles</th>
                            <th width={78}>
                                <button onClick={this.onAdd}
                                        className="btn btn-primary btn-sm btn-block">
                                    +
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {userStore.users.map((user, idx) => {
                            return (<tr key={idx}>
                                    <td>{user.userName}</td>
                                    <td>{user.roles.map((r, idx) => {
                                        if(idx < user.roles.length - 1)
                                            return r.roleName + ", ";
                                        else return r.roleName;
                                    })}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button id={user.userName}
                                                    type="button"
                                                    className="btn btn-warning btn-sm"
                                                    onClick={this.onEdit = this.onEdit.bind(this)}>
                                                <span
                                                    className="glyphicon glyphicon-pencil"> </span>
                                            </button>
                                            <button id={user.userName}
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={this.onDelete = this.onDelete.bind(this)}>
                                                <span
                                                    className="glyphicon glyphicon-trash"> </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <button onClick={this.onAdd} className="btn btn-primary">Add
                        User
                    </button>
                </div>
            </div>
        )
    }

}
export default UsersPage;