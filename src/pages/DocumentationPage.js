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
                <h3>Group 3</h3>
                <h5>Niki Skaarup & Jamie Egeberg</h5>
                <ul>
                    <li><a href="https://github.com/JamieEgeberg/CA3Front">CA3 Frontend</a>
                    </li>
                    <li><a href="https://github.com/JamieEgeberg/CA3Back">CA3 Backend</a></li>
                </ul>

                <h3>All Additional Documentation we find relevant</h3>

                <h4>Who did what?</h4>
                <p>This project was more or less implemented using pair programming. However Niki did focus a little
                    more on the back-end, and Jamie on the front-end.</p>

                <h4>Integration Test Report</h4>
                <img src="IntegrationTests.PNG" alt="Screenshot of Integration Test results"/>
                <p>As you can see above our integration tests all pass.</p>

                <h4>Further Improvements that could have been implemented</h4>
                <ul>
                    <li> Test that new user names are unique, when adding new users since the username is the
                        Identifier.
                    </li>
                    <li> Personalized login page.</li>
                    <li> Fix border radius on the bottom of the username field on the login page.</li>
                </ul>

                <h4>Feedback on Flow 3</h4>
                <p> A bit too eventful in the first week, but week 2 did a good job of catching us up with what we
                    actually needed to know.</p>
                <p> Week 2 was a bit heavy on the exam prep exercises, as we feel was evident to you.</p>
                <p> Using bootstrap and glyph-icons when making the edit and delete buttons in the CA 3, we encountered
                    that when clicking the icon on the button, instead of elsewhere on the button, the event.target
                    returned the icon instead of the button. Therefore it would have been nice to have known about
                    event.currentTarget which returns the element that the listener is assigned to.</p>
                <p> React is fun when you get in to it :) </p>

                <h4>Feedback on CA 3</h4>
                <p> Part 3) is a bit unclear, when telling you to move the BookStore class. From where?
                    and the link in this part points to a slide rather than an actual project. </p>
                <p> The 'light' version was a good start, and could definitely be expanded further for the next time the
                    course is held.</p>


            </div>
        )
    }
}
export default DocumentationPage;