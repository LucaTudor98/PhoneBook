import React, {useState, useEffect, Fragment} from 'react';
import {Table, Button, Container, Row, Col, Modal} from 'react-bootstrap';
import './PhoneBook.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PhoneBook = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');

    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editPhoneNumber, setEditPhoneNumber] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const getData = () => {
        axios.get('https://localhost:7051/api/Partner').then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleEdit = (id) => {
        handleShow();
        const url = `https://localhost:7051/api/Partner/${id}`;
        axios.get(url).then((result) => {
            setEditId(result.data.id);
            setEditName(result.data.name);
            setEditPhoneNumber(result.data.phoneNumber);
            setEditDescription(result.data.description);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this partner?") == true) {
            axios.delete(`https://localhost:7051/api/Partner/${id}`)
            .then((result) => {
                console.log(result);
                if (result.status === 200)
                {
                    toast.success('You have succesfully delete the partner.');
                    getData();
                }
            }).catch((error) => {
                toast.error(error);
                console.log(error);
            })
        }
    }

    const handleSave = () => {
        const url = `https://localhost:7051/api/Partner/`;
        const data = {
            "name": name,
            "phoneNumber": phoneNumber,
            "description": description
        }

        axios.post(url, data).then((result) => {
            getData();
            clear();
            toast.success('You have successfuly added a partner');
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleUpdate = () => {
        const url = `https://localhost:7051/api/Partner/${editId}`;
        const data = {
            "id": editId,
            "name": editName,
            "phoneNumber": editPhoneNumber,
            "description": editDescription
        }
        axios.put(url, data).then((result) => {
            getData();
            clear();
            toast.success('You have successfully updated the partner ')
            handleClose();
        })
        .catch((error) => {
            toast.error(error);
            console.log(error);
        })
    }

    const clear = () => {
        setName('');
        setPhoneNumber('');
        setDescription('');
        setEditName('');
        setEditPhoneNumber('');
        setEditDescription('');
        setEditId('');
    }

    const [data, setData] = useState();

    useEffect(() => {
        getData();
    }, []);


    return (
        <Fragment>
            <ToastContainer />
            <Container>
                <Row>
                    <Col>
                    <input type='text' 
                    className='input'
                    placeholder='Enter name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    />
                    </Col>
                    <Col>
                    <input type='text' 
                    className='input'
                    id='phoneInput'
                    placeholder='Enter phone number' 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    </Col>
                    <Col>
                    <input type='text' 
                    className='input'
                    placeholder='Enter description' 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    />
                    </Col>
                    <Col>
                    <Button variant='primary' id="submitButton" onClick={() => handleSave()}>Submit</Button>
                    </Col>
                </Row>
            </Container>
    <Table striped bordered hover variant="dark">
         <thead>
             <tr>
                 <th className='tableHead'>#</th>
                 <th className='tableHead'>Name</th>
                 <th className='tableHead'>Phone Number</th>
                 <th className='tableHead'>Description</th>
                 <th className='tableHead'>Actions</th>
             </tr>
        </thead>
        <tbody>
            {
                data && data.length > 0 ?
                data.map((item,index) => {
                    return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.description}</td>
                            <td colSpan={2}>
                                <Button id='editButton' variant='warning' onClick={() =>handleEdit(item.id)}>Edit</Button>
                                <Button id='deleteButton' variant='danger'  onClick={() => handleDelete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    )
                })
                :
                'Loading...'
            }
        </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Partner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Col>
                    <input type='text' 
                    className='editInput'
                    placeholder='Enter name' 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                    />
                    </Col>
                    <Col>
                    <input type='text' 
                    className='editInput'
                    placeholder='Enter phone number' 
                    value={editPhoneNumber} 
                    onChange={(e) => setEditPhoneNumber(e.target.value)}
                    />
                    </Col>
                    <Col>
                    <input type='text' 
                    className='editInput'
                    placeholder='Enter description' 
                    value={editDescription} 
                    onChange={(e) => setEditDescription(e.target.value)} 
                    />
                    </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}

export default PhoneBook;