import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import CustomAlert from './CustomAlert';

const ContactModal = ({
  show = false,
  type = 'Create',
  setShow,
  modalContact = {},
  contacts,
  setContacts,
}) => {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [verb, setVerb] = useState('post');

  useEffect(() => {
    setFirstName(modalContact.firstName || '');
    setLastName(modalContact.lastName || '');
    setPhone(modalContact.phone || '');
  }, [modalContact]);

  useEffect(() => {
    if (type === 'Create') setVerb('post');
    else setVerb('put');
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      firstName,
      lastName,
      phone,
    };
    const token = localStorage.getItem('token');

    try {
      const editRoute = verb === 'put' ? `/${modalContact.id}` : '';
      const response = await axios[verb](
        `${process.env.REACT_APP_API_URL}/contacts${editRoute}`,
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const newContact = response.data.data.contact;

        if (verb === 'put') {
          setContacts(
            contacts.map((contact) =>
              contact.id !== newContact.id ? contact : newContact
            )
          );
        } else {
          setContacts([...contacts, newContact]);
        }

        setValidated(false);
        setAlertMessage('');
        setShow(false);
      }
    } catch (error) {
      if (!error.response) setAlertMessage('Service temporarily unavailable.');
      else setAlertMessage(error.response.data.message);
      setValidated(true);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setValidated(false);
    setAlertMessage('');
    setShow(false);
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{type} contact</Modal.Title>
      </Modal.Header>
      <Form
        noValidate
        validated={validated}
        className="px-4 mb-2"
        onSubmit={handleSubmit}
      >
        <Modal.Body>
          <CustomAlert
            className="mb-4 py-3"
            variant="danger"
            message={alertMessage}
            setMessage={setAlertMessage}
          />
          <Form.Group className="mb-3">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              required
              value={firstName}
            ></Form.Control>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              required
              value={lastName}
            ></Form.Control>
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              required
              value={phone}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ContactModal;
