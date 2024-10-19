import React from "react";
import { Container } from "react-bootstrap";

const AuthFooter = () => {
    return (
        <React.Fragment>
            <footer className="bg-light border-top py-2 fixed-bottom">
                <Container>
                    
                    A Complete ERP solution for office works. Designed & Development by... &nbsp;
                    <i>&copy; 2024 - Erp Team</i>
                </Container>
            </footer>
        </React.Fragment>
    );
}

export default AuthFooter;