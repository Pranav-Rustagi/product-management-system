import { Container, Navbar } from "react-bootstrap";

const NavigationBar = () => {
    return (
        <Navbar bg="dark" >
            <Container>
                <Navbar.Brand className='text-light d-flex align-items-center'>
                    <img src={`${process.env.PUBLIC_URL}/logo192.png`} height="45" alt='logo-pms' style={{ marginBottom: "5px" }} />
                    &nbsp; &nbsp;
                    <h3>Product Management System</h3>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;