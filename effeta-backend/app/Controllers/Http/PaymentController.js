'use strict'

const Payment = use('App/Models/Payment');

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
        payment.source = body.source;
        await payment.save();

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
        payment.source = body.source;
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
        response.json(body);
    }
}

module.exports = PaymentController
