import {Button, Card, FloatingLabel, Form, Image, Row} from "react-bootstrap";

const centralize = {display: "flex", justifyContent: "center"}



let user = {
    name: "",
    password: "",
    application: ""
}

export const Login = () => {

    const setUsername = (event) => {
        user.name = event.target.value
    }

    const setPassword = (event) => {
        user.password = event.target.value
    }

    const authenticate = (event) => {
    }

    return (

        <div className={'centered'}>
            <Row>
                <div style={centralize}>
                    <Card className={'col-lg-6 col-md-10 col-sm-12 shadow ajuste-de-tamanho-card'}>
                        <Card.Body>
                            <div className={'mt-2 mb-3'} style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                                <Image src={'https://i.imgur.com/Z4Nb5se.png'} height={'50%'} width={'50%'}></Image>
                            </div>

                            <FloatingLabel label={'Login'}>
                                <Form.Control type={"text"} className={'mb-2'} placeholder={'user'} onChange={setUsername}/>
                            </FloatingLabel>
                            <FloatingLabel label={'Senha'}>
                                <Form.Control type={'password'}  placeholder={'password'} onChange={setPassword}/>
                            </FloatingLabel>
                        </Card.Body>
                        <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                            <Button variant={'primary'} className={'col-11 align-content-center mb-4'}
                                    size={'lg'} onClick={authenticate}>Entrar</Button>

                        </div>
                    </Card>
                </div>
            </Row>
        </div>
    )

}