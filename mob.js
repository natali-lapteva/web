function MOB(n, aName, X, Y) {
    this.n = n;
    this.aName = aName;
    this.X = X;
    this.Y = Y;
}

Mob.prototype.getTable = function () {
    var mobValues = this._getValues();
    return this._buil(mobValues);
};