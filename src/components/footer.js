import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem } from 'react-bootstrap';

function footer() {


    return (
        <div>
            <footer class="footer">
                <div>
                    <a href="Airsoft Market">AM</a>
                    <span>&copy; 2020 LVDevelopment.</span>
                </div>
                <div class="ml-auto">
                    <span>Powered by React</span>
                </div>
                <div>
                <a href="/About">About Us</a>
                </div>

            </footer>
        </div>
    )

}

export default footer;