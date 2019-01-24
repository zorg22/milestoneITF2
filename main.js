var searchedMovieID = -1;

function fetchData() {
    return fetch('https://us-central1-itfighters-movies.cloudfunctions.net/api/movie')
        .then(resp => {
            return resp.json();
        })
        .catch(() => {
            alert('Nie udało się pobrać danych :(');
        })
}

function showMovie(movies) {
    $('#content').append('<li></li>');
    $('#content li').last().append('<img>');
    $('li img').attr('src', movies[searchedMovieID - 1].imgSrc);
    for (key in movies[searchedMovieID - 1]) {
        console.log(key);
        if ((key !== 'id') && (key !== 'imgSrc')) {
            $('#content').append('<li></li>');
            $('#content li').last().text(function () {
                var text = ''
                switch (key) {
                    case 'title':
                        text += 'Tytuł: ';
                        break;
                    case 'year':
                        text += 'Rok premiery: ';
                        break;
                    case 'rate':
                        text += 'Ocena: ';
                        break;
                }
                text += movies[searchedMovieID - 1][key];
                return text;
            });
        }
    }
}

function deleteMovie() {
    //Not ready yet ;) 
    console.log(searchedMovieID);
    var movieURL = 'https://us-central1-itfighters-movies.cloudfunctions.net/api/movie/?id=';
    movieURL += searchedMovieID;
    console.log(movieURL);
}

function findMovie() {
    $('#content').empty();
    $('#error').css({ display: 'none'} );
    fetchData().then(movies => {
        for (movie in movies) {
            if (($('#title').val()) == movies[movie].title) {
                searchedMovieID = movies[movie].id;
                showMovie(movies);
            }
        }
        if (($('#title').val()) === 'Tytuł filmu...') {
            $('#error').text('Podaj tytuł filmu.');
            $('#error').css({ display: 'block' });
        } else if ((($('#title').val()) !== 'Tytuł filmu...') && (searchedMovieID == -1)) {
            $('#error').text('Niestety nie znaleźliśmy takiego filmu.');
            $('#error').css({ display: 'block' });
        } 
    });
}


$(document).ready(() => {
    console.log(searchedMovieID);
    $('#search').click(findMovie);
    $('#remove').click(deleteMovie);
});