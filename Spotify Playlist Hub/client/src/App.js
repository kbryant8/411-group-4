import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: ''
      },
      fetchedPlaylists: {
        playlists: ''
      },
      fetchedRandomSong:{
        song: '',
        image: ''
      }
    }
    if (params.access_token) {  
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() { // ERROR WHEN NO SONG PLAYING 
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      this.setState({   
        nowPlaying: {
          name: response.item.name, 
          image: response.item.album.images[0].url
        }
      })
    })
  }

  getRandomSong() { // fetches a string random song from users playlists to be used by Youtube API
    spotifyWebApi.getUserPlaylists()
    .then((response) => {
      let playlistCount = response.items.length;
      let randomPlaylistIndex = Math.floor(Math.random() * playlistCount);
      let songCount = response.items[randomPlaylistIndex].tracks.total;
      let randomSongIndex = Math.floor(Math.random() * songCount);
      let playlistID = response.items[randomPlaylistIndex].id;

      let songName = '';
      let songImage = '';

      spotifyWebApi.getPlaylistTracks(playlistID)
      .then((response => {
      songName = response.items[randomSongIndex].track.name
      songImage = response.items[randomSongIndex].track.album.images[0].url

      this.setState({
        fetchedRandomSong: {
          song: songName,
          image:songImage
        }
      })
      }))
    })
  }

  displayUserPlaylists() { // fetches string of playlists + # songs within
    spotifyWebApi.getUserPlaylists()
    .then((response) => {
      let plist = "";
      for (var i = 0; i < response.items.length; i++) {
        plist+= response.items[i].name + " : " + response.items[i].tracks.total + " songs | "
      }
      this.setState({
        fetchedPlaylists: {
          playlists: plist
        }
      })
    })
  }


  render() {
  return (
    <div className="App">
      <a href='http://localhost:8888'> 
        <button>Spotify Login</button>
      </a>
      <div> Now Playing: { this.state.nowPlaying.name } </div>
      <div> 
        <img src={ this.state.nowPlaying.image } style={{width: 300}} />
      </div>
      <button onClick={() => this.getNowPlaying()}> 
        Check Now Playing
      </button>
      <button onClick={() => this.displayUserPlaylists()}>
        Fetch User Playlists
      </button>
      <div> User Playlists: {this.state.fetchedPlaylists.playlists } </div>
      <button onClick={() => this.getRandomSong()}>
        Fetch Random Song and Pull Up on Youtube
      </button>
      <div> Random Song: {this.state.fetchedRandomSong.song } </div>
      <div>
        <img src= {this.state.fetchedRandomSong.image } style={ {width:300}} />
      </div>
    </div>
   );
  }
}

export default App;
