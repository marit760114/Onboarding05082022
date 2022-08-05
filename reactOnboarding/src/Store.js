import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddStoModal} from './AddStoModal';
import {EditStoModal} from './EditStoModal';

export class Store extends Component{
    constructor(props){
        super(props);
        this.state={stos:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'store')
        .then(response=>response.json())
        .then(data=>{
            this.setState({stos:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteSto(stoid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'store/'+stoid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {stos, stoid,stoname, stoaddress}=this.state;
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
                        {stos.map(sto=>
                            <tr key={sto.ID}>
                                <td>{sto.ID}</td>
                                <td>{sto.Name}</td>
                                <td>{sto.Address}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                stoid:sto.ID,stoname:sto.Name,stoaddress:sto.Address})}>
                                                    Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteSto(sto.ID)}>
                                            Delete
                                        </Button>
                                        <EditStoModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        stoid={stoid}
                                        stoname={stoname}
                                        stoaddress={stoaddress}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Store
                    </Button>
                    <AddStoModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}