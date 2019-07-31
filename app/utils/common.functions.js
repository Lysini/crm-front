export const replacePolishChars = function (string) {
	return string
		.trim()
		.replace( /\s\s+/g, ' ') 
		.replace(/ą/g, 'a')
        .replace(/ć/g, 'c')
        .replace(/ę/g, 'e')
        .replace(/ł/g, 'l')
        .replace(/ń/g, 'n')
        .replace(/ó/g, 'o')
        .replace(/ś/g, 's')
        .replace(/ż/g, 'z')
        .replace(/ź/g, 'z');
}

export const combineStyles = (...styles) => {
    return function CombineStyles(theme) {
        const outStyles = styles.map((arg) => {
            if (typeof arg === 'function') {
                return arg(theme);
            }
            return arg;
        });
        return outStyles.reduce((acc, val) => Object.assign(acc, val));
    };
}

export const randomPassword = () => {
    return Math.random().toString(36).slice(-8);
}

export const convertReportStatus = (status) => {
    switch (status) {
        case "incompleted":
            return "Niewysłany"

        case "waiting":
            return "Oczekujący"
        
        case "accepted":
            return "Zaakceptowany"

        case "rejected":
            return "Odrzucony"
        default:
            return "Niezdefiniowany"
    }
}
  