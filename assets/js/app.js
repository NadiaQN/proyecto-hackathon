/*Comenten su codigo coloquen que hace su funcion
y su nombre*/
$(document).ready(function() {
    $("#bodyIndex").load("init.html");
    $('.mt-logo, .mt-title').click(function() {
            $("#bodyIndex").load("init.html");
        })
        /*Search Movies*/
    var inputSearch = "";
    var movieData = {};
    $('#searchIndex').click(function() {
        searchMovie();
    });

    function searchMovie() {
        inputSearch = $('#inputSearchIndex').val();
        if (inputSearch.length > 3) {
            $("#bodyIndex").load("movies.html");
            $.ajax({
                url: 'http://www.omdbapi.com/?apikey=7a611467',
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    movieData = data.Search;
                    $('#inputSearchIndex').val("");
                    getMovies();
                },
                error: function(err) {
                    alert(JSON.stringify(err));
                },
                data: {
                    s: inputSearch
                }
            })
        }
    }
    $("#inputSearchIndex").keypress(function(e) {
        if (e.which == 13) {
            searchMovie();
        }
    });

    function getMovies() {
        $('#searchMovies').empty();
        for (var i in movieData) {
            if (movieData[i].Poster !== 'N/A') {
                $('#searchMovies').append('<div class="col-md-4">' +
                    '<div class="container">' +
                    '<div class="row">' +
                    '<div class="col-md-4">' +
                    '<div class="card">' +
                    '<div class="card-header">' +
                    '<a><img id="' + movieData[i].imdbID + '"class="card-img link" src=' + movieData[i].Poster + 'alt="Card image"></a>' +
                    '</div>' +
                    '<div class="card-body">' +
                    '<h4 class="card-title">' + movieData[i].Title + '</h4>' +
                    '<a href="#" class="orange-button pull-right">Opiniones</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>')
            }
        }
        $('.link').click(function() {
            var i = this.id
            $('#bodyIndex').load('reviews.html');
            $.ajax({
                url: 'http://www.omdbapi.com/?apikey=7a611467',
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    movieData = data;
                    movieReviews();
                },
                error: function(err) {
                    alert(JSON.stringify(err));
                },
                data: {
                    i: i
                }
            })
        })
    }
    /*FIN Search Movies*/
    /*Movie reviews */
    function movieReviews() {
        $('#posterImg').attr("src", movieData.Poster);
        $('#title').append('<label>' + movieData.Title + '</label>');
        $('#genre').append('<label>' + movieData.Genre + '</label>');
        $('#year').append('<label>' + movieData.Year + '</label>');
        $('#country').append('<label>' + movieData.Country + '</label>');
        $('#actors').append('<label>' + movieData.Actors + '</label>');
        $('#writer').append('<label>' + movieData.Writer + '</label>');
        $('#director').append('<label>' + movieData.Director + '</label>');
        $('#language').append('<label>' + movieData.Language + '</label>');
        $('#plot').append('<p>' + movieData.Plot + '</p>')
    }
    /*FIN Movie reviews */

    /*Dinamic profile info*/

    /*FIN Dinamic profile info*/

    /*Dinamic review profile*/
    function newReviewProfile() {
        $('#reviews').append('<div class="col-md-4">' +
            '<div class="container">' +
            '<div class="row">' +
            '<div class="col-md-4">' +
            '<div class="card">' +
            '<div class="card-header">' +
            '<img class="card-img" src=' + movieData.Poster + 'alt="Card image"/>' +
            '</div>' +
            '<div class="card-body">' +
            '<h4 class="card-title">' + movieData.Title + '</h4>' +
            '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse beatae ab natus quod ex nostrum nam sequi repellat quidem facere, iste voluptate libero consequatur ratione recusandae! Id maxime accusamus esse doloremque porro dolor consequuntur voluptates vel veniam expedita quas facere minima quia, incidunt sequi sint voluptatem sed assumenda mollitia. Ad.</p>' +
            '<a href="#" class="orange-button pull-right">Más Opiniones</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>')
    }
    /*FIN Dinamic review profile*/

})