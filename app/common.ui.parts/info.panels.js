import React from 'react'

export const InfoPanel = (props) => {
    let {
        message,
        onClick
    } = props
    return (
        <div className="row flex-nowrap mt-2 mb-2 ml-auto mr-auto width-99 justify-content-center align-items-center">
            { onClick 
                ?  
                    <div 
                        className="bg-primary btn p-2 flex justify-content-center align-items-center full-width" 
                        onClick={() => onClick()}
                        style={{
                            fontSize: 14,
                            color: 'white',
                            borderRadius: 4
                        }}
                    >
                        {message}
                    </div>
                :
                    <div 
                        className="bg-primary p-2 flex justify-content-center align-items-center full-width" 
                        style={{
                            fontSize: 14,
                            color: 'white',
                            borderRadius: 4
                        }}
                    >
                        {message}
                    </div>
            }
        </div>
    )
}

export const ErrorPanel = (props) => {
    return (
        <div className="row flex-nowrap mt-2 mb-2 ml-auto mr-auto width-99 justify-content-center align-items-center">
            { props.onClick 
                ? 
                    <div 
                        className="bg-danger btn p-2 flex justify-content-center align-items-center full-width" 
                        onClick={() => props.onClick()}
                        style={{
                            fontSize: 14,
                            color: 'white',
                            borderRadius: 4
                        }}
                    >
                        {props.message}
                    </div>
                :   
                    <div 
                        className="bg-danger p-2 flex justify-content-center align-items-center full-width" 
                        style={{
                            fontSize: 14,
                            color: 'white',
                            borderRadius: 4
                        }}
                    >
                        {props.message}
                    </div>
            }
        </div>
    )
}