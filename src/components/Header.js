import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavbarText
} from 'reactstrap';
import { useHistory } from "react-router-dom";

const Header = (props) => {
    
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" light expand="md">
                <NavbarBrand href="#" onClick={(e) => { e.preventDefault(); history.push("/") }} style={{ color: "white" }}>Home</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                    </Nav>
                    <NavbarText style={{ color: "white" }}>HI, Welcome User</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;