import React, { Fragment } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { requestFirebaseNotificationPermission } from './firebaseInit'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { Messaging } from './Messaging';


const App = () => {

  React.useEffect(() => {
    requestFirebaseNotificationPermission()
      .then((firebaseToken) => {
        // eslint-disable-next-line no-console
        console.log('got token')
      })
      .catch((err) => {
        console.log(err)
        return err;
      });
  })

  return (
    <Fragment>
      <ToastContainer autoClose={2000} position="top-center" />
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Firebase notifictations with React and Express</Navbar.Brand>
      </Navbar>

      <Container className="center-column">
        <Row>
          <Col>
            <Messaging />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default App;
