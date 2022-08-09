import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles((theme) => {
    return {
      container: {
        marginLeft: '14px',
      },
      icon: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px',
        justifyContent: 'center',
        '&:hover': {
          cursor: 'pointer',
        },
        '& svg': {
          fill: theme.palette.custom.general.icon,
          '& path': {
            fill: theme.palette.custom.general.icon,
          },
        },
      },
      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .MuiIconButton-root': {
          padding: 0,
        },
      },
      title: {
        display: 'flex',
        alignItems: 'center',
      },
      dialog: {
        '& .MuiDialog-paper': {
          width: '500px',
        },
      },
      formItem: {
        marginBottom: theme.spacing(2),
        '& .MuiTextField-root': {
          width: '100%',
        },
        '& .form-item--label': {
          marginBottom: theme.spacing(1),
        },
      },
      version: {
        color: theme.palette.custom.fonts.fontFour,
        marginLeft: theme.spacing(1),
      },
    };
  })();

  return styles;
};
