import React, { useState } from 'react'
import { Fade, Backdrop, Grid, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Photo from './Photo'
//import './photos.css'


const styles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        background: '#fff',
        flexDirection: 'column',
        position: 'relative'
    },
    cardMedia: {
        transition: 'all 0.3s ease-in-out',

        paddingTop: '56.25%', // 16:9
        cursor: 'pointer',
        '&:hover': {
            // color: '#ddd',
            cursor: 'pointer',
            transform: 'scale(1.05)'
        }
    },
    cardContent: {
        flexGrow: 1,
    },
    typography: {
        textTransform: 'capitalize'
    },
    icon: {
        transition: 'all .2s ease-in-out',
        marginRight: theme.spacing(2),
        color: '#ec9f3f',
        position: 'absolute',
        top: 10,
        zIndex: 999,
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.25)'
        }
    },
    favIcon: {
        right: 10,
    },
    deleteIcon: {
        right: 40,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: '#fff',
        width: 'min-content',
        outline: 'none',
        borderRadius: 8,
        padding: 10,
        textTransform: 'capitalize',
    }
}));


export default function PhotoGallery(props) {

    const classes = styles();
    const [open, setOpen] = useState(false);
    const [modalInfo, setModelInfo] = useState({});

    const isMobile = () => {
        return window.innerWidth < 600;
    }

    // callback hook for modalInfo updates
    // useEffect(() => {
    //     if (Object.keys(modalInfo).length && !isMobile()) {
    //         setOpen(true);
    //     }
    // }, [modalInfo]);


    const handleOpenDialog = (id) => {
        setModelInfo(props.photos.find((f) => f.id === id));
        if (!isMobile()) {
            setOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };


    return (
        <Container className={classes.cardGrid} maxWidth="md">
            {/* REUSABLE MODAL  */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleCloseDialog}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <div className={classes.modalContent}>
                        <h3 id="transition-modal-description">{modalInfo.description}</h3>
                        <p id="transition-modal-description">{modalInfo.alt_description}</p>
                        <img src={modalInfo.urls && modalInfo.urls.small} alt={modalInfo.alt_description} />
                    </div>
                </Fade>
            </Modal>

            <Grid container spacing={4}>
                {
                    props.photos.map((photo) => (
                        <Grid item key={photo.id} xs={12} sm={6} md={4}>
                            <Photo id={photo.id} item={photo} deletePhoto={props.deletePhoto} toggleFavorite={props.toggleFavorite} isFavorite={props.isFavorite} classes={classes} handleOpenDialog={handleOpenDialog} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}

