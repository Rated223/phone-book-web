import React from 'react';
import { Alert, Button, Row, Col } from 'react-bootstrap';

const CustomAlert = ({ variant, message, setMessage, ...rest }) => {
  if (message) {
    return (
      <Alert variant={variant} onClose={() => setMessage('')} {...rest}>
        <Row>
          <Col className="d-flex flex-column justify-content-center align-content-center">
            {message}
          </Col>
          <Col xs="auto">
            <Button
              onClick={() => setMessage('')}
              variant={`outline-${variant}`}
            >
              x
            </Button>
          </Col>
        </Row>
      </Alert>
    );
  }

  return <></>;
};

export default CustomAlert;
