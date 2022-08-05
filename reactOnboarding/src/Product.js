import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddProModal} from './AddProModal';
import {EditProModal} from './EditProModal';

export class Product extends Component{
    constructor(props){
        super(props);
        this.state={pros:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'product')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pros:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletePro(proid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'product/'+proid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {pros, proid,proname, proprice}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pros.map(pro=>
                            <tr key={pro.ID}>
                                <td>{pro.ID}</td>
                                <td>{pro.Name}</td>
                                <td>{pro.Price}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                proid:pro.ID,proname:pro.Name,proprice:pro.Price})}>
                                                    Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deletePro(pro.ID)}>
                                            Delete
                                        </Button>
                                        <EditProModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        proid={proid}
                                        proname={proname}
                                        proprice={proprice}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Product
                    </Button>
                    <AddProModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}