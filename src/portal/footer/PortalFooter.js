import React from "react";
import { Container } from "react-bootstrap";

const PortalFooter = () => {
    return (
        <React.Fragment>
            <footer className="py-1" expand="lg" style={{width:"auto" ,marginTop:'auto', marginRight:'auto', marginLeft:'auto', backgroundColor:'#fffff'}}>
                <Container style={{color:'Blue'}}>
                A Complete ERP solution for office works. Designed & Development by... &nbsp;
                <i>&copy; 2024 - Erp Team</i>
                </Container>
            </footer>
        </React.Fragment>
    );
}

export default PortalFooter;