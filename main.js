$(document).ready(function() {
  var api_url_base = 'https://api.themoviedb.org/3';
  var api_key = '1c2382ce77d5c3384075b987fc84ac1a';
  var url_movie = 'search/movie';
  var url_series = 'search/tv';
  var source = $("#movies-template").html();
  var template = Handlebars.compile(source);
  var searchy = $('#sfilter').val();

  $('.slabel').click(function() {

    // userSearch(),
    //   serieSearch(url_series);
    textControl($('#sfilter').val());

  });
  $(document).on('keypress', '.searchbar-input', function() {
    if (event.which == '13') {
      // userSearch();
      // serieSearch();
      textControl($('#sfilter').val());
    }
  });
  function textControl(searchy){
    if (searchy.length != 0) {
      $('.movies').remove();
      userSearch(searchy, url_movie);
      userSearch(searchy, url_series);
      $('#sfilter').val('');

    } else {
        alert('I got anything to search!!!');
    }

  }

  function userSearch(searchy, root) {

    $.ajax({
                url: api_url_base + '/search/movie',
                'data': {
                    'api_key': api_key,
                    'query': searchy,
                    'language': 'it-IT'
                },
                method: 'GET',
                success: function(data) {

                    if(data.total_results > 0) {
                        PrintOn(data, root);
                    } else {
                        alert('No query found');
                    }
                },
                error: function() {
                    alert('Error')
                }
            });



  }




  function PrintOn(data, root) {
    var film = data.results;
    for (var i = 0; i < film.length; i++) {
      if (root == 'search/movie') {
        var searched_movie = film[i];
        var titolo = searched_movie.title;
        var titolo_originale = searched_movie.original_title;
        var lingua = searched_movie.original_language;
        var voto = searched_movie.vote_average;
        var temp = {
          titolo: titolo,
          titolo_originale: titolo_originale,
          lingua: lingua,
          voto: voto

        }


      } else   {
        var searched_serie = serie[i];
        var titolo = searched_serie.name;
        var titolo_originale = searched_serie.original_name;
        var lingua = searched_serie.original_language;
        var voto = searched_serie.vote_average;

        var temp = {
          titolo: titolo,
          titolo_originale: titolo_originale,
          lingua: lingua,
          voto: voto

        }

      }
      var html = template(temp);
      $('#movi').append(html);
    }


  }



});






// {
//  $.ajax({
//    'url': api_url_base + tipo_chiamata,
//    'data': {
//      'api_key': '1c2382ce77d5c3384075b987fc84ac1a',
//      'query': searchy
//    },
//    'method': 'GET',
//    'success': function(data) {
//      var serie = data.results;
//      for (var i = 0; i < serie.length; i++) {
//        var searched_serie = serie[i];
//        var titolo = searched_serie.name;
//        var titolo_originale = searched_serie.original_name;
//        var lingua = searched_serie.original_language;
//        var voto = searched_serie.vote_average;
//
//        var temp = {
//          titolo: titolo,
//          titolo_originale: titolo_originale,
//          lingua: lingua,
//          voto: voto
//
//        };
//        console.log(source);
//        var html = template(temp);
//        $('#movi').append(html);
//
//      }
//
//
//
//    },
//    'error': function() {
//      alert('errore');
//
//    }
//  });
// }
// $('#sfilter').val('');
