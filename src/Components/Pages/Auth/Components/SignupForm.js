import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import AppButton from "../../../Helpers/Commons/Buttons/AppButton";
import AppInput from "../../../Helpers/Commons/Inputs/AppInput";

export default function SignupForm() {
    const [ formData, setFormData ] = useState({
        email: "sajib2717@gmail.com",
        name: "sajib",
        organization: "mir",
        password: "12345678",
        password_confirmation: "12345678",
    })

    const navigate = useNavigate()
    
    const [ btnLoading, setBtnLoading ] = useState(false)

    const [ error, setError ] = useState()

    const { signUp } = useAuth()

    const formInputHandler = (value) => {
        setFormData((prevFormData) => {
            return {...prevFormData, ...value}
        });
    }


    const submitFormHandler = async (e) => {
        e.preventDefault()

        setBtnLoading(() => true)
    
        try {
            await signUp(formData, submitFinalCallback, submitCatchCallback)
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

        navigate('/')
    }

    return (
        <div className='w-100 py-5'>
            <div className='text-center'>
                <h1 className='app-white-color'>Signup</h1>
            </div>
            <div className='d-flex justify-content-center'>
                <div className='card p-5 m-4 w-100' style={{maxWidth: "500px" }}> 
                    <form >
                        <AppInput
                            name='name'
                            type='text'
                            onChange={formInputHandler}
                            labelText= 'name'
                            className="mb-4"
                            required={true}
                            value={formData.name}
                            error={error?.name}
                        />
                        <AppInput
                            name='email'
                            type='email'
                            onChange={formInputHandler}
                            labelText= 'Email'
                            className="mb-4"
                            required={true}
                            value={formData.email}
                            error={error?.email}
                        />
                        <AppInput
                            name='password'
                            type='password'
                            onChange={formInputHandler}
                            labelText= 'password'
                            className="mb-4"
                            required={true}
                            value={formData.password}
                            error={error?.password}
                        />

                        <AppInput
                            name='password_confirmation'
                            type='password'
                            onChange={formInputHandler}
                            labelText= 'Confirm password'
                            className="mb-4"
                            required={true}
                            value={formData.password_confirmation}
                            error={error?.password_confirmation}
                        />

                        {error?.message && <div id="emailHelp" className="form-text text-danger">{error?.message}</div> }

                        <div className='d-sm-flex justify-content-sm-between'>
                            <AppButton 
                                type="submit" 
                                loading={btnLoading} 
                                className="mt-4 w-100"
                                onClick={submitFormHandler} 
                                value="Signup" />
                        </div>
                        
                    </form> 
                </div>
            </div>
        </div>  
    );
}