/**
 * Created by Jamie on 04-04-2017.
 */
import React, {Component} from 'react'
import {observer} from "mobx-react";
import userData from "../stores/userStore";

@ observer
class CompanyPage extends Component {


    render() {
        return (
            <div>
                this is a company.
            </div>
        )
    }
}
export default CompanyPage;