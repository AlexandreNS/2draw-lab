import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  logo: {
    margin: theme.spacing(1, 0.5),
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  title: {
    margin: theme.spacing(3, 1, 0, 0),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  heroContent: {
    padding: theme.spacing(8, 1, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  tools: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
  },
  paper: {
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'row',
  },
  colorPicker: {
    width: "20px",
    height: "20px",
    backgroundColor: "#000"
  },
  stroke: {
    margin: theme.spacing(1, 1.5),
  },
}));