import {Button, Card, FloatingLabel, Form, Image, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {createNotification} from "../../utils/Notification";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import MfaCode from "./MfaCode";


const centralize = {display: "flex", justifyContent: "center"}


let user = {
    username: "",
    password: "",
    application: "DASHBOARD"
}

export const Login = (props) => {

    let {applicationId} = useParams()
    const navigate = useNavigate()
    const [mfaId, setMfaId] = useState('')

    useEffect(() => {
            user.application = applicationId === undefined ? 'DASHBOARD' : applicationId
        },
        [applicationId])

    const setUsername = (event) => {
        user.username = event.target.value
    }

    const setPassword = (event) => {
        user.password = event.target.value
    }


    const authenticate = (event) => {
        axios.get(`${process.env.REACT_APP_GTBR_AUTH}/auth`, {
            params: user
        }).then(response => {
            if (response.data.status === "SETUP") {
                navigate("/setup")
            } else
                setMfaId(response.data.mfaToken)
        }).catch(reason => {
            createNotification('error', 'Algo deu errado', reason.response.data)
        })
    }

    const onEnter = (event) => {
        if (event.key === 'Enter')
            authenticate(event)
    }

    return (
        <div className={'centered dark-mode-fundo'}>
            <Row>
                <div style={centralize}>
                    <Card className={'col-lg-6 col-md-10 col-sm-12 shadow ajuste-de-tamanho-card dark-mode-card'}>
                        {
                            mfaId === '' ? <div>
                                <Card.Body>
                                    <div className={'mt-2 mb-4'}
                                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <Image src={'https://i.imgur.com/sN0aAjU.png'} height={'50%'}
                                               width={'50%'}></Image>
                                    </div>

                                    <FloatingLabel label={'Login'}>
                                        <Form.Control type={"text"} className={'mb-2'} placeholder={'user'}
                                                      onChange={setUsername}/>
                                    </FloatingLabel>
                                    <FloatingLabel label={'Password'}>
                                        <Form.Control type={'password'} placeholder={'password'}
                                                      onChange={setPassword} onKeyPress={onEnter}/>
                                    </FloatingLabel>
                                </Card.Body>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <Button variant={'outline-light'} className={'col-11 align-content-center mb-4'}
                                            size={'lg'}
                                            onClick={authenticate}>{`Login to ${applicationId === undefined ? 'dashboard' : applicationId}`}</Button>

                                </div>
                            </div> : (
                                <MfaCode mfaId={mfaId}/>
                            )
                        }
                    </Card>
                </div>
            </Row>
            <NotificationContainer/>
        </div>
    )

}
