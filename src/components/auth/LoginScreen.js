import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

const LoginScreen = () => {

    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.ui)
    
    const [values, handleInputChange] = useForm({
        email: 'will@will.com',
        password: '12345678'
    })

    const {email, password} = values;

    const handleLogin = (e) => {
        e.preventDefault();  
        dispatch( startLoginEmailPassword(email, password) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <>
            <h3 className='auth__title'>Login</h3>
            <form 
                onSubmit={ handleLogin } 
                className='animate__animated animate__fadeIn animate__faster'
            >
                <input
                    className='auth__input'
                    type='text'
                    name='email'
                    placeholder='Email'
                    autoComplete='off' 
                    value={email} 
                    onChange= {handleInputChange} />

                <input
                    className='auth__input'
                    type='password'
                    name='password'
                    placeholder='Password' 
                    value={password}
                    onChange={handleInputChange} />

                <button 
                    className='btn btn-primary btn-block'
                    disabled={loading}
                    type='submit'>
                    Login
                </button>
        
                <div className='auth__social-network'>
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                    <Link 
                        className='link'
                        to='/auth/register'>
                        Create new account
                    </Link>
                </div>
            </form>
        </>
    )
}

export default LoginScreen
