import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          padding: theme.spacing(1, 2),
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(1, 3),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          },
        },
        logo: {
          width: '200px',
        },
        content: {
          width: '100%',
          background: theme.palette.custom.general.surfaceOne,
          marginTop: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(1),
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
          },
          [theme.breakpoints.up('lg')]: {
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 0,
            width: '60%',
            padding: theme.spacing(1, 3),
            flexWrap: 'nowrap',
          },
        },
        item: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: theme.spacing(1),
          width: '100%',
          '& .label': {
            marginRight: theme.spacing(1),
          },
          [theme.breakpoints.up('md')]: {
            width: '50%',
          },
          [theme.breakpoints.up('lg')]: {
            padding: 0,
            width: 'auto',
          },
        },
      });
    },
  )();

  return styles;
};
