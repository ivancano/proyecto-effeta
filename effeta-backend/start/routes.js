'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
var Chance = require('chance').Chance();
const Contributor = use('App/Models/Contributor');
const User = use('App/Models/User');

Route.group(() => {

    Route.post('users/create-roles', 'UserController.createRoles');
    Route.post('users/register', 'UserController.register');
    Route.post('users/login', 'UserController.login').middleware('guest');

    Route.get('contributors', 'ContributorController.index');
    Route.post('contributors', 'ContributorController.store');
    Route.get('contributors/:id', 'ContributorController.show');
    Route.put('contributors/:id', 'ContributorController.update');
    Route.delete('contributors/:id', 'ContributorController.delete');
    Route.get('contributors/:id/contributions', 'ContributorController.getContributions');

    Route.get('contributions', 'ContributionController.index');
    Route.post('contributions', 'ContributionController.store');
    Route.get('contributions/:id', 'ContributionController.show');
    Route.put('contributions/:id', 'ContributionController.update');
    Route.delete('contributions/:id', 'ContributionController.delete');

    Route.get('payments', 'PaymentController.index');
    Route.post('payments', 'PaymentController.store');
    Route.get('payments/:id', 'PaymentController.show');
    Route.put('payments/:id', 'PaymentController.update');
    Route.delete('payments/:id', 'PaymentController.delete');


    Route.get('dummy-data', async ({ request, response }) => {
        var result = []
        for (let index = 0; index < 5; index++) {
            const user = new User();
            const email = Chance.email();
            user.username = email;
            user.email = email;
            user.password = "0000" + index;
            user.account_status = "pending";
            await user.save();

            const contributor = new Contributor();
            contributor.name = Chance.first();
            contributor.lastname = Chance.last();
            contributor.dni = "0000" + index;
            contributor.type = 3;
            await contributor.save();

            await contributor.user().associate(user);
            result.push(contributor);
        }
        response.json(result);
    });
}).prefix('api/v1')

Route.get('contributions/:id/:contributor_id/pay-contribution/:callback', 'ContributionController.payContribution');
