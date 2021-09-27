import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import CustomAlert from '../CustomAlert';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { setAuth } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertVariant, setAlertVariant] = useState('danger');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (location.state?.sucessRequestResetPassword) {
      setAlertVariant('success');
      setAlertMessage('A message has been send to your email.');
    }

    if (location.state?.sucessResetPassword) {
      setAlertVariant('success');
      setAlertMessage('Your password has been saved.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        body
      );
      localStorage.setItem('token', response.data.data.token);
      setAuth(true);
      history.push('/contacts');
    } catch (error) {
      setAlertVariant('danger');
      if (!error.response) setAlertMessage('Service temporarily unavailable.');
      else setAlertMessage(error.response.data.message);
      setValidated(true);
    }
  };

  const handleForgotPassword = () => {
    history.push('/request-reset-password');
  };

  return (
    <Container className="h-100 bg-light">
      <Row className="justify-content-center">
        <Col xs="11" lg="5">
          <CustomAlert
            className="mb-0 mt-5 py-4"
            variant={alertVariant}
            message={alertMessage}
            setMessage={setAlertMessage}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="11" lg="5">
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center my-3">Login</Card.Title>
              <Form
                noValidate
                validated={validated}
                className="px-4 mb-2"
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Row>
                  <Col className="mb-2">
                    <Button variant="link" onClick={handleForgotPassword}>
                      forgot password?
                    </Button>
                  </Col>
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

export default Login;
