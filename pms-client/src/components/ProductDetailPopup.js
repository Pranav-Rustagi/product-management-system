import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

const ProductDetailPopup = ({ showModal, setShowModal, saveProduct, activeProduct, setActiveProduct }) => {
    const initConfig = useMemo(() => {
        return {
            title: "",
            desc: "",
            price: "",
            qty: 1
        }
    }, []);

    const [productData, setProductData] = useState({...initConfig});

    useEffect(() => {
        if(activeProduct) {
            setProductData({...activeProduct});
        }
    }, [activeProduct]);

    const toggler = useCallback(() => {
        setShowModal(show => !show);
        setProductData({...initConfig});
        setActiveProduct(null);
    }, [setShowModal, setProductData, initConfig, setActiveProduct]);


    const changeHandler = useCallback((key, event) => {
        const value = event.target.value;
        setProductData((data) => {
            return { ...data, [key]: value }
        });
    }, [setProductData]);

    return (
        <Modal
            centered
            show={showModal}
            backdrop="static"
        >
            <Modal.Body>
                <h4>Add product details</h4>
                <br />
                <Form>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Product name"
                            autoFocus
                            value={productData.title}
                            onChange={(e) => changeHandler("title", e)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Add short description"
                            value={productData.desc}
                            onChange={(e) => changeHandler("desc", e)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            type="number"
                            placeholder="Price"
                            value={productData.price}
                            min="1"
                            onChange={(e) => changeHandler("price", e)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="number"
                            placeholder="Quantity in inventory"
                            value={productData.qty}
                            onChange={(e) => changeHandler("qty", e)}
                        />
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="px-4" onClick={toggler}>
                    Close
                </Button>
                <Button variant="success" className="px-4" onClick={async () => {
                    await saveProduct(productData);
                    toggler();
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductDetailPopup;