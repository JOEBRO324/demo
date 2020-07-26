(function () {
    "use strict";

    var buttonOk = document.getElementById("buttonOk");
    var inputName = document.getElementById("inputName");
    var inputCategory = document.getElementById("inputCategory");
    var inputReleaseDateBegin = document.getElementById("inputReleaseDateBegin");
    var inputReleaseDateEnd = document.getElementById("inputReleaseDateEnd");

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

    /////////////////////
    // add/save function
    /////////////////////
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

        var gameID = parseInt(document.getElementById("GameID").value, 10);
        var gameTitle = document.getElementById("Name").value;
        var gameCategory = document.getElementById("Category").value;
        var releaseDate = parseInt(document.getElementById("ReleaseDate").value, 10);

        var employee = { "GameId": gameID, "Name": gameTitle, "Category": gameCategory, "ReleaseDate": releaseDate };
        var employeeJSON = JSON.stringify(employee);

        //console.log(employeeJSON);
        xhr.open('POST', 'https://localhost:5001/games/insert', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(employeeJSON);
    };

    buttonSave.addEventListener("click", doInsert);


})();