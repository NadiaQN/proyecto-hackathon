/*Comenten su codigo coloquen que hace su funcion
y su nombre*/
$(document).ready(function(){
	/*PRUEBA*/
	// $.ajax({
	// 	url: 'http://www.omdbapi.com/?t=d&s=last&y=e&apikey=95951f8c',
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	success: function( data ) {
 //    	 // do things w/ oData (JS object)
 //    	 //console.log(data);
 //    	 $.each( data, function( key, value ) {
 //  			//console.log(key + ": " + value );
	//   			if(value == 'Adventure'){
	//   				//console.log(key+ ": " + value);
	//   			}
	// 		});
 //    	 for (var i in data) {
 //    	 	console.log(data[i]['Genre']);
 //    	 }
 //    	}
	// });
});



/*Dinamic profile info*/

/*FIN Dinamic profile info*/
/*Dinamic review profile*/
  var i = 'tt0068885';
  var movieData = {}
  $.ajax({
      url: 'http://www.omdbapi.com/?apikey=7a611467',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        movieData = data;
        newReviewProfile()
      },
      error: function(err) {
          alert(JSON.stringify(err));
      }, 
      data: {
        i: i                 
        }
  })

  function newReviewProfile() {
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
  }
/*FIN Dinamic review profile*/
})

