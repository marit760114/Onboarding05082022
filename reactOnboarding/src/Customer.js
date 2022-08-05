import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCusModal} from './AddCusModal';
import {EditCusModal} from './EditCusModal';

export class Customer extends Component{

    constructor(props){
        super(props);
        this.state={cuss:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'customer')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cuss:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteCus(cusid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'customer/'+cusid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {cuss, cusid,cusname, cusaddress}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cuss.map(cus=>
                            <tr key={cus.ID}>
                                <td>{cus.ID}</td>
                                <td>{cus.Name}</td>
                                <td>{cus.Address}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                cusid:cus.ID,cusname:cus.Name,cusaddress:cus.Address})}>
                                                    Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteCus(cus.ID)}>
                                            Delete
                                        </Button>
                                        <EditCusModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        cusid={cusid}
                                        cusname={cusname}
                                        cusaddress={cusaddress}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Customer
                    </Button>
                    <AddCusModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}