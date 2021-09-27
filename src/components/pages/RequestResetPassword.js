import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import CustomAlert from '../CustomAlert';

const RequestResetPassword = () => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset-password`,
        body
      );

      if (response.data.success)
        history.push('/', { sucessRequestResetPassword: true });
    } catch (error) {
      if (!error.response) setAlertMessage('Service temporarily unavailable.');
      else setAlertMessage(error.response.data.message);
      setValidated(true);
    }
  };

  return (
    <Container className="h-100 bg-light">
      <Row className="justify-content-center">
        <Col xs="11" lg="5">
          <CustomAlert
            className="mb-0 mt-5 py-4"
            variant="danger"
            message={alertMessage}
            setMessage={setAlertMessage}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="11" lg="5">
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center my-3">
                Reset Password
              </Card.Title>
              <Form
                noValidate
                validated={validated}
                className="px-4 mb-2"
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
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

export default RequestResetPassword;
