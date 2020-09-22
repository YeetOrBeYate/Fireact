import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import { toast } from "react-toastify";

export const Messaging = () => {
  const [form, setForm] = React.useState({
    name: '',
    message:''
  });
  const [messages, setMessages] = React.useState([]);
  const [requesting, setRequesting] = React.useState(false);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // axios.post('http://localhost:4000/messages', form)
    //   .then(res => {
    //   console.log(res.data)
    // })
    console.log('wha tim', form)
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
