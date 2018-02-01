const scrapeIt = require('scrape-it');
const express = require('express');

function searchCard(name, cb) {
	scrapeIt('https://netrunnerdb.com/find/?sort=set&view=images&q=' + name, {
			images: {
				listItem: '.img-responsive',
				data: {
					url: {
						attr: 'src'
					},
				}
			}
		}
	).then(page => {
		let res = page.images.pop();
		if (res) {
			let url = res.url;
			console.log(url);

			if(cb) cb(url);
		}
	});
}

var app = express();
app.get('/card/:name', function(req, res) {
	console.log(req.params.name);
	searchCard(req.params.name, (url) => {
		res.status(200);
		//res.send('<img src="' + url + '">');
		res.send(url);
	});
});
app.listen(10101);

app.use(express.static('static'))
