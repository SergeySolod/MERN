import React, {useState, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

const AuthPage = props => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
    message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        //определение поля, которое меняется
            setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }


    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }


    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Placeholder" onChange={changeHandler} id="email" type="text" name='email' className='yellow-input'/>
                                    <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Placeholder" onChange={changeHandler} id="password" type="password" name='password' className='yellow-input'/>
                                    <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className='btn yellow darken-4' onClick={loginHandler} disabled={loading} style={{marginRight: 10}}>Войти</button>
                        <button className='btn grey lighten-1 black-text' onClick={registerHandler} disabled={loading}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
)
}

export default AuthPage