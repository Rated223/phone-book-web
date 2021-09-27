import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
} from 'react-bootstrap';
import CustomAlert from '../CustomAlert';

const Signup = () => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      setAlertMessage('Passwords do not match.');
      return;
    }

    const body = {
      firstName,
      lastName,
      username,
      email,
      password,
    };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, body);
      history.push('/');
    } catch (error) {
      if (!error) setAlertMessage('Service temporarily unavailable.');
      else setAlertMessage(error.response.data.message);
      setValidated(true);
    }
  };

  return (
    <Container className="h-100 bg-light">
      <Row className="justify-content-center">
        <Col xs="11" lg="6">
          <CustomAlert
            className="mb-0 mt-5 py-4"
            variant="danger"
            message={alertMessage}
            setMessage={setAlertMessage}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="11" lg="6">
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center my-3">Sign up</Card.Title>
              <Form
                noValidate
                validated={validated}
                className="px-4 mb-2"
                onSubmit={handleSubmit}
              >
                <FormGroup className="mb-3">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  ></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  ></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  ></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Confirm Password:</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setConfPassword(e.target.value)}
                    required
                  ></Form.Control>
                </FormGroup>
                <Row>
                  <Col></Col>
                  <Col xs="auto">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
