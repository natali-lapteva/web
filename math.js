function getTable(row, column, matrixName) {
    var t = [];

    t.push('<table>');
    for(var i = 0; i < row; i++) {
        t.push('<tr>');
        for (var j = 0; j < column; j++) {
            var id = matrixName +'_' + i + '_' + j,
                value = Math.round(Math.random() * 10); // генерируемые числа для начальных диапазонов
            t.push('<td><input id="'+ id + '" value= "' + value + '" size="2"/></td>');
        }
        t.push('</tr>');
    }
    t.push('<table>');
    return t.join('\n');
}

function getValue(matrixName, i, j) {
    return parseInt($('#' + matrixName + '_' + i + '_' + j).val(), 10);
}

function setValue(matrixName, i, j, value) {
    $('#' + matrixName + '_' + i + '_' + j).val(value);
}
