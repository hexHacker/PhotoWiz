import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Badge from '@material-ui/core/Badge';


const StyledMenu = withStyles({
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));


const useStyles = makeStyles({
    listItemIcon: {
        minWidth: 25,
        color: '#111',
    },
    typography: {
        fontSize: 13,
        whiteSpace: 'normal',
        textTransform: 'capitalize'
    }
});


const StyledMenuItem = withStyles((theme) => ({
    root: {
        minWidth: '40vw',
        maxWidth: '55vw',
        borderBottom: '1px dashed #ccc',
        // backgroundColor: '#dce9f6',
        '&:hover': {
            backgroundColor: '#eee'
        }
        // '&:focus': {
        //     backgroundColor: theme.palette.secondary.main,
        //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        //         color: theme.palette.common.white,
        //     },
        // }
    }
}))(MenuItem);


export default function FavoritesMenu(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const handleClick = (event) => {
        if (props.favorites.length > 0)
            setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (fav) => {
        props.toggleFavorite(fav);

        if (props.favorites.length === 1) {
            // close favorites panel if last one deleted
            setAnchorEl(null);
        }
    }

    props.toggleFavorite.bind(this);

    return (
        <React.Fragment>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
            >
                <Badge showZero badgeContent={props.favorites.length} color="primary">
                    <FavoriteIcon />
                </Badge>
            </Button>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ opacity: 0.96 }}
            >
                {
                    props.favorites.map((fav) => (
                        <StyledMenuItem key={fav.id}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <DeleteIcon fontSize="small" onClick={handleDelete.bind(this, fav)} />
                            </ListItemIcon>
                            <Typography variant="body1" className={classes.typography} >
                                {fav.desc.length > 75 ? fav.desc.substring(0, 75) + '..' : fav.desc}
                            </Typography>
                        </StyledMenuItem>
                    ))
                }

            </StyledMenu>
        </React.Fragment >
    );
}
