const fs = require('fs');
const path = require('path');

function getConetntType (url) {
    let content = '';
    if (url.endsWith('.css')) {
        content += 'text/css';
    } else if (url.endsWith('.png')) {
        content += 'image/png';
    } else if (url.endsWith('.jpg')) {
        content += 'image/jpeg';
    }
    return content;
};

module.exports = (req, res) => {
    if (req.pathname.startsWith('/public') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': getConetntType(req.pathname)
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};
