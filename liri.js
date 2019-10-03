require("dotenv").config();
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var keys = require("./keys.js");

var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var question = process.argv.slice(3).join("-");

console.log(question);

switch(process.argv[2]) {
    
    case "concert-this":
        function concertThis(){
        
        var queryURL = "https://rest.bandsintown.com/artists/" + question + "/events?app_id=codingbootcamp";

        axios.get(queryURL).then(
            function(response) {
                console.log("Venue: " + response.data[0].venue.name);
                console.log("City: " + response.data[0].venue.city);
                console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
            }
        );
        };
        concertThis();

        //    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

        //    * Name of the venue

        //    * Venue location

        //    * Date of the Event (use moment to format this as "MM/DD/YYYY")
    break;

    case "spotify-this-song":
            function spotifyThisSong() {
            if (question === ""){
                var question = "the Sign ace of base";
            }
            spotify.request('https://api.spotify.com/v1/search?q=track:' + question + '&type=track&limit=10', function(error, songResponse) {
                
            if (error){
                    return console.log(error);
                }
                console.log("Artist: " + songResponse.tracks.items[0].artists[0].name);
                console.log("Song: " + songResponse.tracks.items[0].name);
                console.log("URL: " + songResponse.tracks.items[0].preview_url);
                console.log("Album: " + songResponse.tracks.items[0].album.name);
            });        
        };
    break;

    case "movie-this":

    function movieThis() {
            if (question === "") {
                var question = "Mr Nobody";
        }
            var queryURL = "http://www.omdbapi.com/?t=" + question + "&y=&plot=short&apikey=trilogy";

            axios.get(queryURL).then(
            
                function(movieResponse){
                    console.log("Title: " + movieResponse.data.Title);
                    console.log("Year: " + movieResponse.data.Year);
                    console.log("Rated: " + movieResponse.data.imdbRating);
                    console.log("Country: " + movieResponse.data.Country);
                    console.log("Language: " + movieResponse.data.Language);
                    console.log("Plot: " + movieResponse.data.Plot);
                    console.log("Actors: " + movieResponse.data.Actors);
                    console.log("Rotten Tomatoes: " + movieResponse.data.Ratings[1].Value);
                }
            );
            }
    break;
    
    // case "do-what-it-says":
    //         function doWhatInfo() {

    //             fs.readFile("random.txt", "utf8", function(error, data) {
    //                 var command;
    //                 var query;
            
    //                 // If there is a comma, then we will split the string from file in order to differentiate between the command and query
    //                 // 	--> if there is no comma, then only the command is considered (my-tweets)
    //                 if(data.indexOf(",") !== -1) {
    //                     var dataArr = data.split(",");
    //                     command = dataArr[0];
    //                     query = dataArr[1];
    //                 } else {
    //                     command = data;
    //                 }
            
    //                 // After reading the command from the file, decides which app function to run
    //                 if(command === "concert-this") {
    //                     concertThis();
    //                 } else if(command === "spotify-this-song") {
    //                     spotifyThisSong(query);
    //                     console.log(query, command);
    //                 } else if(command === "movie-this") {
    //                     movieThis(query);
    //                 } else { // Use case where the command is not recognized
    //                     console.log("Command from file is not a valid command! Please try again.")
    //                 };
                

    //             doWhatInfo();
                
            // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

            // * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
       
            // * Edit the text in random.txt to test out the feature for movie-this and concert-this.
    break;
}
            
        