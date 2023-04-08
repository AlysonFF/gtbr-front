import {Button, Card, Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useState} from "react";
import {UserDash} from "./UserDash";
import {AppDash} from "./AppDash";
import {RoleDash} from "./RoleDash";
import {StatusDash} from "./StatusDash";
import {useNavigate} from "react-router";

const pages = {
    user: "USER",
    role: "ROLE",
    status: "STATUS",
    application: "APP",
    exit: "EXIT",
}

export const Dashboard = () => {
    const [page, setPage] = useState(pages.user)
    const navigate = useNavigate()

    const exit = () => {
        navigate('/')
    }

    const changePage = (event) => {
        setPage(pages[event.target.id])
    }

    return (
        <div>
            <Navbar bg={'dark'} sticky={'top'} variant={'dark'} expand={'lg'}>
                <Container>
                    <Image src={'https://i.imgur.com/sN0aAjU.png'} height={'8%'} width={'8%'} className={'me-5'}></Image>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Button variant={'outline-light'} id={'user'} onClick={changePage}>User</Button></Nav.Link>
                            <Nav.Link><Button variant={'outline-light'} id={'role'} onClick={changePage}>Role</Button></Nav.Link>
                            <Nav.Link><Button variant={'outline-light'} id={'status'} onClick={changePage}>Status</Button></Nav.Link>
                            <Nav.Link><Button variant={'outline-light'} id={'application'} onClick={changePage}>Application</Button></Nav.Link>
                            <Nav className={'ms-auto'}>
                                <Nav.Link><Button variant={'outline-light'} id={'exit'} onClick={exit}>Exit</Button></Nav.Link></Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                {page === pages.user
                    ? <UserDash/>
                    : <></>}

                {page === pages.role
                    ? <RoleDash/>
                    : <></>}

                {page === pages.status
                    ? <StatusDash/>
                    : <></>}

                {page === pages.application
                    ? <AppDash/>
                    : <></>}
            </div>
        </div>
    )
}