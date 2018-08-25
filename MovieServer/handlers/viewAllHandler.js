const fs = require('fs');
const movies = require('../config/dataBase');

module.exports = (req, res) => {
    if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
        fs.readFile('./views/viewAll.html', (err, data) => {
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

            let movieTemplate = '';
            let id = 0;

            for (let movie of movies) {
                movieTemplate += `
                <div class="movie">
                <a href="/movies/details/${id++}"><img class="moviePoster" src="${decodeURIComponent(movie.moviePoster)}"/></a> 
                    
                </div>`;
            }
            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', movieTemplate);

            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};