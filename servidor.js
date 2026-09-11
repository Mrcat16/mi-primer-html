const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Sirve todos los archivos de tu carpeta (HTML, CSS, JS, imágenes)
app.use(express.static(__dirname));

const ARCHIVO = 'encuesta_witcher.ods';

// Ruta principal para cargar la página
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pagina_web.html'));
});

// Ruta para recibir los datos del formulario
app.post('/guardar', (req, res) => {
    const { nombre, apellido, edad, gusto, opinion } = req.body;
    let datos = [];

    if (fs.existsSync(ARCHIVO)) {
        const workbookExistente = XLSX.readFile(ARCHIVO);
        const hojaNombre = workbookExistente.SheetNames[0];
        datos = XLSX.utils.sheet_to_json(workbookExistente.Sheets[hojaNombre]);
    }

    datos.push({
        'Nombres': nombre,
        'Apellidos': apellido,
        'Edad': Number(edad),
        'Gusto Saga (1-100)': Number(gusto),
        '¿Por qué?': opinion
    });

    const nuevaHoja = XLSX.utils.json_to_sheet(datos);
    const nuevoWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(nuevoWorkbook, nuevaHoja, 'Respuestas');

    XLSX.writeFile(nuevoWorkbook, ARCHIVO, { bookType: 'ods' });

    res.send('¡Datos guardados directamente en LibreOffice Calc (.ods)!');
});

app.listen(3000, () => console.log('Servidor activo en http://localhost:3000'));