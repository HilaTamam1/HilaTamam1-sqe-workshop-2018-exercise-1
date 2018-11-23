import $ from 'jquery';
import { parseCode } from './code-analyzer';
import { Parsing } from './parse';
// import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants';
import { clear } from './parse';

let infoTable = [];

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        infoTable = Parsing(parsedCode.body);
        createTableInHTML();
        // console.log(infoTable);
        clear();
        infoTable = [];
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
});
//draw the table
function createTableInHTML() {
    var table = document.getElementById('myTable');
    table.style.visibility = 'visible';
    for (let index = 1; index <= infoTable.length; index++) {
        const element = infoTable[index - 1];
        var row = table.insertRow(index);
        var cellLine = row.insertCell(0);
        var cellType = row.insertCell(1);
        var cellName = row.insertCell(2);
        var cellCondition = row.insertCell(3);
        var cellValue = row.insertCell(4);
        cellLine.innerHTML = addValue(element.Line);
        cellType.innerHTML = addValue(element.Type);
        cellName.innerHTML = addValue(element.Name);
        cellCondition.innerHTML = addValue(element.Condition);
        cellValue.innerHTML = addValue(element.Value);
    }

}

//return the value
function addValue(element) {
    if (element == undefined)
        return '';
    else
        return element;
}




