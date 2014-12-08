function MOB(n, aName, X, Y, id) {
    this.n = n;
    this.aName = aName;
    this.X = X;
    this.Y = Y;
    this.id = id;
}

MOB.prototype.getTable = function () {
    var mobValues = this._getValues();
    return this._build(mobValues) + this._checkBalance(mobValues);
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
    mob[0][n + 1] = 'Сумма <b>Σ</b>';
    mob[0][n + 2] = 'Вектор конечных выпусков <b>Y</b>';
    mob[0][n + 3] = 'Вектор валовых выпусков <b>X</b>';

    mob[n + 1][0] = 'Совокупный потребленный продукт <b>Σ</b>';
    mob[n + 2][0] = 'Объем условно чистой продукции <b>Ṽ</b>';
    mob[n + 3][0] = 'Совокупный доход экономической системы <b>Ẋ</b>';

    for (i = 1; i < n + 1; i++) {
        mob[i][0] = mob[0][i] = 'Отрасль ' + i
    }

    // Вставляем матрицу A
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            mob[i + 1][j + 1] = getFloatValue(this.aName, i, j) * X[j];
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

MOB.prototype._build = function (mob) {
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

MOB.prototype._checkBalance = function (mob) {
    var check = [],
        n = this.n,
        i,
        text;
    // Сумма сумм по столбцам равна сумме сумм по строкам
    check.push('<h4>1. Баланс между валовым продуктом конечным и промежуточными продуктами</h4>');
    var sumByRow = [],
        sumByColun = [],
        sigma_1 = Math.round(mob[n + 1][n + 1] * 1000 ) / 1000;

    for (i = 0; i < n; i++) {
        sumByRow.push(this._roundAndFormat(mob[i + 1][n + 1]));
        sumByColun.push(this._roundAndFormat(mob[n + 1][i + 1]));
    }
    text = sumByRow.join(' ') + ' = ' + sumByColun.join(' ') + ' = ' + sigma_1;
    check.push('<div>' + text + '</div>');

    // Сумма сумм и Y равна X
    check.push('<h4>2. Баланс между валовым продуктом, произведенным в отраслях и промежуточным и конечным продуктом</h4>');
    for (i = 0; i < n; i++) {
        text =
            this._roundAndFormat(mob[i + 1][n + 1]) + ' ' +
            this._roundAndFormat(mob[i + 1][n + 2]) + ' = ' +
            (Math.round(mob[i + 1][n + 3] * 1000) / 1000);
        check.push('<div>' + text + '</div>');
    }

    // Сумма сум по столбцам и V_с_чертой равна X_с_чертой
    check.push('<h4>3. Баланс между валовым продуктом, потребленным в области и объемом условно чистой продукции и количеством произведенного промежуточного продукта</h4>');
    for (i = 0; i < n; i++) {
        text =
            this._roundAndFormat(mob[n + 1][i + 1]) + ' ' +
            this._roundAndFormat(mob[n + 2][i + 1]) + ' = ' +
            (Math.round(mob[n + 3][i + 1] * 1000) / 1000);
        check.push('<div>' + text + '</div>');
    }

    // Сумма по V_с_чертой равна сумме по Y
    check.push('<h4>4. Баланс между конечным продуктом и совокупным доходом экономической системы</h4>');
    var sumByV = [],
        sumByY = [],
        sigma_2 = Math.round(mob[n + 2][n + 2] * 1000) / 1000 ;

    for (i = 0; i < n; i++) {
        sumByY.push(this._roundAndFormat(mob[i + 1][n + 2]));
        sumByV.push(this._roundAndFormat(mob[n + 2][i + 1]));
    }
    text = sumByY.join(' ') + ' = ' + sumByV.join(' ') + ' = ' + sigma_2;
    check.push('<div>' + text + '</div>');

    // Сигма_1 + сигма_2 = сигма_3
    var sigma_3 = Math.round(mob[n+3][n+3] * 1000) /1000;
    check.push('<h4>5. Баланс мужду совокупным промежуточным продуктом, совокупным конечным продуктом и суммой совокупного продукта экономики</h4>');
    check.push(sigma_1 + ' + ' + sigma_2 + ' = ' + sigma_3);

    return check.join('\n');
};

MOB.prototype._roundAndFormat = function (data) {
    var value = Math.round(data * 1000) / 1000;
    return (value > 0 ? '+' : '') + value;
};

