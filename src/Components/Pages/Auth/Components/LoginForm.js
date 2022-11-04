import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Contexts/AuthContext';
import AppButton from '../../../Helpers/Commons/Buttons/AppButton';
import AppInput from '../../../Helpers/Commons/Inputs/AppInput';

export default function LoginForm() {
    const [ formData, setFormData ] = useState({})
    const [ btnLoading, setBtnLoading ] = useState(false)

    const [ error, setError ] = useState()

    const navigate = useNavigate()
    const { signIn } = useAuth()

    const formInputHandler = (value) => {
        setFormData((prevFormData) => {
            return {...prevFormData, ...value}
        });
    }


    const submitFormHandler = async (e) => {
        e.preventDefault()

        setBtnLoading(() => true)
    
        try {
            await signIn(formData, submitFinalCallback, submitCatchCallback)
        }catch(e) {
            setError({message: 'something went wrong!'});
        }
    }

    const submitCatchCallback = (res) => {
        setBtnLoading(() => false)
        setError(!res?.response 
            ? {message: "something went wrong!"} 
            : ( res?.response?.data?.errors || {message: res?.response?.statusText} )
        )

    }

    const submitFinalCallback = () => {
        setBtnLoading(() => false)

        navigate(-1)
    }

    return(
        <div className='w-100 pt-5'>
            <div className='text-center'>
                <h1 className='app-white-color'>Login</h1>
            </div>
            <div className='d-flex justify-content-center'>
                <div className='card p-5 m-4 w-100' style={{maxWidth: "500px" }}>
                    <form >
                        <AppInput
                            name='email'
                            type='email'
                            onChange={formInputHandler}
                            labelText= 'Email'
                            className="mb-4"
                            value={formData.email}
                            error={error?.email}
                        />
                        <AppInput
                            name='password'
                            type='password'
                            onChange={formInputHandler}
                            labelText= 'password'
                            className="mb-4"
                            value={formData.password}
                            error={error?.password}
                        />

                        {error?.message && <div id="emailHelp" className="form-text text-danger">{error?.message}</div> }

                        <div className='d-sm-flex justify-content-sm-between'>
                            <AppButton 
                                type="submit" 
                                loading={btnLoading} 
                                className="mt-4 w-100 me-2"
                                onClick={submitFormHandler} 
                                value="Login" />
                        </div>
                        
                    </form>           
                </div>
            </div>
            
            
        </div>
    )
}