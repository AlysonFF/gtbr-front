import {Button, Card, FloatingLabel, Form, Image, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";

const centralize = {display: "flex", justifyContent: "center"}

let code = ''

let user = {
    username: "",
    password: "",
    application: "DASHBOARD"
}

export const Login = () => {

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

    const setCode = (event) => {
        code = event.target.value
    }

    const mfaAuth = (event) => {
        axios.get(`http://localhost:8080/auth/mfa`, {
            params: {
                mfaId: mfaId,
                code: code
            }
        }).then(response => {
            console.log(`${response.data.applicationUrl}?auth=${response.data.token}`)
        })
    }

    const authenticate = (event) => {
        axios.get(`http://localhost:8080/auth`, {
            params: user
        }).then(response => {
            setMfaId(response.data.mfaToken)
        })
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
                                        <Image src={'https://i.imgur.com/sN0aAjU.png'} height={'50%'} width={'50%'}></Image>
                                    </div>

                                    <FloatingLabel label={'Login'}>
                                        <Form.Control type={"text"} className={'mb-2'} placeholder={'user'}
                                                      onChange={setUsername}/>
                                    </FloatingLabel>
                                    <FloatingLabel label={'Password'}>
                                        <Form.Control type={'password'} placeholder={'password'}
                                                      onChange={setPassword}/>
                                    </FloatingLabel>
                                </Card.Body>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <Button variant={'outline-light'} className={'col-11 align-content-center mb-4'}
                                            size={'lg'} onClick={authenticate}>{`Login to ${applicationId === undefined ? 'dashboard' : applicationId}`}</Button>

                                </div>
                            </div> : <div>
                                        <Card.Body>
                                            <div className={'mt-2 mb-4'}
                                                 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                <Image src={'https://i.imgur.com/sN0aAjU.png'} height={'50%'} width={'50%'}></Image>
                                            </div>
                                            <p className={'text-white text-center'}>Um codigo foi enviado para o seu discord, para prosseguir com seu login digite-o abaixo</p>

                                            <FloatingLabel label={'Codigo'}>
                                                <Form.Control type={"text"} className={'mb-2'} placeholder={'code'} defaultValue={''}
                                                              onChange={setCode}/>
                                            </FloatingLabel>
                                        </Card.Body>
                                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <Button variant={'outline-light'} className={'col-11 align-content-center mb-4'}
                                                    size={'lg'} onClick={mfaAuth}>{`Confirmar codigo`}</Button>

                                        </div>
                                </div>}
</Card>
</div>
</Row>
</div>
)

}