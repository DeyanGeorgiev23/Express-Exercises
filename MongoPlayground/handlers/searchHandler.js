const Image = require('../models/ImageSchema');
const fs = require('fs');
const Tag = require('../models/TagSchema');

module.exports = (req, res) => {
    if (req.pathname === '/search') {
        fs.readFile('./views/results.html', 'utf8', (err, html) => {
            if (err) {
                console.log(err);
                return;
            }
            let params = {};
            if (req.pathquery.tagName) {
                const tags = req.pathquery.tagName.split(',').filter(e => e.length > 0);
                if (tags.length > 0) {
                    Tag.find({name: { $in: tags }}).then(data => {
                        const tagIds = data.map(m => m._id);
                        params.tags = tagIds;
                        getImagesAndRespond(params);
                    });
                } 
            } else {
                Tag.find({}).then(data => {
                    getImagesAndRespond(params);
                });
            }

            // if (req.pathquery.beforeDate) {
            //     Tag.find({creationDate: { $gte: req.pathquery.beforeDate }}).then(data => {
            //         params.creationDate = data.creationDate;
            //         getImagesAndRespond(params);
            //     });
            // }

            function getImagesAndRespond(params) {
                Image.find(params).then(data => {
                    let imageHtml = '';
                    for (let image of data) {
                        imageHtml += imageTamplate(image);
                    }
                    html = html.toString().replace('<div class="replaceMe"></div>', imageHtml);
                    
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(html);
                    res.end();
                });
            }
        });
    } else {
        return true;
    }
};


function imageTamplate(image) {
    return `<fieldset id="${image._id}">
    <img src="${image.url}"></img>
    <p>${image.description}<p/>
    <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
    </button>
    </fieldset>`;
}
