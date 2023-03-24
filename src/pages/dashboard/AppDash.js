import {Button, Card, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";

let applicationList = [
]

let applicationName = ""
let applicationUrl = ""




export const AppDash = () => {

    const fetchApplication = () => {
        axios.get(`http://localhost:8080/application`)
            .then(response => {
                applicationList = response.data
                setApplication(applicationList)
            })
    }

    const createApplication = (event) => {
        if (applicationName !== "" || applicationUrl !== "") {
            axios.post(`http://localhost:8080/application`, {
                id: applicationName,
                url: applicationUrl,
            }) .then(response => {
                fetchApplication()
            })
        }
    }

    const deleteApplication = (event) => {
        axios.delete(`http://localhost:8080/application`,{
            params:{
                id: event.target.id
            }
        }) .then(response => {
            fetchApplication()
        })
    }

    const changeName = (event) => {
        applicationName = event.target.value
    }

    const changeUrl = (event) => {
        applicationUrl = event.target.value
    }

    const [application, setApplication] = useState (fetchApplication)

    return(
        <div>
            <Container className={'mt-4'}>
                <Row>
                    <Col lg={'6'}>
                        <Card className={'dark-mode-card'}>
                            <Card.Header>
                                <h4 className={'text-center text-white'}>Create Application</h4>
                            </Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row className={'justify-content-center'}>
                                        <Col lg={12}>
                                            <FloatingLabel label={'Application Name'}>
                                                <Form.Control type={"text"} className={'mb-2'} placeholder={'user'}
                                                              onChange={changeName}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col lg={12}>
                                            <FloatingLabel label={'Application URL'}>
                                                <Form.Control type={'text'} className={'mb-2'} placeholder={'discord'}
                                                              onChange={changeUrl}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col lg={12}>
                                            <Button variant={'outline-light'} className={'col-12 align-content-center mb-4'}
                                                    size={'lg'} onClick={createApplication}>{`Create Application`}</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={'6'}>
                        <Card className={'dark-mode-card'}>
                            <Card.Header>
                                <h4 className={'text-center text-white'}>Application List</h4>
                            </Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        {applicationList.map(application => {
                                            return(
                                               <Col lg={12} className={'mb-2'}>
                                                   <Card className={'super-dark-mode-card'}>
                                                       <Card.Body>
                                                           <Row>
                                                               <Col lg={10}>
                                                                   <strong className={'text-white'}>{application.id}</strong> <br/>
                                                                   <small className={'text-muted'}>{application.url}</small>
                                                               </Col>
                                                               <Col lg={2} className={'justify-content-end'}>
                                                                   <Button id={application.id} onClick={deleteApplication} variant={'danger'}>
                                                                       <span className={"material-symbols-rounded"}>delete</span>
                                                                   </Button>
                                                               </Col>
                                                           </Row>
                                                       </Card.Body>
                                                   </Card>
                                               </Col>
                                            )
                                        })}
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}