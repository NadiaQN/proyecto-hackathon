/*Comenten su codigo coloquen que hace su funcion
y su nombre*/
$(document).ready(function(){
/*Search Movies*/
var inputSearch = "";
  $('#searchIndex, #search').click(function(){
    inputSearch = $('#inputSearchIndex, #inputSearch').val();
      if (inputSearch.length > 3){
      movieData = {};      
      $.ajax({
        url: 'http://www.omdbapi.com/?apikey=7a611467',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          movieData = data.Search;
          $('#inputSearch, inputSearchIndex').val("");
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
    });
     


/*FIN Search Movies*/

/*Dinamic profile info*/

/*FIN Dinamic profile info*/
/*Dinamic review profile*/
  /* function nada(){
  var i = 'tt0068885';
  var movieData = {}
  $.ajax({
      url: 'http://www.omdbapi.com/?apikey=7a611467',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        movieData = data;
        newReviewProfile();
      },
      error: function(err) {
          alert(JSON.stringify(err));
      }, 
      data: {
        i: i                 
        }
  })
} */
  function getMovies() {
    $('#searchMovies').empty();
  for (var i in movieData) {
    if (movieData[i].Poster !== 'N/A'){
    $('#searchMovies').append('<div class="col-md-4">'+          
    '<div class="container">'+
      '<div class="row">'+
        '<div class="col-md-4">'+
          '<div class="card">'+   
            '<div class="card-header">'+
              '<img class="card-img" src=' + movieData[i].Poster + 'alt="Card image">'+
            '</div>'+  
            '<div class="card-body">'+
              '<h4 class="card-title">' + movieData[i].Title + '</h4>'+                                  
              '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse beatae ab natus quod ex nostrum nam sequi repellat quidem facere, iste voluptate libero consequatur ratione recusandae! Id maxime accusamus esse doloremque porro dolor consequuntur voluptates vel veniam expedita quas facere minima quia, incidunt sequi sint voluptatem sed assumenda mollitia. Ad.</p>'+
              '<a href="#" class="orange-button pull-right">Opiniones</a>'+
            '</div>'+
          '</div>'+
        '</div>'+       
      '</div>'+
    '</div>'+
    '</div>')
    }
  }
  }

  /* function newReviewProfile() {
    $('#reviews').append('<div class="col-md-4">'+          
    '<div class="container">'+
      '<div class="row">'+
        '<div class="col-md-4">'+
          '<div class="card">'+   
            '<div class="card-header">'+
              '<img class="card-img" src=' + movieData.Poster + 'alt="Card image">'+
            '</div>'+  
            '<div class="card-body">'+
              '<h4 class="card-title">' + movieData.Title + '</h4>'+                                  
              '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse beatae ab natus quod ex nostrum nam sequi repellat quidem facere, iste voluptate libero consequatur ratione recusandae! Id maxime accusamus esse doloremque porro dolor consequuntur voluptates vel veniam expedita quas facere minima quia, incidunt sequi sint voluptatem sed assumenda mollitia. Ad.</p>'+
              '<a href="#" class="orange-button pull-right">Más Opiniones</a>'+
            '</div>'+
          '</div>'+
        '</div>'+       
      '</div>'+
    '</div>'+
    '</div>')
  } */
/*FIN Dinamic review profile*/
})