'use strict'

const Contributor = use('App/Models/Contributor');
const Contribution = use('App/Models/Contribution');
const Payment = use('App/Models/Payment');

class ContributionController {

    async index ({ request, response }) {
        const contributions = await Contribution.all();
        response.json(contributions);
    }

    async store ({ request, response }) {
        const body = request.post();
        const contribution = new Contribution();
        contribution.detail = body.detail;
        contribution.type = body.type;
        contribution.due_date = body.due_date;
        contribution.amount = body.amount;
        await contribution.save();

        const contributor = await Contributor.find(body.contributor_id);
        await contribution.contributor().associate(contributor);

        response.json(contribution);
    }

    async show ({ request, params, response }) {
        const contribution = await Contribution.find(params.id);
        response.json(contribution);
    }

    async update ({ request, params, response }) {
        const body = request.post();
        const contribution = await Contribution.find(params.id);
        contribution.detail = body.detail;
        contribution.type = body.type;
        contribution.due_date = body.due_date;
        contribution.amount = body.amount;
        await contribution.save();

        response.json(contribution);
    }

    async delete ({ request, params, response }) {
        const contribution = await Contribution.find(params.id);
        await contribution.delete();
        response.json();
    }
    
}

module.exports = ContributionController
