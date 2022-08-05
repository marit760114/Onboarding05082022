import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddSalModal} from './AddSalModal';
import {EditSalModal} from './EditSalModal';


export class Sale extends Component{
    constructor(props){
        super(props);
        this.state={sals:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'sale')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sals:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletesal(salid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'sale/'+salid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {sals, 
            salid,
            salproductid, 
            salcustomerid, 
            salstoreid, 
            saldatesold}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ProductId</th>
                            <th>CustomerId</th>
                            <th>StoreId</th>
                            <th>DateSold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sals.map(sal=>
                            <tr key={sal.ID}>
                                <td>{sal.ID}</td>
                                <td>{sal.ProductId}</td>
                                <td>{sal.CustomerId}</td>
                                <td>{sal.StoreId}</td>
                                <td>{sal.DateSold}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                salid:sal.ID,
                                                salproductid:sal.ProductId,
                                                salcustomerid:sal.CustomerId,
                                                salstoreid:sal.StoreId,
                                                saldatesold:sal.DateSold})}>
                                                    Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deletesal(sal.ID)}>
                                            Delete
                                        </Button>
                                        <EditSalModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        salid={salid}
                                        salproductid={salproductid}
                                        salcustomerid={salcustomerid}
                                        salstoreid={salstoreid}
                                        saldatesold={saldatesold}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Sale
                    </Button>
                    <AddSalModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}