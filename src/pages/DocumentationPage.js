/**
 * Created by Jamie on 04-04-2017.
 */
import React, {Component} from 'react'
import {observer} from "mobx-react";
import userData from "../stores/adminStore";

@observer
class DocumentationPage extends Component {
    render() {
        return (
            <div>
                <h2>Documentation</h2>
                <ul>
                    <li><a href="https://github.com/JamieEgeberg/CA3Front">CA3 Frontend</a>
                    </li>
                    <li><a href="https://github.com/JamieEgeberg/CA3Back">CA3 Backend</a></li>
                </ul>

                <h3>All Additional Documentation we find relevant</h3>

                <h4>Further Improvements that could have been done</h4>
                <ul>
                    <li>Test that new user names are unique, when adding new users since the username is the Identifier</li>
                </ul>

                <h4>Integration Test Report</h4>
                <img src="IntegrationTests.PNG" alt="Screenshot of Integration Test results"/>
                <p>As you can see above our integration tests work</p>
            </div>
        )
    }
}
export default DocumentationPage;