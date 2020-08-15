import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`
  },
  palette: {
    type: "dark",
    primary: {
      main: "#1c77ac",
    },
    secondary: {
      main: '#fc5226',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
/*
light blue:#8DBBF2
pink: #FACEDF
very light skin: #FDEECC
light yellow: #FFE088
purplish: #DC9CFD
green: #9CE47C
red: #F56A4E
YELLOW: #f7c331
*/

export default theme;