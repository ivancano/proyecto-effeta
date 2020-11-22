'use strict'

const Contributor = use('App/Models/Contributor');
const Contribution = use('App/Models/Contribution');
const Payment = use('App/Models/Payment');

const Env = use('Env');
const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: Env.get('MP_ACCESS_TOKEN')
});

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

    async payContribution({request, params, response, view}) {
        const contribution = await Contribution.find(params.id);
        const contributor = await Contributor.find(params.contributor_id)
        const callback = decodeURIComponent(params.callback);
        if(contribution !== null && contributor !== null){
            let preference = {
                back_urls: {
                    success: callback,
                    pending: callback,
                    pending: callback
                },
                items: [
                    {
                        title: contribution.detail,
                        unit_price: contribution.amount,
                        quantity: 1,
                    }
                ]
            };
            const mpId = await mercadopago.preferences.create(preference);
            return view.render('paycontribution', {token: mpId.body.id, callback});
        }
        else {
            response.status(400)
            .send('Contribution not found')
        }
    }

}

module.exports = ContributionController
