
var request = require("request");
var Spotify = require('node-spotify-api');
const util = require("util");
var twitter = require("twitter");

var keys = require("./keys.js");
var twitterKeys = keys;

var callTwitter = new twitter(twitterKeys);

var spotify = new Spotify({
    id: "8d615a54ea5f4a6a94d87ff8327cf07d",
    secret: "0e9839847aa64f38b12e54a6f1b9dfc6"
});

var input = process.argv[2];

if(input === "my-tweets") {



    var params = {
        screen_name: "TestNicola54"
    };

    callTwitter.get('statuses/user_timeline', params, function(error, tweets) {

        if (!error) {

            for(var i = 0; i < tweets.length; i++){
                console.log(tweets[i].text);
                 console.log(tweets[i].user.created_at);

            }
        }
    })

}

else if (input === "spotify-this-song"){

    var songName = "";

    if (process.argv[3] != null)
        for (var i = 2; i < process.argv.length; i++) {

            if (i > 2 && i < process.argv.length) {

                songName = songName + "+" + process.argv[i];

            }
    }
    else{
        songName ="The+Sign+Ace+of+Base";
    }

    spotify.search({ type: 'track', query: songName}, function(err, response) {
        if ( err ) {
            console.log('Error occurred: ' + err);
        }
        var artistname = response.tracks.items[0].album.artists[0].name;
        var albumName = response.tracks.items[0].album.name;
        var songName = response.tracks.items[0].name;
        var preview = response.tracks.items[0].album.external_urls.spotify;

    //    console.log(util.inspect(response.tracks.items[0],false,null));
        console.log("Song: " + songName);
        console.log("Artist: " + artistname);
        console.log("Album: " + albumName);
        console.log("Click here to hear the song: " + preview);

    });
}
else if (input==="movie-this"){

    var movieName;
    if (process.argv[3] != null){
        movieName = process.argv[3];
    }
    else{
        movieName ="Mr. Nobody"
    }
    ;


        request("http://www.omdbapi.com/?t=" + movieName +"&y=&plot=short&apikey=40e9cece", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            var rottenTomatoes;
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            var ratings = body.Ratings;
            console.log(ratings);
            // for(var i=0; i < ratings.length - 1; i++){
            //
            //     if(ratings[i].Source ==="Rotten Tomatoes"){
            //         rottenTomatoes = body.Ratings[i].Value
            //     }
            // }
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).imdbRating);
            console.log("RT" + rottenTomatoes);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);


        }
    });

}
else if (input === "do-what-it-says"){

}
else{
    console.log("I'm sorry I don't recognize that command. Please try again.")
}
