// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
variable = "whatever song name is" + "artist name" + "music video"
// getvideo searches for the youtube video desired, and embedVideo puts that on an html sit
//we might have to display one song at a time using this code (user can select a song to appear)

// function that calls the video. q is the song search, returns song and info
 function getVideo(variable) {
      $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyCQBSBRJhWnl_R20nydi8IKyX96QXGp84k',
            q: variable,
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            embedVideo(data)
        },
        error: function(response){
            console.log("Request Failed");
        }
      });
    }

// not sure if this function will work
function mult_songs(list_songs) {
    var i;
    for (i = 0; i < list_songs.length; i++) { 
        getvideo(list_songs[i]);
    }
}
// this should display video
function embedVideo(data) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
    $('h3').text(data.items[0].snippet.title)
    $('.description').text(data.items[0].snippet.description)
}