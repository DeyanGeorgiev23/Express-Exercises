const fs = require('fs');
const movies = require('../config/dataBase');

module.exports = (req, res) => {
    if (req.pathname.startsWith('/movies/details/') && req.method === 'GET') {
        let index = req.pathname.substr(req.pathname.lastIndexOf('/') + 1);
        let movie = movies[index];
        
        fs.readFile('./views/details.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let movieTemplate = `<div class="content">
                  <img src="${decodeURIComponent(movie.moviePoster)}"/>
                  <h3>Title ${decodeURIComponent(movie.movieTitle).split('+').join(' ')}</h3>
                  <h3>Year ${decodeURIComponent(movie.movieYear)}</h3>
                  <p> ${decodeURIComponent(movie.movieDescription).split('+').join(' ')}</p>
                </div>​`;
            
            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', movieTemplate);

            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};