import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterEmailPassword } from '../../actions/auth'

const RegisterScreen = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state.ui);

    const {msgError} = state;

    const [form, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = form;



    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch(startRegisterEmailPassword(email, password, name));
        }
    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(setError('Nombre requerido'))
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email invalido'))
            return false;
        } else if (password.length < 8) {
            dispatch(setError('La password debe tener almenos 8 caracteres'))
            return false;
        } else if (password !== password2) {
            dispatch(setError('Las passwords no son iguales'))
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className='auth__title'>Register</h3>
            {
                msgError &&
                <div className='auth__alert-error'>
                    {msgError}
                </div>
            }
            <form onSubmit={handleRegister}
                className='animate__animated animate__fadeIn animate__faster'
            >
                <input
                    className='auth__input'
                    type='text'
                    name='name'
                    placeholder='Name'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    className='auth__input'
                    type='text'
                    name='email'
                    placeholder='Email'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='password'
                    name='password2'
                    placeholder='Confirm password'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    className='btn btn-primary btn-block mb-5'
                    //disabled={true}
                    type='submit'>
                    Register
                </button>
                <Link
                    className='link'
                    to='/auth/login'>
                    Already registered?
                </Link>
            </form>
        </>
    )
}

export default RegisterScreen
