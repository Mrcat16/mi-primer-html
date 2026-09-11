const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const ARCHIVO = 'encuesta_witcher.ods';

app.post('/guardar', (req, res) => {
    const { nombre, apellido, edad, gusto } = req.body;
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
        'Gusto Saga (1-10)': Number(gusto)
    });

    const nuevaHoja = XLSX.utils.json_to_sheet(datos);
    const nuevoWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(nuevoWorkbook, nuevaHoja, 'Respuestas');

    XLSX.writeFile(nuevoWorkbook, ARCHIVO, { bookType: 'ods' });

    res.send('¡Datos guardados directamente en LibreOffice Calc (.ods)!');
});

app.listen(3000, () => console.log('Servidor activo en http://localhost:3000'));