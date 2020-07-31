(function () {
    "use strict";

    var buttonOk = document.getElementById("buttonOk");
    var inputName = document.getElementById("inputName");
    var inputCategory = document.getElementById("inputCategory");
    var inputReleaseDateBegin = document.getElementById("inputReleaseDateBegin");
    var inputReleaseDateEnd = document.getElementById("inputReleaseDateEnd");


    ///////////////////////////////////////////////////////////////////////////

    ///////////////////
    // search function
    ///////////////////
    var doSearch = function () {

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    var games = JSON.parse(xhr.responseText);

                    var table = '<table class="table table-sm table-bordered"><thead><tr><th scope="col">GameID</th><th scope="col">Name</th><th scope="col">Category</th><th scope="col">Release Date</th></tr></thead><tbody>';

                    var i;
                    for (i = 0; i < games.length; i++) {
                        table = table + '<tr><th>' + games[i].gameID + '</th><td>' + games[i].name + '</td><td>' + games[i].category + '</td><td>' + games[i].releaseDate + '</td><td></tr>';
                    }

                    table = table + '</tbody></table>';

                    document.getElementById("response_01").innerHTML = table;
                } else {
                    console.log('Error: ' + xhr.status);
                }
            }
        };

        var name = inputName.value;
        var category = inputCategory.value;
        var releaseDateBegin = inputReleaseDateBegin.value;
        var releaseDateEnd = inputReleaseDateEnd.value;

        var URL = 'https://localhost:5001/games/search?name=' + name + "&category=" + category + "&releasedatebegin=" + releaseDateBegin + "&releasedateend=" + releaseDateEnd;

        xhr.open('GET', URL);
        xhr.send(null);
    };

    buttonOk.addEventListener("click", doSearch);

/////////////////////////////////////////////////////////////////////


    //////////////////
    //input function
    //////////////////
    var buttonSave = document.getElementById("buttonSave");

    var doInsert = function () {

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    alert(xhr.responseText);
                } else {
                    alert(xhr.responseText);
                }
            }
        };

        var inputName = document.getElementById("inputName2");
        var name = inputName.value;

        var inputCategory = document.getElementById("inputCategory2");
        var category = inputCategory.value;

        var inputReleaseDate = document.getElementById("inputReleaseDate");
        var releaseDate = new Date(inputReleaseDate.value);

        var game = { "Name": name, "Category": category, "ReleaseDate": releaseDate };
        var gameJSON = JSON.stringify(game);

        //console.log(gameJSON);
        xhr.open('POST', 'https://localhost:5001/games/insert', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(gameJSON);
    };

    buttonSave.addEventListener("click", doInsert);

    /////////////////////////////////////////////////////////////////////

    ///////////////////////
    //delete function
    ///////////////////////

    var buttonDelete = document.getElementById("buttonDelete");

    var doDelete = function () { 

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    alert(xhr.responseText);
                } else {
                    alert(xhr.responseText);
                }
            }
        };

        var inputGameID = document.getElementById("inputGameID");
        var gameID = inputGameID.value;


        var URL = 'https://localhost:5001/games/delete/' + gameID ;

        xhr.open('GET', URL);
        xhr.send(null);
    };

    buttonDelete.addEventListener("click", doDelete);


    ///////////////////////////////////////////////////////////////////////

    ////////////////////
    //navbuttons
    ////////////////////

    var navButtons = document.getElementsByClassName("jl-nav");
    var gameSearch = document.getElementById("game-search");
    var gameInput = document.getElementById("game-input");
    var gameDelete = document.getElementById("game-delete");

    var handleNavClick = function(event) {
        
        //highlight clicked navbutton 
        var i;
        for(i = 0; i < navButtons.length; i++) {
            var navButton = navButtons[i];
            navButton.classList.remove("active");
        };
        event.target.classList.add("active");

        //show selected form
        gameSearch.classList.add("jl-hidden");
        gameInput.classList.add("jl-hidden");
        gameDelete.classList.add("jl-hidden");

        var idToShow = event.target.dataset.page;
        var pageToShow = document.getElementById(idToShow);
        pageToShow.classList.remove("jl-hidden");
    };

    var i;
    for(i = 0; i < navButtons.length; i++) {
        var navButton = navButtons[i];
        navButton.addEventListener("click", handleNavClick);
    };



})();