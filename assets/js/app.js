/*Comenten su codigo coloquen que hace su funcion
y su nombre*/
$(document).ready(function() {
    login();
    $("#bodyIndex").load("init.html");
    $('.mt-logo, .mt-title').click(function() {
            $("#bodyIndex").load("init.html");
            reviewStop();
        })
        /*Search Movies*/
    var inputSearch = "";
    var movieData = {};
    $('#searchIndex').click(function() {
        reviewStop();
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
        } else {
            alert('Ingrese una búsqueda mas específica')
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
            indexMovie = this.id;
            $('#bodyIndex').load('reviews.html', function() {
                htmlReviewReady();
            });

        })
    }

    var indexMovie;

    function htmlReviewReady() {

        reviewInit(indexMovie);
        $('#btnSendReview').click(function() {
            var txtareaReviews = $('#txtareaReviews').val();
            writeNewComment(uid, txtareaReviews, indexMovie);
            writeNewcommentsUser(uid, txtareaReviews, indexMovie);
        })
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
                i: indexMovie
            }
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
    var uid = '';
    var config = {
        apiKey: "AIzaSyBrZiYy278z8uvHWaoqhX92jSmeTnquo-o",
        authDomain: "moviehack-a7344.firebaseapp.com",
        databaseURL: "https://moviehack-a7344.firebaseio.com",
        projectId: "moviehack-a7344",
        storageBucket: "moviehack-a7344.appspot.com",
        messagingSenderId: "304005422215"
    };
    firebase.initializeApp(config);

    $('#btnSesion').click(function() {
        var email = $('#emailRegister').val();
        var pass = $('#passwordRegister').val();
        var auth = firebase.auth();
        $('#emailRegister').val("");
        $('#passwordRegister').val("");
        // Sign in
        var promise = auth.signInWithEmailAndPassword(email, pass)
            .then(function(user) {
                console.log(user);
            })
            .catch(e => console.log(e.message));
    });

    $('#btnRegistrarse').click(function() {
        var email = $('#emailRegister').val();
        var pass = $('#passwordRegister').val();
        var name = $('#usernameRegister').val();
        var country = $('#countryRegister').val();
        var auth = firebase.auth();
        $('#emailRegister').val("");
        $('#passwordRegister').val("");
        // Sign in
        var promise = auth.createUserWithEmailAndPassword(email, pass)
            .then(function(user) {
                writeUserData(user.uid, email, pass, name, country);
                console.log(user);
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('Contraseña muy débil');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    });

    $('#logout-form-link').click(e => {
        firebase.auth().signOut();
    });
    //logear en tiempo real
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            $('#login-form-link').hide();
            $('#register-form-link').hide();
            $('#logout-form-link').removeClass('hide');
            $('#writeReview').addClass('enabled');
            console.log(firebaseUser);
            uid = firebaseUser.uid;
            UserInit();
            start();
        } else {
            $('#login-form-link').show();
            $('#register-form-link').show();
            $('#logout-form-link').addClass('hide');
            $('#bodyIndex').load('init.html');
            $('#writeReview').addClass('disabled');
            console.log('no logueado');
            UserStop();
            stop();
            //$('#logOut').classList.add('hide');
        }
    });
    // Obtener prototipo de fecha
    Date.prototype.yyyymmdd = function() {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]); // padding
    };

    // Referencia a Reviews
    var eventReReview;

    function reviewInit(idMovie) {
        eventReReview = firebase.database().ref('/REVIEWS/' + idMovie);

        eventReReview.on('child_added', function(data) {
            addReview(data.key, data.val());
        });

        eventReReview.on('child_changed', function(data) {
            changedReview(data.key, data.val());
        });

        eventReReview.on('child_removed', function(data) {
            deleteReview(data.key);
        });

    }

    function writeNewComment(uid, comment, idMovie) {
        var date = new Date();
        // A post entry.
        var postData = {
            comment: comment,
            date: date.yyyymmdd(),
            idUser: uid
        };

        var messageListRef = firebase.database().ref('/REVIEWS/' + idMovie);
        var newMessageRef = messageListRef.push();
        newMessageRef.set(postData);
    }

    function reviewStop() {
        if (eventReReview) {
            eventReReview.off();
        }
    }
    // HTML para contener los reviews
    function addReview(key, data) {
        /* $('#contentReviews').append('<div id="' + key +
            '" class="col-md-6 col-xs-12"><p data-iduser="' + data.idUser + '"class="linkProfileUser" >' + data.comment + '</p></div>') */

        $('#contentReviews').append('<div class="col-md-5 color-reviews" id="' + key +
            '"><div class="user-reviews"><div class="col-md-4 user_"><img src="assets/img/user.png"/>' +
            '<a class="user-name linkProfileUser" data-iduser="' + data.idUser + '">Nombre Usuario</a></div>' +
            '<div class="col-md-8 reviews"><p">' + data.comment + '</p></div></div></div>')
        console.log("key: " + key + " data: " + data);
        $('.linkProfileUser').click(function() {
            var dataIdUser = $(this).data('iduser');
            for (var i in users) {
                if (dataIdUser === i) {
                    userProfile = users[i];
                    $('#bodyIndex').load('profile.html', function() {
                        reviewStop();
                        readyHtmlProfile();
                    });
                }
            }
        })
    }

    function changedReview(key, data) {

        console.log("key: " + key + " data: " + data);

    }

    function deleteReview(key) {

        console.log("key: " + key);
    }
    //Fin referencia review
    // Referencia a commentsUser
    var eventReCommentsUser;

    function CommentsUserInit(uid) {
        eventReCommentsUser = firebase.database().ref('/COMMENTS/' + uid);

        eventReCommentsUser.on('child_added', function(data) {
            addRCommentsUser(data.key, data.val());
        });

        eventReCommentsUser.on('child_changed', function(data) {
            changedCommentsUser(data.key, data.val());
        });

        eventReCommentsUser.on('child_removed', function(data) {
            deleteCommentsUser(data.key);
        });

    }

    function writeNewcommentsUser(uid, comment, idMovie) {
        var date = new Date();
        // A post entry.
        var postData = {
            comment: comment,
            idMovie: idMovie
        };

        var messageListRef = firebase.database().ref('/COMMENTS/' + uid);
        var newMessageRef = messageListRef.push();
        newMessageRef.set(postData);
    }

    function commentsUserStop() {
        if (eventReReview) {
            eventReReview.off();
        }
    }
    // FIN Referencia a User
    var eventReUser;
    var users = {};

    function UserInit() {
        eventReUser = firebase.database().ref('/USER/');

        eventReUser.on('child_added', function(data) {
            users[data.key] = data.val();
            console.log(data.key + ' ' + data.val());
        });

        eventReUser.on('child_changed', function(data) {
            users[data.key] = data.val();
            console.log(data.key + ' ' + data.val());
        });

        eventReUser.on('child_removed', function(data) {
            console.log(data.key);
        });

    }
    // Añadir usuario a la BD
    function writeUserData(userId, email, pass, name, country) {
        var date = new Date();
        firebase.database().ref('/USER/' + userId).set({
            email: email,
            name: name,
            password: pass,
            country: country,
            profilePic: '',
            date: date.yyyymmdd()
        });
    }

    function UserStop() {
        if (eventReUser) {
            eventReUser.off();
        }
    }
    // FIN Referencia a User
    var userProfile = {};


    function readyHtmlProfile() {
        $('#profileName').html(userProfile.name + '<small> ' + userProfile.country + '</small>');
        $('#countryProfile').text(userProfile.country)
    }

    function start() {

    };

    function stop() {

    };

    function login() {
        $('#login-form-link').click(function(e) {
            $("#login-register-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('.reg').addClass('hide');
            $('.hideLog').removeClass('hide');

        });
        $('#register-form-link').click(function(e) {
            $("#login-register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('.reg').removeClass('hide');
            $('.hideLog').addClass('hide');

        });
    }

})