const fs = require('fs');
const qs = require('querystring');
const movies = require('../config/dataBase');

module.exports = (req, res) => {
    if (req.pathname === '/addMovie' && req.method === 'GET') {
        fs.readFile('./views/addMovie.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not Found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    } else if (req.pathname === '/addMovie' && req.method === 'POST') {
        let body = '';

        req.on('data', (data) => {
            body += data;
        });

        req.on('end', () => {
            let movieData = qs.parse(body);

            if(!movieData.moviePoster || !movieData.movieTitle) {
                fs.readFile('./views/addMovie.html', (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
    
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
    
                    let errorTemplate = '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>';
    
                    data = data.toString().replace('{{replaceMe}}', errorTemplate);
    
                    res.write(data);
                    res.end();
                });
            } else {
                fs.readFile('./views/addMovie.html', (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
    
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
    
                    let successesTemplate = '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>';
    
                    data = data.toString().replace('{{replaceMe}}', successesTemplate);
    
                    res.write(data);
                    res.end();
                });

                movies.push(movieData);
            }
        });
    } else {
        return true;  
    }
};