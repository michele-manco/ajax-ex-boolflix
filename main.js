$(document).ready(function() {
  var api_url_base = 'https://api.themoviedb.org/3';
  var api_key = '1c2382ce77d5c3384075b987fc84ac1a';
  var url_movie = 'search/movie';
  var url_series = 'search/tv';
  var source = $("#movies-template").html();
  var template = Handlebars.compile(source);
  var searchy = $('#sfilter').val();
  var flagg = ['en', 'it', 'de', 'fr', 'ru'];
  var img_url_base = 'https://image.tmdb.org/t/p/​ ';
  var img_size = 'w342';

  $('.slabel').click(function() {


    textControl($('#sfilter').val());

  });
  $(document).on('keypress', '.searchbar-input', function() {
    if (event.which == '13') {

      textControl($('#sfilter').val());
    }
  });

  function textControl(searchy) {
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
      url: api_url_base + '/' + root,
      'data': {
        'api_key': api_key,
        'query': searchy,
        'language': 'it-IT'
      },
      method: 'GET',
      success: function(data) {

        if (data.total_results > 0) {
          var film = data.results;
          var serie = data.results
          PrintOn(data, root);
        } else {
          $('#movi').append('No file for this query');


        }
      },
      error: function() {
        alert('Error')
      }
    });




  }




  function PrintOn(data, root) {
    var film = data.results;
    var serie = data.results;
    for (var i = 0; i < film.length; i++) {
      if (root == 'search/movie') {
        var searched_movie = film[i];
        // var titolo = searched_movie.title;
        if (searched_movie.hasOwnProperty('title')) {
          var titolo = searched_movie.title;
          var tipo = 'Movie';

        } else  if (root == 'search/tv'){
          var titolo = searched_movie.name;
          var tipo = 'TV series';

        }
        if (searched_movie.hasOwnProperty('original_title')) {
          var titolo_originale = searched_movie.original_title;

        } else {
          var titolo_originale = searched_movie.original_name;
        }
        // var titolo_originale = searched_movie.original_title;
        var lingua = searched_movie.original_language;
        var voto = searched_movie.vote_average;
        var star_num = standardize(voto);
        var posterimg = img_url_base + img_size + searched_movie.poster_path;
        console.log(posterimg);
        var temp = {
          titolo: '<h2>' + titolo + '</h2>',
          titolo_originale: titolo_originale,
          lingua: flag_maker(lingua),
          voto: star_maker(star_num),
          type: '<h3>' + tipo + '</h3>',
          image: posterimg

        }


      } else {
        var searched_serie = serie[i];
        var titolo = searched_serie.name;
        var titolo_originale = searched_serie.original_name;
        var lingua = searched_serie.original_language;
        var voto = searched_serie.vote_average;
        var star_num = standardize(voto);
        var posterimg = img_url_base + img_size + searched_serie.poster_path;
        console.log(posterimg);

        var temp = {
          titolo: '<h2>' + titolo + '</h2>',
          titolo_originale: titolo_originale,
          lingua: flag_maker(lingua),
          voto: star_maker(star_num),
          type: '<h3>' + tipo + '</h3>',
          image: posterimg

        }

      }
      var html = template(temp);
      $('#movi').append(html);
    }


  }

  function standardize(votation) {
    var half = votation / 2;
    var rounded_numb = Math.ceil(half);
    return rounded_numb;

  }

  function star_maker(n_star) {
    var star = '';
    for (var i = 0; i < 5; i++) {
      if (i < n_star) {
        star = star + '<i class="fas fa-star"></i>';
      } else {
        star = star + '<i class="far fa-star"></i>'
      }
    }
    return star;
  }

  function flag_maker(lingo) {
    var country = '';
    if (flagg.includes(lingo)) {
      country = '<img src="flags/' + lingo + '.png">'

    } else {
      country = lingo;
    }
    return country;
  }
});
// $.ajax({
//     url: api_url_base + '/search/tv',
//     'data': {
//       'api_key': api_key,
//       'query': searchy,
//       'language': 'it-IT'
//     },
//     method: 'GET',
//     success: function(data) {
//
//       if (data.total_results > 0) {
//         var serie = data.results;
//         PrintOn(data, root);
//       } else {
//
//       }
//     },
//     error: function() {
//       alert('Error')
//     }
//   });
