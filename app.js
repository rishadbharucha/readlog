var app = (function () {

  var files = {};

  var getData = function (filename, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback(xhttp.responseText);
      }
    };
    xhttp.open("GET", filename, true);
    xhttp.send();
  };

  var parseData = function (data) {
    var parsed = getDataArray(data);

    parsed.forEach(function (line) {
      var lineArray = line.split(' ');
      if (parseInt(lineArray[5]) === 200) {
        if (files[lineArray[3]] > 0) {
          files[lineArray[3]] += parseInt(lineArray[6]);
        } else {
          files[lineArray[3]] = parseInt(lineArray[6]);
        }
      }
    });

    var sortable = [];

    for (var file in files) {
      sortable.push([file, files[file]]);
    }

    var result = sortable.sort(function (a, b) {
      return a[1] - b[1];
    });

    for (var i in result) {
      console.log(result[i][0], result[i][1]);
    }

    // document.getElementById("log").innerHTML = data;
  };

  var getDataArray = function (input) {
    return input.match(/[^\r\n]+/g);
  };

  return {
    init: function (filename) {
      getData(filename, parseData);
    }
  };

})();

app.init("web.log");