/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	index: function (req, res) {

		Task.find()
					.populate('performer')
					.populate('status')
					.sort('id DESC')
					.exec(function (err, tasks) {

						if (err) return res.send(500);

						res.view( {tasks : tasks} );

					});
	},

	create: function (req, res) {

		var data = {};

		User.find()            
            .then(function(users) {            
                data.performers = users;             
                Status.find()                
                    .then(function(statuses) {                    
                        data.statuses = statuses;                    
                        res.view({data : data});
                });
        });
	},

	delete: function(req,req) {
		console.log(req)
	}
};
