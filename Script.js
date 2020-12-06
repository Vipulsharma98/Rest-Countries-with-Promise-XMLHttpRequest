function getRestData(url) {
    return new Promise(function (resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status >= 200 && this.status <= 300) {
                resolve(this.responseText);
            }
        };
        xhttp.open("GET", url, false);
        xhttp.onerror = () => reject(xhttp.statusText);
        xhttp.send();
    })
}
function callApi() {
    getRestData("https://restcountries.eu/rest/v2/all").then(function (data) {

        let realData = JSON.parse(data);
        let len = realData.length;

        var mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'container text-center');

        var row = document.createElement('div');
        row.setAttribute('class', 'row');

        var col = document.createElement('div');
        col.setAttribute('class', 'col-sm-12');

        for (let i = 0; i < len; i++) {

            var card = newFunction();

            let name = document.createElement('div');
            name.setAttribute('class', 'card-title');
            name.innerHTML = "<h3> " + realData[i]["name"] + "</h3>" 
           

            let img = document.createElement('img');
            img.setAttribute('class', 'card-img-top');
            img.src = realData[i]["flag"];

            let bodyDiv = document.createElement('div');
            bodyDiv.innerHTML = "<h4>Capital : " + realData[i]["capital"] + "</h4>" + " <h4> Country Codes : " + realData[i]["cioc"] + "</h4>" + " <h4> Region : " + realData[i]["region"] + "</h4>" + " <h4> latlng: " + realData[i]["latlng"] + "</h4>" ;

            card.appendChild(name);
            card.appendChild(img);
            card.appendChild(bodyDiv);
            col.appendChild(card);

        }
        row.appendChild(col);
        mainDiv.appendChild(row);

        var body = document.getElementsByTagName('body');
        document.body.appendChild(mainDiv);


    }).catch(function (err) {
        console.log("error")
        console.log(err);
    })

    function newFunction() {
        var card = document.createElement('div');
        card.setAttribute('class', 'card col-sm-12');
        return card;
    }
}