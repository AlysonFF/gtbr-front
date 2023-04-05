import {
    Badge,
    Button,
    Card,
    Col,
    Container,
    FloatingLabel,
    Form,
    InputGroup,
    ListGroup,
    Modal,
    Row
} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

const badgeStatusColor = {
    active: 'success',
    suspended: 'warning',
    banned: 'danger',
    setup: 'info'
}

let userList = []

export const UserDash = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchUsers = () => {
        axios.get(`http://localhost:8080/user`)
            .then(response => {
                userList = response.data
                setUsers(response.data)
            })
    }

    const [users, setUsers] = useState(fetchUsers)

    const setLogin = () => {

    }

    const setDiscord = () => {

    }

    const sendUser = () => {

    }

    const deleteUser = () => {

    }

    const mostrarModal = (event) => {
        selectedUser = userList.filter(user => user.id === event.target.id)[0]
        console.log(selectedUser)
        setShow(true)
    }

    const clickListaModal = () => {
        alert('Voce cliclou na lista');
    };

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
                                                                            variant={'info'}>
                                                                        <span className="material-symbols-rounded text-white">edit_note</span>
                                                                    </Button>


                                                                    <Button id={user.id} onClick={deleteUser}
                                                                            variant={'danger'}>
                                                                            <span
                                                                                className="material-symbols-rounded">delete</span>
                                                                    </Button></InputGroup>
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
            <Modal size={"lg"} show={show} onHide={handleClose}>
                <Modal.Header closeButton className={'text-center'}>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
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
                                        {statusList.map(status => )}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Modal.Title>Role List</Modal.Title>
                            <ListGroup defaultActiveKey="#link1">
                                <Form.Select aria-label="Default select example2">
                                    <option>Select the Status</option>
                                    <option value="1">Role 1</option>
                                    <option value="2">Role 2</option>
                                    <option value="3">Role 3</option>
                                </Form.Select>
                                <Container className={'mt-2 text-center'}>
                                    <InputGroup mt={20}>
                                        <Button variant={'info'}>
                                            <span className="material-symbols-rounded text-white">check_circle</span>
                                        </Button>


                                        <Button variant={'danger'}>
                                            <span className="material-symbols-rounded">delete</span>
                                        </Button>
                                    </InputGroup>
                                </Container>

                            </ListGroup>
                        </Row>
                    </Container>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    <Modal.Body></Modal.Body>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}