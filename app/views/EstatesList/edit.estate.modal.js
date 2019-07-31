import React from 'react';
import {
    inject
} from 'mobx-react';
import { observer } from "mobx-react-lite"

import moment from 'moment'
moment.locale('pl');

import { estateTypes, groundTypes, executionStatuses } from '@globals/globals'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { 
    CommonSelect, 
} from '@uiparts'

import { InlineDatePicker } from 'material-ui-pickers';

const convertDictionariesForSelect = (dictionaries) => {
    return dictionaries.map((dictionary) => {
        return {
            label: dictionary,
            value: dictionary
        }
    })
}

export const EditEstateModal = inject("estatesListStore")(observer((props) => {
    let {
        estatesListStore
    } = props

    return (
        <Dialog 
            open={estatesListStore.showEditModal} 
            onClose={() => estatesListStore.showEditModal = false} 
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Edycja nieruchomości</DialogTitle>
            <DialogContent className="edit-estate-modal">
                <EditEstateForm />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => estatesListStore.showEditModal = false} color="primary">
                    Anuluj
                </Button>
                <Button
                    color="primary"
                    onClick={() => estatesListStore.updateEstate()}
                    disabled={estatesListStore.imBusyUpdatingEstate}
                >
                    Zapisz zmiany
                    {estatesListStore.imBusyUpdatingEstate && <CircularProgress size={20} className={`ml-3`} />}
                </Button>
            </DialogActions>
        </Dialog>
    )
}))


const EditEstateForm = inject("estatesListStore")(observer((props) => {
    let {
        estatesListStore
    } = props

    let {
        estateToEdit,
        estateToEditValidation
    } = estatesListStore

    return (
        <FormControl className="full-width">
            <CommonSelect 
                options={convertDictionariesForSelect(estateTypes)}
                label={"Typ Nieruchomości"}
                value={estateToEdit.type}
                onChange={(value) => estateToEdit.type = value}
                error={estateToEditValidation.typeError.length > 0}
                errorMessage={estateToEditValidation.typeError}
            />

            { estateToEdit.type === "Grunt" &&
                <CommonSelect 
                    options={convertDictionariesForSelect(groundTypes)}
                    label={"Typ Gruntu"}
                    value={estateToEdit.groundType}
                    onChange={(value) => estateToEdit.groundType = value}
                    error={estateToEditValidation.groundTypeError.length > 0}
                    errorMessage={estateToEditValidation.groundTypeError}
                />
            }

            <TextField
                fullWidth={true}
                label="Powierzchnia (w m^2)"
                value={estateToEdit.area}
                onChange={(e) => estateToEdit.area = e.target.value}
                error={estateToEditValidation.areaError.length > 0}
                placeholder="Powierzchnia (w m^2)"
                margin="normal"
                variant="outlined"
                helperText={estateToEditValidation.areaError}
            />

            <TextField
                fullWidth={true}
                label="Adres (i numer działki)"
                value={estateToEdit.address}
                onChange={(e) => estateToEdit.address = e.target.value}
                error={estateToEditValidation.addressError.length > 0}
                placeholder="Adres (i numer działki)"
                margin="normal"
                variant="outlined"
                helperText={estateToEditValidation.addressError}
            />

            <TextField
                fullWidth={true}
                label="Zadłużenie w zł (jeśli brak pozostaw puste)"
                value={estateToEdit.debet}
                onChange={(e) => estateToEdit.debet = e.target.value}
                error={estateToEditValidation.debetError.length > 0}
                placeholder="Zadłużenie w zł (jeśli brak pozostaw puste)"
                margin="normal"
                variant="outlined"
                helperText={estateToEditValidation.debetError}
            />

            { !(Number(estateToEdit.debet) === 0) &&
                <CommonSelect 
                    options={convertDictionariesForSelect(executionStatuses)}
                    label={"Status Egzekucji"}
                    value={estateToEdit.executionStatus}
                    onChange={(value) => estateToEdit.executionStatus = value}
                    error={estateToEditValidation.executionStatusError.length > 0}
                    errorMessage={estateToEditValidation.executionStatusError}
                />
            }
                
            {estateToEdit.executionStatus !== "Nie podjęto" && (Number(estateToEdit.debet) > 0) &&
                <InlineDatePicker
                    fullWidth
                    style={{
                        marginTop: 10
                    }}
                    keyboard
                    clearable
                    variant="outlined"
                    label="Data rozpoczęcia postępowania windykacyjnego"
                    value={estateToEdit.executionStartDate}
                    onChange={(date) => estateToEdit.executionStartDate = date}
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
                value={estateToEdit.description}
                onChange={(e) => estateToEdit.description = e.target.value}
                error={estateToEditValidation.descriptionError.length > 0}
                placeholder="Opis nieruchomości"
                margin="normal"
                variant="outlined"
                helperText={estateToEditValidation.descriptionError}
            />  
        </FormControl>
    )
}))
