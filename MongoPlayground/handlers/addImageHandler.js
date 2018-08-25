const formidable = require('formidable');
const Image = require('../models/ImageSchema');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (req, res) => {
    if (req.pathname === '/addImage' && req.method === 'POST') {
        addImage(req, res);
    } else if (req.pathname === '/delete' && req.method === 'GET') {
        deleteImg(req, res);
    } else {
        return true;
    }
};

function addImage(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return;
        }
        const tags = fields.tagsID.split(',').reduce((p, c, i, a) => {
            if (p.includes(c) || c.length === 0) {
                return p;
            } else {
                p.push(c);
                return p;
            }
        }, []).map(ObjectId);

        Image.create({
            url: fields.imageUrl,
            description: fields.description,
            tags
        }).then(() => {
            res.writeHead(302, {
                Location: '/'
            });
            res.end();
        }).catch(err => {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.write('500 Sever error!');
            res.end();
        });
    });
};

function deleteImg(req, res) {
    Image.deleteOne({_id: req.pathquery.id}).then(() => {
        res.writeHead(302, {
            Location: '/'
        });
        res.end();
    }).catch(err => {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.write('500 Server Error');
        res.end();
    });
};