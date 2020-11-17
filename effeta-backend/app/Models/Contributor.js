'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contributor extends Model {

    static TYPE_PADRINO = 1;
    static TYPE_ALUMNO = 2;
    static TYPE_NO_REGISTRADO = 3;

    user() {
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Contributor
