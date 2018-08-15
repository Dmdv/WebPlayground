/**
 * StatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	addStatus: function (req, res) {

		var data = {
			title		: req.param('title'),
			name		: req.param('name'),
			description	: req.param('description'),
		}

		Status.create(data).exec(function (err, status) {

			if (err) return res.send(500);

			res.redirect('/status/');

		});
	},

	deleteStatus: function (req, res) {

		var statusId = req.param('id');

		var updateData = {
			title		: req.param('title'),
			name		: req.param('name'),
			description	: req.param('description')
		};

		Status.update(statusId, updateData).exec(function (err) {

			res.redirect('/status');

		});
	}
};
