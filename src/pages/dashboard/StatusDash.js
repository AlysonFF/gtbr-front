import {Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";

let statusList = [
    "ACTIVE",
    "SUSPENDED",
    "BANNED"
]

let statusName = ""

export const StatusDash = () => {

    const fetchStatus = () => {
        axios.get(`${process.env.REACT_APP_GTBR_AUTH}/status`)
            .then(response => {
                statusList = response.data
                setStatus(statusList)
            })
    }

    const createStatus = (event) => {
        if (statusName !== ""){
            axios.post(`${process.env.REACT_APP_GTBR_AUTH}/status`, {
                id: statusName
            }).then(response => {
                fetchStatus()
            })
        }
    }

    const deleteStatus = (event) => {
        axios.delete(`${process.env.REACT_APP_GTBR_AUTH}/status`, {
            params: {
                id: event.target.id
            }
        }).then(response => {
            fetchStatus()
        })
    }

    const changeName = (event) => {
        statusName = event.target.value
    }

    const [status, setStatus] = useState(fetchStatus)

    return(
        <div>
            <Container className={'mt-4'}>
                <Row>
                    <Col lg={'6'}>
                        <Card className={'dark-mode-card'}>
                            <Card.Header>
                                <h4 className={'text-center text-white'}>Create Status</h4>
                            </Card.Header>
                            <Card.Body>
                                    <Container>
                                        <Row className={'justify-content-center'}>
                                            <Col lg={12}>
                                                <InputGroup>
                                                    <Form.Control onChange={changeName}
                                                        placeholder="Status Name"/>
                                                    <Button onClick={createStatus} variant="outline-light">
                                                        Create
                                                    </Button>
                                                </InputGroup>
                                            </Col>

                                        </Row>
                                    </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={'6'}>
                        <Card className={'dark-mode-card'}>
                            <Card.Header>
                                <h4 className={'text-center text-white'}>Status List</h4>
                            </Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        {statusList.map(statusItem => {
                                            return(
                                                <Col lg={12} className={'mb-2'}>
                                                    <Card className={'super-dark-mode-card'}>
                                                        <Card.Body>
                                                            <Row>
                                                                <Col lg={10}>
                                                                    <strong className={'text-white'}>{statusItem}</strong>
                                                                </Col>
                                                                <Col lg={2} className={'justify-content-end'}>
                                                                    <Button id={statusItem} onClick={deleteStatus} variant={'danger'}>
                                                                        <span className="material-symbols-rounded">delete</span>
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