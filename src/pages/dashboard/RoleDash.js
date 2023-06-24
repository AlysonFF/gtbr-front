import axios from "axios";
import {useState} from "react";
import {Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

let roleList = [

]

let roleName = ""

export const RoleDash = () => {


    const fetchRole = () => {
        axios.get(`${process.env.REACT_APP_GTBR_AUTH}/role`)
            .then(response => {
                roleList = response.data
                setRole(roleList)
            })
    }

    const createRole = (event) => {
        if (roleName !== ""){
            axios.post(`${process.env.REACT_APP_GTBR_AUTH}/role`, {
                id: roleName
            }).then(response => {
                fetchRole()
            })
        }
    }

    const deleteRole = (event) => {
        axios.delete(`${process.env.REACT_APP_GTBR_AUTH}/role`, {
            params: {
                id: event.target.id
            }
        }).then(response => {
            fetchRole()
        })
    }

    const changeName = (event) => {
        roleName = event.target.value
    }

    const [role, setRole] = useState(fetchRole)

    return(
        <div>
            <Container className={'mt-4'}>
                <Row>
                    <Col lg={'6'}>
                        <Card className={'dark-mode-card'}>
                            <Card.Header>
                                <h4 className={'text-center text-white'}>Create Role</h4>
                            </Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row className={'justify-content-center'}>
                                        <Col lg={12}>
                                            <InputGroup>
                                                <Form.Control onChange={changeName}
                                                              placeholder="Role Name"/>
                                                <Button onClick={createRole} variant="outline-light">
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
                                <h4 className={'text-center text-white'}>Role List</h4>
                            </Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        {roleList.map(roleItem => {
                                            return(
                                                <Col lg={12} className={'mb-2'}>
                                                    <Card className={'super-dark-mode-card'}>
                                                        <Card.Body>
                                                            <Row>
                                                                <Col lg={10}>
                                                                    <strong className={'text-white'}>{roleItem}</strong>
                                                                </Col>
                                                                <Col lg={2} className={'justify-content-end'}>
                                                                    <Button id={roleItem} onClick={deleteRole} variant={'danger'}>
                                                                        <span id={roleItem} className="material-symbols-rounded">delete</span>
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