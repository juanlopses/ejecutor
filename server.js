const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const slugify = require('slugify'); // Para asegurarnos de que el nombre sea válido

const app = express();
const PORT = 3000;
const pagesDir = path.join(__dirname, 'pages');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/paginadeinicio', express.static('pages'));

if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir);
}

app.post('/crear-fork', (req, res) => {
    const { htmlContent, pageName } = req.body;
    
    // Sanitize the page name and make it compatible with URL paths
    const sanitizedName = slugify(pageName, { lower: true, strict: true });
    const filename = `${sanitizedName}.html`;
    const filepath = path.join(pagesDir, filename);

    fs.writeFile(filepath, htmlContent, (err) => {
        if (err) {
            return res.status(500).send('Error al guardar la página');
        }
        res.send({ url: `/paginadeinicio/${filename}` });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
