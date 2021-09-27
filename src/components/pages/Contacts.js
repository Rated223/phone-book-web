import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import ContactModal from '../ContactModal';
import CustomAlert from '../CustomAlert';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalContact, setModalContact] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/contacts`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setContacts(response.data.data.contacts);
      } catch (error) {
        if (!error.response)
          setAlertMessage('Service temporarily unavailable.');
        else setAlertMessage(error.response.data.message);
      }
    })();
  }, [token]);

  const handleSaveContact = () => {
    setModalContact({});
    setModalType('Create');
    setShowModal(true);
  };

  const handleUpdateContact = (contact) => {
    setModalContact(contact);
    setModalType('Update');
    setShowModal(true);
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/contacts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 204)
        setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      if (!error.response) setAlertMessage('Service temporarily unavailable.');
      else setAlertMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <CustomAlert
              className="mb-0 mt-5 py-4"
              variant="danger"
              message={alertMessage}
              setMessage={setAlertMessage}
            />
          </Col>
        </Row>
        <Row>
          <Col className=" d-flex justify-content-end mt-3">
            <Button variant="success" onClick={handleSaveContact}>
              Save Contact
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Phone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.id}</td>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.phone}</td>
                    <td className="d-flex justify-content-end">
                      <Button
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => handleUpdateContact(contact)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <ContactModal
        show={showModal}
        type={modalType}
        setShow={setShowModal}
        modalContact={modalContact}
        contacts={contacts}
        setContacts={setContacts}
      />
    </>
  );
};

export default Contacts;
