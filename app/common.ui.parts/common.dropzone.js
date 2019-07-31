import React from "react";
import {
    observer
} from 'mobx-react';

import Dropzone from 'react-dropzone'

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';

export const styles = theme => ({
    primaryBorder: {
        borderColor: '#3f51b5',
        borderStyle: 'solid',
        borderWidth: 1
    }
});

export const CommonDropzone = withStyles(styles)(observer((props) => {
    let {
        classes,
        onDrop,
        accept,
        validationError,
        file,
        title
    } = props
    return (
        <FormControl className="full-width">
            <Dropzone
                accept={accept}
                onDragStart={e => {}}
                activeStyle={{}}
                className={`m-auto d-flex text-center align-items-center justify-content-center`}
                multiple={false}
                onDrop={e => onDrop(e[0])}
            >
                {({getRootProps, getInputProps, isDragActive}) => {
                    return ( 
                        <div
                            {...getRootProps()}
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '150px',
                                height: '150px',
                                width: '100%',
                                borderColor: validationError.length > 0 && 'red'
                            }}
                            className={`gold-border`}
                        >
                            <input {...getInputProps()} />
                            { isDragActive  &&
                                <Typography {...getRootProps()} variant="h6" color="inherit">
                                    Upuść
                                </Typography>
                                
                            }

                            { !isDragActive && !file.name &&
                                <Icon fontSize="large">cloud_upload</Icon>
                            }

                            { !isDragActive && !file.name &&
                                <Typography variant="h6" color="inherit">
                                    {title}
                                </Typography>
                            }

                            { !isDragActive && file.name &&
                                <Typography variant="h6" color="inherit">
                                    {`${file.name}`}
                                </Typography>
                            }
                            { !isDragActive && file.name &&
                                <Typography variant="subtitle2" color="inherit">
                                    Aby zmienić kliknij lub przeciąg ponownie.
                                </Typography>
                            }
                        </div>
                    )    
                    
                }}
            </Dropzone>
        </FormControl>
    )
}))