$(document).ready(function(){
$('.slabel').click(function(){
  var api_url_base = 'https://api.themoviedb.org/3';
  $.ajax({
    'url': api_url_base + '/search/movie',
    'data':{
      'api_key':'1c2382ce77d5c3384075b987fc84ac1a',
      'query': 'star wars'
    },
    'method': 'GET',
    'success': function(data) {
      var film = data.results;
      for (var i = 0; i <film.length; i++) {
          var film_corrente = film[i];
          var titolo = film_corrente.title;
          console.log(titolo);
      }
      console.log(data);






    },
    'error': function(){

    }
  });
})
});
// function usersearch(){
//
// }
