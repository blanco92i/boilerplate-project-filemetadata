require('dotenv').config()
var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer');
const morgan = require('morgan')
const path = require('path');
var app = express();



app.use(morgan('dev'))
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use('/public', express.static(process.cwd() + '/public'));

// Configuration de multer pour le stockage des fichiers
const storage = multer.memoryStorage(); // Utilisation de la mémoire pour stocker temporairement les fichiers
const upload = multer({ storage: storage });

// Route pour le formulaire de téléchargement de fichier
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Récupérer les informations du fichier
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  // Envoyer la réponse JSON avec les détails du fichier
  res.json(fileInfo);
});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
