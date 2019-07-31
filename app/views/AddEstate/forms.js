import React from "react";
import {
    inject
} from 'mobx-react';
import { observer } from "mobx-react-lite"

import { estateTypes, groundTypes, executionStatuses } from '@globals/globals'

import { 
    CommonSelect, 
} from '@uiparts'

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { InlineDatePicker } from 'material-ui-pickers';

const convertDictionariesForSelect = (dictionaries) => {
    return dictionaries.map((dictionary) => {
        return {
            label: dictionary,
            value: dictionary
        }
    })
}

export const NewEstateForm = inject("addEstateStore")(observer((props) => {
    let {
        estateDataForm,
        estateDataFormValidation,
    } = props.addEstateStore
    return (
        <FormControl className="full-width">
            <CommonSelect 
                options={convertDictionariesForSelect(estateTypes)}
                label={"Typ Nieruchomości"}
                value={estateDataForm.type}
                onChange={(value) => estateDataForm.type = value}
                error={estateDataFormValidation.typeError.length > 0}
                errorMessage={estateDataFormValidation.typeError}
            />
            
            { estateDataForm.type === "Grunt" &&
                <CommonSelect 
                    options={convertDictionariesForSelect(groundTypes)}
                    label={"Typ Gruntu"}
                    value={estateDataForm.groundType}
                    onChange={(value) => estateDataForm.groundType = value}
                    error={estateDataFormValidation.groundTypeError.length > 0}
                    errorMessage={estateDataFormValidation.groundTypeError}
                />
            }

            <TextField
                fullWidth={true}
                label="Powierzchnia (w m^2)"
                value={estateDataForm.area}
                onChange={(e) => estateDataForm.area = e.target.value}
                error={estateDataFormValidation.areaError.length > 0}
                placeholder="Powierzchnia (w m^2)"
                margin="normal"
                variant="outlined"
                helperText={estateDataFormValidation.areaError}
            />

            <TextField
                fullWidth={true}
                label="Adres (i numer działki)"
                value={estateDataForm.address}
                onChange={(e) => estateDataForm.address = e.target.value}
                error={estateDataFormValidation.addressError.length > 0}
                placeholder="Adres (i numer działki)"
                margin="normal"
                variant="outlined"
                helperText={estateDataFormValidation.addressError}
            />

            <TextField
                fullWidth={true}
                label="Zadłużenie w zł (jeśli brak pozostaw puste)"
                value={estateDataForm.debet}
                onChange={(e) => estateDataForm.debet = e.target.value}
                error={estateDataFormValidation.debetError.length > 0}
                placeholder="Zadłużenie w zł (jeśli brak pozostaw puste)"
                margin="normal"
                variant="outlined"
                helperText={estateDataFormValidation.debetError}
            />

            { !(Number(estateDataForm.debet) === 0) &&
                <CommonSelect 
                    options={convertDictionariesForSelect(executionStatuses)}
                    label={"Status Egzekucji"}
                    value={estateDataForm.executionStatus}
                    onChange={(value) => estateDataForm.executionStatus = value}
                    error={estateDataFormValidation.executionStatusError.length > 0}
                    errorMessage={estateDataFormValidation.executionStatusError}
                    chooseOption={false}
                />
            }
            
            {estateDataForm.executionStatus !== "Nie podjęto" &&
                <InlineDatePicker
                    fullWidth
                    style={{
                        marginTop: 10
                    }}
                    keyboard
                    clearable
                    variant="outlined"
                    label="Data rozpoczęcia postępowania windykacyjnego"
                    value={estateDataForm.executionStartDate}
                    onChange={(date) => estateDataForm.executionStartDate = date}
                    format={'DD/MM/YYYY'}
                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                />
            }

            <TextField
                multiline={true}
                rows="5"
                maxrows="5"
                fullWidth={true}
                label="Opis nieruchomości"
                value={estateDataForm.description}
                onChange={(e) => estateDataForm.description = e.target.value}
                error={estateDataFormValidation.descriptionError.length > 0}
                placeholder="Opis nieruchomości"
                margin="normal"
                variant="outlined"
                helperText={estateDataFormValidation.descriptionError}
            />  
        </FormControl>
    )
}))