/**
 * Создание таблицы
 *
 * @param {Number} row количество строк
 * @param {Number} column количество столбцов
 * @param {String} matrixName название таблицы
 * @returns {String}
 */
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

/**
 * Получение значения из ячейки таблицы
 *
 * @param {String} matrixName название таблицы
 * @param {Number} row строка
 * @param {Number} column столбец
 * @returns {Number} значение из ячейки
 */
function getValue(matrixName, row, column) {
    return parseInt($('#' + matrixName + '_' + row + '_' + column).val(), 10);
}

/**
 * Установка значения в ячейку таблицы
 *
 * @param {String} matrixName название таблицы
 * @param {Number} row строка
 * @param {Number} column столбец
 * @param {*} value устанавливаемое значение
 */
function setValue(matrixName, row, column, value) {
    $('#' + matrixName + '_' + row + '_' + column).val(value);
}
