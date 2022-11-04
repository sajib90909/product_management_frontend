import { useEffect, useState } from "react";

const AppInput = (props) => {
    const { type, name, placeholder, value,
        labelText, onChange, error, id, className,
        inputClass, list, required, chooseLabel } = props
    
    const [ inputValue, setInputValue ] = useState();
    const [ err, setErr ] = useState();
    
    useEffect(() => {
        setInputValue(value)
    }, [value, list])

    useEffect(() => {
        setErr(error)
    }, [error])
    const inputId = id || `input${name}${Math.floor(Math.random() * 1000)}`

    const InputHandle = (e) => {
        const currentInputValue = e.target.value

        setInputValue(currentInputValue)

        onChange({[e.target.name]: e.target.value})
    }

    const fileHandler = (e) => {
        if(e.target?.files?.length ) {
            onChange({[e.target.name]: e.target.files[0]}, e)
        }
    }

    return (
        <div className={`${className}`}>
            {labelText && <label htmlFor={inputId} className="form-label">{labelText} { required && <span className="text-danger">*</span>}</label>}
            <div className="position-relative">
                { type === 'select' ? (
                        <select 
                            name={name}
                            value={inputValue || ''}
                            id={inputId} 
                            onChange={InputHandle} 
                            className={`form-control app-input ${inputClass}`}>
                                { (<option value="" disabled className="">{chooseLabel || 'Select'}</option>) }
                                {
                                    list.length ? (
                                        list?.map((item, index) => (
                                            <option key={`input-options-${index}`} value={item.id}>{item.name}</option>
                                        ))
                                    ) : ''
                                }
                        </select>
                    ) : type === 'file' ? (
                        <input 
                            name={name}
                            id={inputId} 
                            type='file'
                            onChange={(e) => fileHandler(e)}
                            placeholder={placeholder || `Enter ${name.replace(/_/g, ' ')}`}
                            className={`form-control app-input ${inputClass}`}
                            aria-describedby={`${name}help`}
                        />
                    ) : (
                        <input 
                            type={type || 'text'} 
                            onChange={InputHandle} 
                            placeholder={placeholder || `Enter ${name.replace(/_/g, ' ')}`}
                            className={`form-control app-input ${inputClass}`}
                            name={name}
                            value={inputValue || ''}
                            id={inputId} 
                            aria-describedby={`${name}help`}
                        />
                    )
                }
            </div>
            
            {err && <div className="form-text text-danger">{err}</div> }
        </div>
    )
}


export default AppInput;