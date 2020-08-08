import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Typography,
	Backdrop,
	CircularProgress
} from '@material-ui/core';
import theme from './theme';

let MobileDrawer = React.lazy(() => import('./MobileDrawer'))
let DesktopDrawer = React.lazy(() => import('./DesktopDrawer'))


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function App() {
	const classes = useStyles();
	const [isMobile, setMobileDrawer] = React.useState(window.innerWidth < theme.breakpoints.values.sm);
	let prevVal = 0;

	window.addEventListener('resize', function () {
		let breakpoint = theme.breakpoints.values.sm;
		if (((breakpoint - prevVal) / (breakpoint - window.innerWidth)) < 0) {
			setMobileDrawer(window.innerWidth < breakpoint);
		}
		prevVal = window.innerWidth;
	});

	return (
		<div className={classes.root}>
			<Suspense
				fallback={
					<Backdrop open={true}>
						<CircularProgress />
					</Backdrop>
				}>
				{
					isMobile ? <MobileDrawer /> : <DesktopDrawer />
				}

				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Typography paragraph>
						Content comes here...
                	</Typography>
				</main>
			</Suspense>
		</div>
	);
}
