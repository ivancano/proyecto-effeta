'use strict'

const Payment = use('App/Models/Payment');
const Contribution = use('App/Models/Contribution');
const Env = use('Env');
const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: Env.get('MP_ACCESS_TOKEN')
});

class PaymentController {

    async index ({ request, response }) {
        const payments = await Payment.all();
        response.json(payments);
    }

    async store ({ request, response }) {
        const body = request.post();
        const payment = new Payment();
        payment.source = body.source;
        payment.amount = body.amount;
        await payment.save();

        const contribution = await Contribution.find(body.contribution_id);
        contribution.payment_id = payment.id;
        contribution.status = Contribution.STATUS_PAID;
        await contribution.save();

        response.json(payment);
    }

    async show ({ request, params, response }) {
        const payment = await Payment.find(params.id);
        response.json(payment);
    }

    async update ({ request, params, response }) {
        const body = request.post();
        const payment = await Payment.find(params.id);
        payment.source = body.source;
        payment.amount = body.amount;
        await payment.save();

        response.json(payment);
    }

    async delete ({ request, params, response }) {
        const payment = await Payment.find(params.id);
        await payment.delete();
        response.json();
    }

    async webhookMercadoPago ({ request, response }) {
        const body = request.post();
        console.log(body);
        if(body.action === "payment.created"){
            const result = await mercadopago.payment.findById(body.data.id);
            console.log(result);
            if(result.transaction_amount){
                const payment = new Payment();
                payment.source = "Mercado Pago";
                payment.amount = data.transaction_amount;
                await payment.save();
                console.log(payment);
                response.json(payment);
            }
            else {
                response.status(400)
                .send('Payment not found')
            }
        }
        else {
            response.json(body);
        }
    }
}

module.exports = PaymentController
