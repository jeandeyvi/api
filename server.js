const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 7000;


// Conexión a MongoDB
mongoose.connect('mongodb+srv://jean:1234Jd@cluster0.gdlda01.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => console.log('Conectado a MongoDB'));

//modelo de usuario
const User = require('./models/user');

// Ruta de registro
app.post('/registro', async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const newUser = new User({ usuario, contraseña });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado satisfactoriamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta de inicio de sesión
app.post('/inicio-sesion', async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const user = await User.findOne({ usuario, contraseña });
    if (user) {
      res.json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ error: 'Información inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));
