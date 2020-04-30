// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
// getvideo searches for the youtube video desired, and embedVideo puts that on an html sit
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const client = new MongoClient(uri, { useNewUrlParser: true });


// function that calls the video. q is the song search, returns song and info
 function getVideo(variable) {
      $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyCQBSBRJhWnl_R20nydi8IKyX96QXGp84k',
            q: variable + "music video",
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


// this should display video
function embedVideo(data) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
    $('h3').text(data.items[0].snippet.title)
    $('.description').text(data.items[0].snippet.description)
}

// For testing the script
function main() {
    var variable = "whatever song name is" + "artist name";
    var video = getVideo(variable);
    embedVideo(video);
}

