import { Button, Container } from "react-bootstrap"

const ActionHeader = ({ setShowModal }) => {
    return (
        <Container style={{ marginTop: "2rem" }}>
            <div className="d-flex justify-content-between">
                <h1>Product Store</h1>
                <Button
                    variant="dark" size="lg"
                    onClick={() => setShowModal(true)}
                >
                    Add product
                </Button>
            </div>
        </Container>
    );
}

export default ActionHeader;