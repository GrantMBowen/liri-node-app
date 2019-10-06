require("dotenv").config();
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var question = process.argv.slice(3).join(" ");

// console.log(question);

switch(process.argv[2]) {
    
    case "concert-this":

        if(question === "") {
            var question = "String Cheese Incident"
        }
        function concertThis(){
        var queryURL = "https://rest.bandsintown.com/artists/" + question + "/events?app_id=codingbootcamp";

        axios.get(queryURL).then(
            function(response) {
                console.log("------------------------------------");
                // console.log(response);
                console.log(question);
                console.log("Description: " + response.data[0].description);
                console.log("Venue: " + response.data[0].venue.name);
                console.log("City: " + response.data[0].venue.city);
                console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
                console.log("------------------------------------");
            }
        );
        };
        concertThis();

    break;

    case "spotify-this-song":
            
            if (question === ""){
                var question = "the Sign ace of base";
                console.log(question);
            }

            function spotifyThisSong() {
            spotify.request('https://api.spotify.com/v1/search?q=track:' + question + '&type=track&limit=10').then(function(songResponse) {
                
            console.log("------------------------------------");
            console.log("Artist: " + songResponse.tracks.items[0].artists[0].name);
            console.log("Song: " + songResponse.tracks.items[0].name);
            console.log("URL: " + songResponse.tracks.items[0].preview_url);
            console.log("Album: " + songResponse.tracks.items[0].album.name);
            console.log("------------------------------------");
        }
            );
             
        };
        spotifyThisSong();
    break;

    case "movie-this":
         if (question === "") {
                var question = "Mr Nobody";
                // console.log(question);
        };

    function movieThis() {
        
            var queryURL = "http://www.omdbapi.com/?t=" + question + "&y=&plot=short&apikey=trilogy";

            axios.get(queryURL).then(
            
                function(movieResponse){
                    // console.log(movieResponse);
                    console.log("------------------------------------");
                    console.log("Title: " + movieResponse.data.Title);
                    console.log("Year: " + movieResponse.data.Year);
                    console.log("Rated: " + movieResponse.data.imdbRating);
                    console.log("Country: " + movieResponse.data.Country);
                    console.log("Language: " + movieResponse.data.Language);
                    console.log("Plot: " + movieResponse.data.Plot);
                    console.log("Actors: " + movieResponse.data.Actors);
                    console.log("Rotten Tomatoes: " + movieResponse.data.Ratings[0].Value);
                    console.log("------------------------------------");
                }
            );
            };
            movieThis();
    break;
    
    case "do-what-it-says":
            function doWhatInfo() {

                fs.readFile("random.txt", "utf8", function(error, data) {
                    var command;
                    var query;
            
                    // If there is a comma, then we will split the string from file in order to differentiate between the command and query
                    // 	--> if there is no comma, then only the command is considered (my-tweets)
                    if(data.indexOf(",") !== -1) {
                        var dataArr = data.split(",");
                        command = dataArr[0];
                        question = dataArr[1];
                    } else {
                        command = data;
                    };
            
                    // After reading the command from the file, decides which app function to run
                    if(command === "concert-this") {
                        concertThis(question);
                    } else if(command === "spotify-this-song") {
                        spotifyThisSong(query);
                        console.log(question, command);
                    } else if(command === "movie-this") {
                        movieThis(question);
                    } else { // Use case where the command is not recognized
                        console.log("Command from file is not a valid command! Please try again.")
                    };
                
                })
            };
                doWhatInfo();
                
            // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

            break;
        }
