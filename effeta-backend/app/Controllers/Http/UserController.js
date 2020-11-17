'use strict'

const Persona = use('Persona')
const User = use('App/Models/User')
const Role = use('App/Models/Role')


class UserController {

    async register ({ request, auth, response }) {
        const body = request.post()
        const payload = request.only(['email', 'password', 'password_confirmation', 'username']);
        const user = await Persona.register(payload);
        await user.roles().attach([body.role]);
        response.json(user);
    }

    async createRoles ({ request, response }) {
        const roleAdmin = new Role();
        roleAdmin.name = 'Administrativo';
        roleAdmin.slug = 'administrativo';
        roleAdmin.description = '';
        await roleAdmin.save();
        
        const roleAportante = new Role();
        roleAportante.name = 'Aportante';
        roleAportante.slug = 'aportante';
        roleAportante.description = '';
        await roleAportante.save();

        response.json({roleAdmin: roleAdmin, roleAportante: roleAportante});
    }

    async login ({ request, auth, response }) {
        const payload = request.only(['uid', 'password']);
        const token = await auth.attempt(payload.uid, payload.password);
        response.json(token);
    }

    async updatePassword ({ request, auth }) {
        const payload = request.only(['old_password', 'password', 'password_confirmation']);
        const user = auth.user;
        await Persona.updatePassword(user, payload);
        response.json(user);
    }

    async updatePasswordByToken ({ request, params }) {
        const token = params.token;
        const payload = request.only(['password', 'password_confirmation']);
        const user = await Persona.updatePasswordByToken(token, payload);
        response.json(user);
    }

}

module.exports = UserController
