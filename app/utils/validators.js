const isEmpty = (string) => {
    if(string.length === 0) {
        return true;
    }
    return false;
}

const notEnoughChars = (a, b) => {
    if(string.length < a || string.length > b) {
        return true;
    }
    return false;
}

export const emptyValidation = (string) => {
    let message = "";
    if(isEmpty(string)){
        message = "To pole nie może być puste."
    }
    return message;
}

export const emailValidation = (string) => {
    let message = "";
    if(isEmpty(string)){
        message = "To pole nie może być puste."
    }
    return message
}

export const passwordValidation = (string) => {
    let message = "";
    if(isEmpty(string)){
        message = "To pole nie może być puste."
    }
    return message
}

export const phoneValidation = (string) => {
    let message = "";
    if(isEmpty(string)){
        message = "To pole nie może być puste."
    }
    return message
}

export const nameValidation = (string) => {
    let message = "";
    if(isEmpty(string)){
        message = "To pole nie może być puste."
    }
    return message
}

export const nipValidation = (string) => {
    let message = "";
    if(isEmpty(string)){
        message = "To pole nie może być puste."
    }
    return message
}