import React, { Fragment } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { requestFirebaseNotificationPermission, messaging } from './firebaseInit'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { Messaging } from './Messaging';

import Modal from "./modal"

//redux stuff

import { Provider } from 'react-redux'
import store from './Redux/store'


const App = () => {

  const [shouldShow, setShouldShow] = React.useState(true)

  const handleClose = () => {
    setShouldShow(false)
  }

  React.useEffect(() => {

    const button = document.querySelector('.permission')

    if (!button) {
      console.log('do nothing')
    } else {
      button.addEventListener('click', () => {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log('start the process')
            requestFirebaseNotificationPermission()
              .then((firebaseToken) => {
                console.log(firebaseToken) //normally would send this to the db for out backend to access on the notif endpoints
              })
              .catch((err) => {
                console.log(err)
                return err;
              });
          }
        })
      })
    }

    if (Notification.permission === 'granted') {
      requestFirebaseNotificationPermission()
        .then((firebaseToken) => {
          console.log(firebaseToken) //normally would send this to the db for out backend to access on the notif endpoints
        })
        .catch((err) => {
          console.log(err)
          return err;
        });
    }

  }, [])

  return (
    <Provider store={store}>
      <Modal
        isVisible={Notification.permission !== "granted" && shouldShow}
        onClose={handleClose}
      />
      <div className="App">
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
      </div>
    </Provider>
  );
};

export default App;
