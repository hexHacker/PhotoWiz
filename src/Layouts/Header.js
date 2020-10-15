import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ColorLensOutlined from '@material-ui/icons/ColorLensOutlined';
import InputBase from '@material-ui/core/InputBase';
import FavoritesMenu from '../components/Favorites/FavoritesMenu'
import Hidden from '@material-ui/core/Hidden';


const useStyles = makeStyles((theme) => ({
    appbar: {
        background: 'url(https://spartansgym.com/wp-content/uploads/2011/10/banner-blur.jpg)',
        backgroundSize: 'cover',
        color: '#333',
        opacity: 0.96
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '70%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            // width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '80%',
        // [theme.breakpoints.up('md')]: {
        //     width: '25rem',
        // },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    }
}));


export default function Header(props) {

    const classes = useStyles();

    const handleChangeAndEnter = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            props.handleSearch(e.target.value);
        }
    }


    return (
        <AppBar className={classes.appbar} position="sticky">
            <Toolbar>
                <Hidden smDown>
                    <h1 >PhotoWiz</h1>
                </Hidden>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onKeyUp={(e) => handleChangeAndEnter(e)}
                    />
                </div>

                <ColorLensOutlined titleAccess="theme" style={{ cursor: 'pointer' }} onClick={props.toggleTheme} />

                <div style={{ position: 'absolute', right: 10 }}>
                    <FavoritesMenu favorites={props.favorites} toggleFavorite={props.toggleFavorite} removeFavorite={props.removeFavorite} />
                </div>

            </Toolbar>
        </AppBar>
    )
}