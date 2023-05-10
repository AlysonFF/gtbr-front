import {Badge, Button, Card, Col, Container, FloatingLabel, Form, InputGroup, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {ReactNotifications, Store} from "react-notifications-component";

const badgeStatusColor = {
    active: 'success',
    suspended: 'warning',
    banned: 'danger',
    setup: 'info'
}

let userList = []
let statusList = []
let roleList = []
let applicationList = []

let newUser = {
    name: '',
    discordTag: ''
}

let selectedUser = {
    id: '',
    name: '',
    discordTag: '',
    status: {
        id: ''
    },
    applications: [],
    role: []
}

export const UserDash = () => {

    const [show, setShow] = useState(false);

    const [user, setUser] = useState(selectedUser)
    const handleClose = () => {
        fetchUsers()
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const fetchUsers = () => {
        axios.get(`http://localhost:8080/user`)
            .then(response => {
                axios.get(`http://localhost:8080/status`).then(response => statusList = response.data)
                axios.get(`http://localhost:8080/application`).then(response => applicationList = response.data)
                axios.get(`http://localhost:8080/role`).then(response => roleList = response.data)
                userList = response.data
                setUsers(response.data)
            })
    }

    const fetchUser = (userId) => {
        axios.get(`http://localhost:8080/user/id`, {
            params: {
                id: userId
            }
        }).then(response => {
            selectedUser = response.data
            setUser(response.data)
        })
    }

    const [users, setUsers] = useState(fetchUsers)

    const setLogin = (event) => {
        newUser.name = event.target.value
    }

    const setDiscord = (event) => {
        newUser.discordTag = event.target.value
    }

    const sendUser = () => {
        axios.post(`http://localhost:8080/user`, {
            name: newUser.name,
            discordTag: newUser.discordTag
        }).then(response => {
            fetchUsers()
        })
    }

    const deleteUser = () => {

    }

    const sendNotification = (title, message, type) => {
        Store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        })
    }

    const addRoleToUser = (event) => {
        axios.put(`http://localhost:8080/user/role`, {}, {
            params: {
                userId: selectedUser.id,
                roleId: event.target.id
            }
        }).then(response => {
            fetchUser(selectedUser.id)
            sendNotification('Role adicionada', `A role ${event.target.id.toLowerCase()} foi adicionada para ${selectedUser.name}`, 'success')
        })
    }

    const removeRoleToUser = (event) => {
        axios.delete(`http://localhost:8080/user/role`, {
            params: {
                userId: selectedUser.id,
                roleId: event.target.id
            }
        }).then(response => {
            fetchUser(selectedUser.id)
            sendNotification('Role removida', `A role ${event.target.id.toLowerCase()} foi removida de ${selectedUser.name}`, 'success')
        })
    }

    const addApplicationToUser = (event) => {
        axios.put(`http://localhost:8080/user/application`, {}, {
            params: {
                userId: selectedUser.id,
                applicationId: event.target.id
            }
        }).then(response => {
            fetchUser(selectedUser.id)
            sendNotification('Acesso adicionado', `O acesso a aplicacao ${event.target.id.toLowerCase()} foi concedido para ${selectedUser.name}`, 'success')

        })
    }

    const removeApplicationToUser = (event) => {
        axios.delete(`http://localhost:8080/user/application`, {
            params: {
                userId: selectedUser.id,
                applicationId: event.target.id
            }
        }).then(response => {
            fetchUser(selectedUser.id)
            sendNotification('Acesso removido', `O acesso a aplicacao ${event.target.id.toLowerCase()} foi removido de ${selectedUser.name}`, 'success')
        })
    }

    const mostrarModal = (event) => {
        selectedUser = userList.find(user => user.id === event.target.id)
        setShow(true)
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <Container className={'mt-4'}>
            <Row>
                <Col lg={'6'}>
                    <Card className={'dark-mode-card'}>
                        <Card.Header>
                            <h4 className={'text-center text-white'}>Create User</h4>
                        </Card.Header>
                        <Card.Body>
                            <Container>
                                <Row className={'justify-content-center'}>
                                    <Col lg={12}>
                                        <FloatingLabel label={'Login'}>
                                            <Form.Control type={"text"} className={'mb-2'} placeholder={'user'}
                                                          onChange={setLogin}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={12}>
                                        <FloatingLabel label={'Discord#tag'}>
                                            <Form.Control type={'text'} className={'mb-2'} placeholder={'discord'}
                                                          onChange={setDiscord}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={12}>
                                        <Button variant={'outline-light'} className={'col-12 align-content-center mb-4'}
                                                size={'lg'} onClick={sendUser}>{`Create user`}</Button>
                                    </Col>

                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={'6'}>
                    <Card className={'dark-mode-card'}>
                        <Card.Header>
                            <h4 className={'text-center text-white'}>User List</h4>
                        </Card.Header>
                        <Card.Body>
                            <Container>
                                <Row>
                                    {userList.map(user => {
                                        return (
                                            <Col lg={12} className={'mb-2'}>
                                                <Card className={'super-dark-mode-card'}>
                                                    <Card.Body>
                                                        <Row>
                                                            <Col lg={9}>
                                                                <strong
                                                                    className={'text-white'}>{user.name}</strong>&nbsp;
                                                                <small
                                                                    className={'text-secondary'}>@ {user.discordTag}</small>
                                                                <br/>
                                                                <Badge
                                                                    bg={badgeStatusColor[user.status.id.toLowerCase()]}>
                                                                    {user.status.id}
                                                                </Badge>
                                                            </Col>
                                                            <Col lg={3} className={'justify-content-end'}>
                                                                <InputGroup>
                                                                    <Button id={user.id} onClick={mostrarModal}
                                                                            variant={'success'}>
                                                                        <span id={user.id}
                                                                              className="material-symbols-rounded text-white">edit_note</span>
                                                                    </Button>
                                                                    <Button id={user.id} onClick={deleteUser}
                                                                            variant={'danger'}>
                                                                        <span
                                                                            className="material-symbols-rounded">delete</span>
                                                                    </Button>
                                                                </InputGroup>
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
            <Modal size={"lg"} show={show} onHide={handleClose} className={'dark-mode-card'}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col lg={12} className={'text-center'}>
                                <Modal.Title className={'text-white mb-3'}>Update user</Modal.Title>
                            </Col>
                            <Col>
                                <FloatingLabel label={'Login'}>
                                    <Form.Control type={'text'} className={'mb-2'}
                                                  defaultValue={selectedUser.name}/>
                                </FloatingLabel>

                            </Col>

                            <Col>
                                <FloatingLabel label={'Discord#tag'}>
                                    <Form.Control type={"text"} className={'mb-2'}
                                                  defaultValue={selectedUser.discordTag}/>
                                </FloatingLabel>
                            </Col>

                            <Col>
                                <FloatingLabel label={'User Status'}>
                                    <Form.Select aria-label="Default select example">
                                        <option>{selectedUser.status.id}</option>
                                        {statusList.map(status => {
                                            return (status !== selectedUser.status.id) ? (
                                                <option>{status}</option>
                                            ) : (<></>)
                                        })}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <hr/>
                            <Container>
                                <Row>
                                    <Col lg={6} key={`roles:${user.role.length}`}>
                                        <h5 className={'text-white'}>Roles</h5>
                                        {roleList.map(roleItem => {
                                            return (
                                                <Col lg={12} className={'mb-2'}>
                                                    <Card className={'super-dark-mode-card'}>
                                                        <Card.Body>
                                                            <Row>
                                                                <Col lg={9}>
                                                                    <strong className={'text-white'}>{roleItem}</strong>
                                                                </Col>
                                                                <Col lg={3} className={'justify-content-end'}>
                                                                    {selectedUser.role.find(role => role.id === roleItem) !== undefined ? (
                                                                        <Button size={'sm'} id={roleItem} onClick={removeRoleToUser}
                                                                                variant={'danger'}>
                                                                            <span id={roleItem}
                                                                                  className={"material-symbols-rounded"}>link_off</span>
                                                                        </Button>
                                                                    ) : (
                                                                        <Button size={'sm'} id={roleItem} onClick={addRoleToUser}
                                                                                variant={'success'}>
                                                                            <span id={roleItem}
                                                                                  className={"material-symbols-rounded"}>add_link</span>
                                                                        </Button>
                                                                    )}
                                                                </Col>
                                                            </Row>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })}
                                    </Col>
                                    <Col lg={6} key={`apps:${user.applications.length}`}>
                                        <h5 className={'text-white'}>Acessos</h5>
                                        {applicationList.map(application => {
                                            return (
                                                <Col lg={12} className={'mb-2'}>
                                                    <Card className={'super-dark-mode-card'}>
                                                        <Card.Body>
                                                            <Row>
                                                                <Col lg={9}>
                                                                    <strong
                                                                        className={'text-white'}>{application.id}</strong>
                                                                    <br/>
                                                                    <small
                                                                        className={'text-muted'}>{application.url}</small>
                                                                </Col>
                                                                <Col lg={3} className={'justify-content-end'}>
                                                                    {selectedUser.applications.find(app => app.id === application.id) !== undefined ? (
                                                                        <Button size={'sm'} id={application.id}
                                                                                variant={'danger'}
                                                                                onClick={removeApplicationToUser}>
                                                                            <span id={application.id}
                                                                                  className={"material-symbols-rounded"}>link_off</span>
                                                                        </Button>
                                                                    ) : (
                                                                        <Button size={'sm'} id={application.id}
                                                                                variant={'success'}
                                                                                onClick={addApplicationToUser}>
                                                                            <span id={application.id}
                                                                                  className={"material-symbols-rounded"}>add_link</span>
                                                                        </Button>
                                                                    )}
                                                                </Col>
                                                            </Row>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })}
                                    </Col>
                                </Row>
                            </Container>

                        </Row>
                        <Container>
                            <Row className={'justify-content-center mt-3'}>
                                <Col lg={4} className={'text-center'}>
                                    <Button variant="success" onClick={handleClose}>
                                        Update
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </Modal.Body>
            </Modal>
            <ReactNotifications/>
        </Container>
    )
}