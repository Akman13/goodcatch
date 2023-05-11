const multiparty = require('multiparty');

function multiParse(req, res, next) {
    if (req.url === '/catches/:id' && req.method === 'POST') {
        // parse a file upload
        const form = new multiparty.Form();
        
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ fields: fields, files: files }));
        });
        
        return;
    }
    next();
}

module.exports = multiParse;