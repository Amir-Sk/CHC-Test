import './App.css';
import {useRef, useState} from 'react';
import config from './config'
import {Button, Container, Form, FormGroup, ListGroup} from 'react-bootstrap';

const url = `http://${config.CLIENT_ARRAYS_HOST}:${config.CLIENT_ARRAYS_PORT}`

function ResultsPrinter(props){
  return props.records.map(record => <ListGroup.Item variant="info" key={record}>{record}</ListGroup.Item>)
}

function App() {
  const inputRef = useRef();
  const [result, setResult] = useState(null)
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      setValidated(true);
      send();
    }
  };

  const send = () => {
    fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: inputRef.current.value })
    })
      .then(res => res.json())
      .then(res => setResult(res))
      .catch(e => console.error(e))
  }

  return (
      <Container fluid>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <FormGroup>
            <Form.Label>Please choose a number in the range of [1, 1000]</Form.Label>
            <Form.Control  required placeholder="Please Choose a number" ref={inputRef} type="number" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a number.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">Expected result would be a reversed array that excludes your chosen number</Form.Text>
            <div><Button variant="primary" type="submit">Send to Server</Button></div>
          </FormGroup>
        </Form>
        <ListGroup>
          {result && (
              <ResultsPrinter records={result}/>
          )}
        </ListGroup>
      </Container>
  );
}

export default App;
