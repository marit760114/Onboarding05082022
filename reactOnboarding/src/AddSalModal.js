import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddSalModal extends Component{
    constructor(props){
        super(props);
        this.state={pros:[], cuss:[], stos:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    componentDidMount(){
        fetch(process.env.REACT_APP_API+'product')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pros:data});
        });
        fetch(process.env.REACT_APP_API+'customer')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cuss:data});
        });
        fetch(process.env.REACT_APP_API+'store')
        .then(response=>response.json())
        .then(data=>{
            this.setState({stos:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'sale',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProductId:event.target.ProductId.value,
                CustomerId:event.target.CustomerId.value,
                StoreId:event.target.StoreId.value,
                DateSold:event.target.DateSold.value

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
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Sale
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                        <Form onSubmit={this.handleSubmit.bind(this)}>

                            <Form.Group controlId="ProductId">
                                <Form.Label>ProductId</Form.Label>
                                <Form.Control as="select">
                                    {this.state.pros.map(pro=>
                                    <option key={pro.ID} value={pro.ID}>{pro.Name}</option>)}
                                </Form.Control>
                            </Form.Group>

                                <Form.Group controlId="CustomerId">
                                    <Form.Label>CustomerId</Form.Label>
                                    <Form.Control as="select">
                                        {this.state.cuss.map(cus=>
                                        <option key={cus.ID} value={cus.ID}>{cus.Name}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group controlId="StoreId">
                                    <Form.Label>StoreId</Form.Label>
                                    <Form.Control as="select">
                                        {this.state.stos.map(sto=>
                                        <option key={sto.ID} value={sto.ID}>{sto.Name}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group controlId="DateSold">
                                    <Form.Label>DateSold</Form.Label>
                                    <Form.Control type="date" name="DateSold" required 
                                    placeholder="DateSold (YYYY-MM-DD)" defaultValue="2022-07-20"/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Sale
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