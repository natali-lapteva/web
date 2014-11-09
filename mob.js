function MOB(n, aName, X, Y, id) {
    this.n = n;
    this.aName = aName;
    this.X = X;
    this.Y = Y;
    this.id = id;
}

MOB.prototype.getTable = function () {
    var mobValues = this._getValues();
    return this._build(mobValues);
};

MOB.prototype._getValues = function () {
    var mob = [],
        n = this.n,
        i,
        j,
        X = this.X,
        Y = this.Y;

    // Строим основание для таблицы
    for (i = 0; i < n + 4; i++) {
        mob[i] = [];
        for (j = 0; j < n + 4; j++) {
            mob[i][j] = ' ';
        }
    }

    // Заголовок таблицы
    mob[0][0] = '';
    mob[0][n + 1] = 'Сумма';
    mob[0][n + 2] = 'Вектор конечных выпусков';
    mob[0][n + 3] = 'Вектор валовых выпусков';

    mob[n + 1][0] = 'Совокупный потребленный продукт';
    mob[n + 2][0] = 'Совокупный доход экономической системы';
    mob[n + 3][0] = 'X с чертой';

    for (i = 1; i < n + 1; i++) {
        mob[i][0] = mob[0][i] = 'Отрасль ' + i
    }

    // Вставляем матрицу A
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            mob[i + 1][j + 1] = getFloatValue(this.aName, i, j);
        }
    }

    // Считаем сумму по строкам и по столбцам
    var sumMOB = 0;
    for (i = 1; i < n + 1; i++) {
        var sumRow = 0,
            sumColumn = 0;

        for (j = 1; j < n + 1; j++) {
            sumRow += mob[i][j];
            sumColumn += mob[j][i];
        }

        mob[i][n + 1] = sumRow;
        mob[n + 1][i] = sumColumn;
        sumMOB += sumRow;
    }
    mob[n + 1][n + 1] = sumMOB;

    // Вектор X
    for (i = 0; i < n; i++) {
        mob[i + 1][n + 3] = mob[n + 3][i + 1] = X[i];
    }

    // Вектор Y
    var sumY = 0;
    for (i = 0; i < n; i++) {
        sumY += mob[i + 1][n + 2] = Y[i];
    }
    mob[n + 2][n + 2] = sumY;

    // Считаем вектор V
    for (i = 1; i < n + 1; i++) {
        mob[n + 2][i] = mob[n + 3][i] - mob[n + 1][i]
    }
    mob[n + 3][n + 3] = sumMOB + sumY;

    return mob;
};

MOB.prototype._build = function(mob) {
    var table = [];

    table.push('<table id="' + this.id + '_table">');
    for (var i = 0; i < this.n + 4; i++) {
        table.push('<tr>');
        for (var j = 0; j < this.n + 4; j++) {
            table.push('<td>');
            var value = mob[i][j];
            if (typeof value !== 'string') {
                value = Math.round(value * 1000) / 1000;
            }
            table.push(value);
            table.push('</td>');
        }
        table.push('</tr>');
    }
    table.push('</table>');

    return table.join('\n');
};
