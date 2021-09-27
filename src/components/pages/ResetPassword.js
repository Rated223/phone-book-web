import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
} from 'react-bootstrap';
import axios from 'axios';
import CustomAlert from '../CustomAlert';

const ResetPassword = () => {
  const history = useHistory();
  const search = useLocation().search;
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [token, setToken] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const token = new URLSearchParams(search).get('token');
    if (!token) history.push('/');
    setToken(token);
  }, [history, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      setAlertMessage('Passwords do not match.');
      return;
    }

    const body = {
      password,
      token,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/reset-password`,
        body
      );

      if (response.data.success)
        history.push('/', { sucessResetPassword: true });
    } catch (error) {
      if (!error.response) setAlertMessage('Service temporarily unavailable.');
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
              <Card.Title className="text-center my-3">
                Reset password
              </Card.Title>
              <Form
                noValidate
                validated={validated}
                className="px-4 mb-2"
                onSubmit={handleSubmit}
              >
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

export default ResetPassword;
