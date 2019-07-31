export const buttonStyles = theme => ({
    gold:{
        color: theme.palette.gold.contrastText,
        backgroundColor: theme.palette.gold.main,
        "&:hover": {
            backgroundColor: theme.palette.gold.dark,
            "@media (hover: none)": {
                backgroundColor: theme.palette.gold.main
            }
        }
    },
    success:{
        color: theme.palette.success.contrastText,
        backgroundColor: theme.palette.success.main,
        "&:hover": {
            backgroundColor: theme.palette.success.dark,
            "@media (hover: none)": {
                backgroundColor: theme.palette.success.main
            }
        }
    },
    info:{
        color: theme.palette.info.contrastText,
        backgroundColor: theme.palette.info.main,
        "&:hover": {
            backgroundColor: theme.palette.info.dark,
            "@media (hover: none)": {
            backgroundColor: theme.palette.info.main
            }
        }
    },
    warning:{
        color: theme.palette.warning.contrastText,
        backgroundColor: theme.palette.warning.main,
        "&:hover": {
            backgroundColor: theme.palette.warning.dark,
            "@media (hover: none)": {
                backgroundColor: theme.palette.warning.main
            }
        }
    },
    danger:{
        color: theme.palette.danger.contrastText,
        backgroundColor: theme.palette.danger.main,
        "&:hover": {
        backgroundColor: theme.palette.danger.dark,
            "@media (hover: none)": {
                backgroundColor: theme.palette.danger.main
            }
        }
    },
    circleProgressSuccess: {
        color: theme.palette.success.main
    },
    circleProgressDanger: {
        color: theme.palette.danger.main
    },
    circleProgressWarning: {
        color: theme.palette.warning.main
    },
    circleProgressInfo: {
        color: theme.palette.info.main
    },
    circleProgressPrimary: {
        color: theme.palette.primary.main
    },
});