import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux"

import { onMessageListener, messaging } from './firebaseInit'

export const Messaging = () => {
  const [form, setForm] = React.useState({
    name: '',
    message:''
  });
  const [messages, setMessages] = React.useState([]);
  const [requesting, setRequesting] = React.useState(false);

  const dispatch = useDispatch()

  React.useEffect(() => {
    setRequesting(true);
    axios.get('http://localhost:4000/messages')
      .then((resp) => {
      setMessages(resp.data.messages);
      setRequesting(false);
      })
      .catch((err) => {
        console.log(err)

      })
  }, []);

  // onMessageListener()
  //   .then((payload) => {
  //     const { title, body } = payload.data;
  //     console.log('got payload')
  //     dispatch({ type:'NEW_NOTIFICATION', payload: payload.data})
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     toast.error(JSON.stringify(err));
  //   });


  messaging.onMessage((payload) => {
    console.log('got payload')
    dispatch({ type:'NEW_NOTIFICATION', payload: payload.data})
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    setRequesting(true)
    axios.post('http://localhost:4000/messages', form)
      .then(res => {
        let newMessage = res.data.messages[0]
        setRequesting(false)
        setMessages([...messages, newMessage ])
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container>
      <form>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Enter your name"
            name='name'
            onChange={handleChange}
            value={form.name}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Message</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name='message'
            onChange={handleChange}
            placeholder="Enter a message"
            value={form.message}
          />
        </InputGroup>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </form>

      <div className="message-list">
        <h3>Messages</h3>

        {requesting ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <>
            {messages.map((m, index) => {
              const { name, message } = m;
              return (
                <div key={index}>
                  {name}: {message}
                </div>
              );
            })}
          </>
        )}
      </div>
    </Container>
  );
};
