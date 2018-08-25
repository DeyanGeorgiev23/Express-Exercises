const formidable = require('formidable');
const Tag = require('../models/TagSchema');

module.exports = (req, res) => {
    if (req.pathname === '/generateTag' && req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            const name = fields.tagName;
            Tag.create({
                name,
                images: []
            }).then(tag => {
                res.writeHead(302, {
                    Location: '/'
                });
                res.end();
            }).catch(err => {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.write('500 Server error');
                res.end();
            });
        });
    } else {
        return true;
    }
};
