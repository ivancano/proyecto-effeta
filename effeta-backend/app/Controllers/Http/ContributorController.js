'use strict'

const Contributor = use('App/Models/Contributor');
const User = use('App/Models/User');

class ContributorController {

    async index ({ request, response }) {
        const contributors = await Contributor.query().with('user').fetch();
        response.json(contributors);
    }

    async store ({ request, response }) {
        const body = request.post();
        const contributor = new Contributor();
        contributor.name = body.name;
        contributor.lastname = body.lastname;
        contributor.dni = body.dni;
        contributor.address = body.address;
        contributor.phone = body.phone;
        await contributor.save();

        const user = await User.find(body.user_id);
        await contributor.user().associate(user);

        response.json(contributor);
    }

    async show ({ request, params, response }) {
        const contributor = await Contributor.find(params.id);
        response.json(contributor);
    }

    async update ({ request, params, response }) {
        const body = request.post();
        const contributor = await Contributor.find(params.id);
        contributor.name = body.name;
        contributor.lastname = body.lastname;
        contributor.dni = body.dni;
        contributor.address = body.address;
        contributor.phone = body.phone;
        await contributor.save();

        const user = await User.find(body.user_id);
        user.email = body.email;
        user.username = body.username;
        await user.save();

        response.json(contributor);
    }

    async delete ({ request, params, response }) {
        const contributor = await Contributor.find(params.id);
        await contributor.delete();
        response.json();
    }

}

module.exports = ContributorController
