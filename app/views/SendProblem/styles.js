export const styles = theme => ({
    cssLabel: {
      '&$cssFocused': {
        color: '#f8b133',
      },
    },
    cssFocused: {},
    cssUnderline: {
      '&:after': {
        borderBottomColor: '#f8b133',
      },
    },
    primaryBorder: {
        borderColor: '#f8b133',
        borderStyle: 'solid',
        borderWidth: 1
    },
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: '#f8b133',
      },
    },
    notchedOutline: {},
    outlined: {
      '& $notchedOutline': {
        borderColor: '#f8b133',
      },
    },
});