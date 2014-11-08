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
 * Получение значения из ячейки таблицы
 *
 * @param {String} matrixName название таблицы
 * @param {Number} row строка
 * @param {Number} column столбец
 * @returns {Number} значение из ячейки
 */
function getFloatValue(matrixName, row, column) {
    return parseFloat($('#' + matrixName + '_' + row + '_' + column).val());
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

/**
 * Получение единичного вектора размерности n
 *
 * @param {Number} n
 * @returns {Array}
 */
function getEVector(n) {
    var vector = [],
        sum = 0,
        i;

    // Задаем случайные значения вектора
    for (i = 0; i < n; i++) {
        sum += vector[i] = Math.random();
    }

    // Нормируем вектор
    var sumFloor = 0;
    for (i = 0; i < n-1; i++) {
        sumFloor += vector[i] = Math.floor(vector[i] / sum * 10) / 10;
    }

    // В последний элемент скидываем все, что осталось от округления
    vector[n-1] = Math.round((1 - sumFloor) * 10) / 10;

    return vector;
}
