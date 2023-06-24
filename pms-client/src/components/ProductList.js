import { Button, Container, Table } from "react-bootstrap"

const ProductList = ({ products, setActiveProduct, setShowModal, deleteItem }) => {
    return (
        <Container>
            <br />
            {
                products.length ?
                    (
                        <Table bordered hover variant="secondary">
                            <thead>
                                <tr>
                                    <th className="bg-dark border-secondary text-light">Product</th>
                                    <th className="bg-dark border-secondary text-light">Description</th>
                                    <th className="bg-dark border-secondary text-light">Price</th>
                                    <th className="bg-dark border-secondary text-light">Inventory</th>
                                    <th className="bg-dark border-secondary text-light">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product, index) => {
                                        return (
                                            <tr key={index + product._id}>
                                                <td>{product.title}</td>
                                                <td>{product.desc}</td>
                                                <td>{product.price}</td>
                                                <td>{product.qty}</td>
                                                <td style={{ width: "200px" }}>
                                                    <Button 
                                                        size="sm" variant="warning"
                                                        onClick={() => {
                                                            setActiveProduct({...product});                                                            
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    &nbsp;&nbsp;
                                                    <Button 
                                                        size="sm" variant="danger"
                                                        onClick={async () => {
                                                            await alert("Are you sure you want to delete this item?")
                                                            deleteItem(product._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    ) :
                    (
                        <p>No products found!</p>
                    )
            }
        </Container>
    );
}

export default ProductList;