import React, { Component } from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core';

import PhotoGallery from './components/Photos/PhotoGallery'
import { Header, Footer } from './Layouts'
import Unsplash, { toJson } from 'unsplash-js';
import './App.css';


const unsplash = new Unsplash({
  accessKey: "cnDKzdyQV7xzUw7pU9UWini2PMmw0qdBEgNUYpoKMOY",
  secret: "FGOUrTjAhyvxDU2IqZnV4ln4LpZEg7YsP0s-hCi9iZU"
});



class App extends Component {
  state = {
    photos: [],
    search: '',
    favorites: [],
    isUpdating: false,
    theme: 'dark'
  };

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }))
  }


  componentDidMount() {
    this.SearchPhotos();
  }


  SearchPhotos = () => {
    this.setState({ isUpdating: true })
    unsplash
      .photos.getRandomPhoto({ "query": this.state.search, "count": 15 })
      .then(toJson)
      .then(json => {
        this.setState({ photos: json })
      })
      .catch(() => {
        console.log('error!');
      })
      .finally(() => {
        this.setState({ isUpdating: false })
      })
  }


  UpdateSearch = val => {
    this.setState({ search: val }, () => {
      this.SearchPhotos();
    });
  }


  AddFavorite(fav) {
    this.setState({ favorites: this.state.favorites.concat(fav) });
  }


  RemoveFavorite(id) {
    this.setState({ favorites: this.state.favorites.filter(f => f.id !== id) });
  }


  ToggleFavorite = fav => {
    // If fav exists then remove
    if (this.state.favorites.find(f => f.id === fav.id)) {
      this.RemoveFavorite(fav.id);
    }
    // else add it
    else {
      this.AddFavorite(fav);
    }
  }


  IsFavorite = favID => {
    return this.state.favorites.find(f => f.id === favID);
  }


  DeletePhoto = id => {
    this.setState({
      photos: [...this.state.photos.filter(p => p.id !== id)]
    });
    this.RemoveFavorite(id);
    //);
  };


  render() {
    return (

      <div className={'app ' + this.state.theme}>

        <Header photos={this.state.photos.length} favorites={this.state.favorites} toggleTheme={this.toggleTheme} toggleFavorite={this.ToggleFavorite} removeFavorite={this.RemoveFavorite} handleSearch={this.UpdateSearch} />

        <Backdrop open={this.state.isUpdating} style={{ color: '#111', zIndex: 9 }}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* <div style={{ marginTop: '9vw' }}>&nbsp;</div> */}

        {this.state.photos.length > 0
          ? <PhotoGallery photos={this.state.photos} search={this.state.Search} favorites={this.state.favorites} removeFavorite={this.AadFavorite} deletePhoto={this.DeletePhoto} toggleFavorite={this.ToggleFavorite} isFavorite={this.IsFavorite} />
          : <h3 style={{ textAlign: 'center' }}>No matching photos found!</h3>
        }

        <Footer />

      </div>

    );
  }
}

export default App;
