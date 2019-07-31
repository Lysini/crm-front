import React from "react";
import {
    inject, 
    observer
} from 'mobx-react';

import { 
    CommonDropzone
} from '@uiparts'

export const BusinessPlanForm = inject("sendProblemStore")(observer((props) => {
    let {
        sendProblemStore
    } = props
    return (
        <CommonDropzone 
            onDrop={(newFile) => sendProblemStore.dropFile(newFile, "businessPlan")}
            accept=".pdf"
            validationError={sendProblemStore.businessPlanFileError}
            file={sendProblemStore.businessPlanFile}
            title={"Kliknij lub przeciąg i upuść swój biznesplan."}
        />
    )
}))