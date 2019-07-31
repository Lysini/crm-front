import React from "react";
import {
    inject, 
    observer
} from 'mobx-react';

import { 
    CommonDropzone
} from '@uiparts'

export const BIKFileForm = inject("sendProblemStore")(observer((props) => {
    let {
        sendProblemStore
    } = props
    return (
        <CommonDropzone 
            onDrop={(newFile) => sendProblemStore.dropFile(newFile, "bik")}
            accept=".pdf"
            validationError={sendProblemStore.bikFileError}
            file={sendProblemStore.bikFile}
            title={"Kliknij lub przeciąg i upuść plik z BIK."}
        />
    )
}))