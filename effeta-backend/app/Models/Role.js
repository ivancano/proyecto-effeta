'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {

    static ROLE_ADMINISTRATIVO = 1;
    static ROLE_APORATANTE = 2;
}

module.exports = Role
