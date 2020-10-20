import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavIcon from '@material-ui/icons/FavoriteBorder';
import FavIconFilled from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/DeleteOutline';


class Photo extends Component {

    render() {
        const { classes } = this.props;
        const { id, description, alt_description, urls } = this.props.item;


        const handleFavorites = (id, desc) => {
            this.props.toggleFavorite({
                id, desc
            });
        }

        // is this photo in favorites list?
        const isFavCss = this.props.isFavorite(id) ? 'isFavorite' : '';


        return (
            <Card className={classes.card}>
                <DeleteIcon className={classes.icon + ' ' + classes.deleteIcon} onClick={this.props.deletePhoto.bind(this, id)} />
                {!this.props.isFavorite(id)
                    ? <FavIcon className={classes.icon + ' ' + classes.favIcon + ' ' + isFavCss} onClick={handleFavorites.bind(this, id, description)} />
                    : <FavIconFilled className={classes.icon + ' ' + classes.favIcon + ' ' + isFavCss} onClick={handleFavorites.bind(this, id, description)} />
                }
                <CardMedia
                    className={classes.cardMedia}
                    image={urls.small}
                    title={alt_description}
                    onClick={this.props.handleOpenDialog.bind(this, id)}
                />
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.typography} gutterBottom variant="h6" component="h6">
                        {description && description.substring(0, 50)}
                    </Typography>
                    {/* <p className={classes.typography} >
                        {alt_description && alt_description.substring(0, 50)}
                    </p> */}
                </CardContent>
            </Card>
        )
    }

}

export default Photo