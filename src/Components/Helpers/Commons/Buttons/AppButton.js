
export default function AppButton (props) {
    const { type, value, className, loading, onClick } = props

    return (
        <button 
            className={`btn btn-primary ${className}`}
            type={type || 'button'}
            onClick={onClick}
            disabled={loading ? true : false} >
                
                { !loading 
                    ? (value || 'Click')
                    : (
                        <div>
                            <div className="spinner-grow spinner-grow-sm mx-1" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow spinner-grow-sm mx-1" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow spinner-grow-sm mx-1" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        
                    )
                }
        </button>
    )
}