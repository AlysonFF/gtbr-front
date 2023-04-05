import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

export function RequireAuth(props) {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const queryToken = searchParams.get('auth')

    const validateToken = () => {
        axios.get(`http://localhost:8080/auth/validate`, {
            params: {
                token: queryToken
            }
        }).then(response => {
            if (response.status === 200)
                setVerified(true)
        }).catch(reason => {
            navigate("/")
        })
    }

    let [verified, setVerified] = useState(validateToken);

    return (
        <div>
            {verified ? props.element : <div></div>}
        </div>
    )
}