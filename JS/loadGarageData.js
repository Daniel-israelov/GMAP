//Creating a table with garages info and link to map
const xhttp = new XMLHttpRequest();
xhttp.open('GET', '../DB/israel_garages_latlong.csv');
xhttp.send();
let posLink = '';
//callback
xhttp.onload = function () {
    const gData = xhttp.responseText.split('\r\n');
    const tbody = document.getElementsByTagName('tbody')[0];

    gData.shift(); //removes the headers
    gData.pop();   //removes the last blank row

    for (const row in gData) {
        if (gData.hasOwnProperty.call(gData, row)) {
            const element = gData[row].split(',');
            console.log(element)
            element.splice(1, 1)
            element.splice(6, 1).concat(element.splice(6, 1)).toLocaleString(); //removes x,y coordinates from 'element' array
            
            const xPos = element.splice(9, 1)
            const yPos = element.splice(9, 1)

            let tr = document.createElement("tr");
            for (const d in element) {
                //fill rows --> tr
                const cell = document.createElement("td");
                const td = document.createTextNode(element[d]);
                cell.appendChild(td);
                tr.appendChild(cell);
            }
            const a = document.createElement('a');
            const linkCelltd = document.createElement('td');
            posLink = '/html/map.html#18/' + xPos + '/' + yPos;
            a.setAttribute('href', posLink);
            a.appendChild(document.createTextNode("הצג במפה"))
            linkCelltd.appendChild(a)

            tr.appendChild(linkCelltd)
            tbody.appendChild(tr);
        }
    }
}

sessionStorage.setItem('navigationLink', posLink);