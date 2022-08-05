import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditProModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'product',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ID:event.target.ID.value,
                Name:event.target.Name.value,
                Price:event.target.Price.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Product
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="ID">
                                    <Form.Label>prosId</Form.Label>
                                    <Form.Control type="text" 
                                        name="ID" required
                                        disabled
                                        defaultValue={this.props.proid}
                                    placeholder="Name"/>
                                </Form.Group>
                                <Form.Group controlId="Name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="Name" required 
                                        defaultValue={this.props.proname}
                                        placeholder="Name"/>
                                </Form.Group>
                                <Form.Group controlId="Price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" name="Price" required 
                                        defaultValue={this.props.proprice}
                                        placeholder="Price"/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Product
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
    
            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal>

    </div>
    )
    }

}