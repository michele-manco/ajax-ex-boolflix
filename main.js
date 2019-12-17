  var api_url_base = 'https://api.themoviedb.org/3';
$(document).ready(function(){
$('.slabel').click(function(){
  // var searchy = $('#sfilter').val();
  // $('#sfilter').val('');
  userSearch();
  // $.ajax({
  //   'url': api_url_base + '/search/movie',
  //   'data':{
  //     'api_key':'1c2382ce77d5c3384075b987fc84ac1a',
  //     'query': 'star wars'
  //   },
  //   'method': 'GET',
  //   'success': function(data) {
  //     var film = data.results;
  //     for (var i = 0; i <film.length; i++) {
  //         var searched_movie = film[i];
  //         var titolo = searched_movie.title;
  //         var titolo_originale = searched_movie.original_title;
  //         var lingua = searched_movie.original_language;
  //         var voto = searched_movie.vote_average;
  //         console.log(titolo);
  //
  //     }
  //
  //
  //
  //
  //
  //
  //
  //   },
  //   'error': function(){
  //     alert('errore');
  //
  //   }
  // });
})
function userSearch(){
$('.movies').remove();
var source = $("#movies-template").html();
var template = Handlebars.compile(source);
var searchy = $('#sfilter').val();
if (searchy.length != 0) {
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
          var searched_movie = film[i];
          var titolo = searched_movie.title;
          var titolo_originale = searched_movie.original_title;
          var lingua = searched_movie.original_language;
          var voto = searched_movie.vote_average;
          console.log(searched_movie);


      }
      var html   = template(source);
      $('.movieswrapper').append(html);


    },
    'error': function(){
      alert('errore');

    }
  });
}
$('sfilter').val('');
}

});
// var source = {
//   title: titolo,
//   original_title: titolo_originale,
//   language : lingua,
//   rating: voto
//
// };
