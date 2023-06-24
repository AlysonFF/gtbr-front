import {Button, Card, FloatingLabel, Form, Image, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {createNotification} from "../../utils/Notification";
import {NotificationManager} from "react-notifications";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

const centralize = {display: "flex", justifyContent: "center"}

let user = {
    id: "",
    dId: "",
    password: "",
    passwordConfirmation: ""
}

export const Setup = () => {

    const [searchParams] = useSearchParams();
    user.id = searchParams.get('id');
    user.dId = searchParams.get('dId');
    const [validate, setValidate] = useState('')

    const navigate = useNavigate()

    const validatePassword = () => {
        setValidate(user.passwordConfirmation === user.password ? 'is-valid' : 'is-invalid')
    }

    const setPassword = (event) => {
        user.password = event.target.value

        console.log(user)
        if (user.passwordConfirmation)
            validatePassword()
    }

    const setPasswordConfirmation = (event) => {
        user.passwordConfirmation = event.target.value
        validatePassword()
    }

    const createPassword = (event) => {
        if (validate === 'is-valid') {
            const userData = `${user.id}:${user.dId}:${user.password}`;
            const basic = `Data ${btoa(userData)}`
            axios.get(`${process.env.REACT_APP_GTBR_AUTH}/user/password`, {
                headers: {
                    Authorization: basic
                }
            }).then(response => {
                createNotification('success', 'Senha criada', 'Sua senha foi criada com sucesso, seu acesso as aplicacoes foram liberados.')
                setTimeout(() => {
                    navigate("/")
                }, 5001)

            }).catch(reason => {
                createNotification('error', 'Algo deu errado', reason.response.data)
            })
        }

    }

    return (
        <div className={'centered dark-mode-fundo'}>
            <Row>
                <div style={centralize}>
                    <Card className={'col-lg-6 col-md-10 col-sm-12 shadow ajuste-de-tamanho-card dark-mode-card'}>

                        <Card.Body>
                            <div className={'mt-2 mb-4'}
                                 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Image src={'https://i.imgur.com/sN0aAjU.png'} height={'50%'}
                                       width={'50%'}></Image>
                            </div>
                            <p className={'text-white text-center'}>Olá e seja bem-vindo ao GTBR! É hora de proteger sua
                                conta.
                                Crie uma senha segura para garantir a segurança dos seus dados. Vamos lá!</p>

                            <FloatingLabel label={'Senha'}>
                                <Form.Control type={"password"} className={`mb-2 ${validate}`} placeholder={'senha'}
                                              defaultValue={''} id={'password'}
                                              onChange={setPassword}/>
                            </FloatingLabel>

                            <FloatingLabel label={'Cofirmar senha'}>
                                <Form.Control type={"password"} className={`mb-2 ${validate}`}
                                              placeholder={'confirmar senha'}
                                              defaultValue={''} id={'confirm-password'}
                                              onChange={setPasswordConfirmation}/>
                            </FloatingLabel>

                        </Card.Body>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Button variant={'outline-light'} className={'col-11 align-content-center mb-4'}
                                    disabled={validate !== 'is-valid'}
                                    size={'lg'} onClick={createPassword}>{`Criar senha`}</Button>

                        </div>
                    </Card>
                </div>
            </Row>
            <NotificationContainer/>
        </div>
    )

}
