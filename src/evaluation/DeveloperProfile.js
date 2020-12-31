import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import {
  Modal,  
  Button,
  Image,
  Row,
  Col,
  Accordion,
  Card,
  Form,
  Container,
  ListGroup,
} from "react-bootstrap";


function DevProf(props) {

  const [evals, setEvals] = useState([]);

  //Acceso a todas las evaluaciones de desarrollador seleccionado
  useEffect(() => {
    Axios
    .get("http://localhost:4000/evaluation/" + props.email)
    .then((res) => setEvals(res.data));
  }, []);

  //Acceso a promedio de sus evaluaciones
  const [sum, setSum] = useState([]);
  useEffect(() => {
    Axios.get(
      "http://localhost:4000/evaluation/sum/" + props.email
    ).then((res) => setSum(res.data));
  }, []);

  //Acceso a datos del desarrollador
  const [devs, setDevs] = useState([]);
  useEffect(() => {
    Axios.get(
      "http://localhost:4000/developer/by_mail/" + props.email
    ).then((res) => setDevs(res.data));
  }, []);

  //Manejo de Popup
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Manejo de POST request dentro del Popup
  const [score, setScore] = useState("");
  const handleScore = (e) => setScore(e.target.value);

  const [comment, setComment] = useState("");
  const handleComment = (e) => setComment(e.target.value);

  const handleSubmit = (e) => {
    Axios.post("http://localhost:4000/evaluation/create", {
      email: props.email,
      score: score,
      comment: comment,
      creationDate: new Date()
    }).then((res) => console.log(res.data));
    setShow(false);
  };

  return (
    <Container fluid>
      <br></br>
      <Card>
          <div class = "p-3 bg-info text-white text-center border">
            <b> <h5> Información del Desarrollador </h5></b>
          </div>
      </Card>
      <Card>
        <Row>
          <Col>
          <Row>
            <Container fluid>
              <Card>
              <Image
                  height="150"
                  width="150"
                  xs
                  src="data:image/jpeg;base64,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"
                  responsive
                  roundedCircle
              />
              </Card>
            </Container>
          </Row>

          </Col>  

          <Col xs={6}>
            <Row>
              <Container fluid>
                <ListGroup>
                  <ListGroup.Item> <b>Nombre: </b> {devs.name} </ListGroup.Item>
                  <ListGroup.Item><b> Correo Electrónico: </b> {devs.email}</ListGroup.Item>
                  <ListGroup.Item><b> Tools: </b> {devs.tools}</ListGroup.Item>
                  <ListGroup.Item><b> Comment: </b> {devs.comments}</ListGroup.Item>
                </ListGroup>
              </Container>
            </Row>
          
          </Col>

          <Col>
            <Row>
              <Container fluid >
                <Card>
                  <Card.Header>
                    Puntuación Promedio:
                  </Card.Header>
                  <Card.Body>
                    <h1 class="text-center"> {sum.total} </h1>
                  </Card.Body>
                </Card>

                <Button variant="primary" onClick={handleShow}>
                  Crear nueva Evaluación
                </Button>
  
                <Modal pill show={show} onHide={handleClose} centered size = "sm">

                  <Form>
                    <Form.Group>
                      <Form.Label>Puntuación</Form.Label>
                      <Form.Control onChange={handleScore} type="integer" placeholder="0 - 100" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Comentario</Form.Label>
                      <Form.Control onChange={handleComment} placeholder="Escriba sus comentarios aqui" />
                    </Form.Group>

                    <Button onClick={handleSubmit} type="text" variant="primary">
                      Submit
                    </Button>

                  </Form>
                </Modal>
              </Container>
            </Row>
          </Col>


        </Row>
      </Card>
      <br></br>

      <Card>
          <div class = "p-3 bg-info text-white text-center border">
            <b> <h5> Historial de Evaluaciones  </h5> </b>
          </div>
      </Card>

      <Accordion>
        {evals.map((ev) => (
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={ev.id.toString()}>
              Puntaje: {ev.score} <div class="text-right"> {ev.creationDate} </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={ev.id.toString()}>
              <Card.Body>
                <h5>Comentario: </h5>
                <br></br>
                <ListGroup>
                  <ListGroup.Item>
                    {ev.comment}
                  </ListGroup.Item>
                </ListGroup>
                
                <br />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
      <br></br>
    </Container>
  );
}

export default DevProf;
