/**
 * Created by Jamie on 04-04-2017.
 */
import React, {Component} from 'react'
import {observer} from "mobx-react";
import userData from "../stores/userStore";

@ observer
class CompanyPage extends Component {

    componentWillMount() {
        /*
         This will fetch data each time you navigate to this route
         Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
         */
        userData.getData();
    }

    render() {
        return (
            <div>
                this is a company.
            </div>
        )
    }
}
export default CompanyPage;