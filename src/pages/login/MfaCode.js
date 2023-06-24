import {Button, Card, FloatingLabel, Form, Image} from "react-bootstrap";
import axios from "axios";
import {createNotification} from "../../utils/Notification";

const MfaCode = (props) => {
    let code = ''


    const setCode = (event) => {
        code = event.target.value
    }

    const mfaAuth = (event) => {
        axios.get(`${process.env.REACT_APP_GTBR_AUTH}/auth/mfa`, {
            params: {
                mfaId: props.mfaId,
                code: code
            }
        }).then(response => {
            window.location.href = `${response.data.applicationUrl}?auth=${response.data.token}`
        }).catch(reason => {
            createNotification('error', 'Codigo errado', reason.response.data)
        })
    }

    return (
        <div>
            <Card.Body>
                <div className={'mt-2 mb-4'}
                     style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Image src={'https://i.imgur.com/sN0aAjU.png'} height={'50%'}
                           width={'50%'}></Image>
                </div>
                <p className={'text-white text-center'}>Um codigo foi enviado para o seu discord,
                    para prosseguir com seu login digite-o abaixo</p>

                <FloatingLabel label={'Codigo'}>
                    <Form.Control type={"text"} className={'mb-2'}
                                  placeholder={'code'}
                                  defaultValue={code}
                                  onChange={setCode}/>
                </FloatingLabel>
            </Card.Body>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button variant={'outline-light'} className={'col-11 align-content-center mb-4'}
                        size={'lg'} onClick={mfaAuth}>{`Confirmar codigo`}</Button>

            </div>
        </div>
    )
}

export default MfaCode