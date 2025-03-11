require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 📌 Sprawdzenie, czy zmienne środowiskowe są poprawnie wczytane
console.log("✅ EMAIL_USER:", process.env.EMAIL_USER);
console.log("✅ EMAIL_PASS:", process.env.EMAIL_PASS ? "********" : "❌ BRAK HASŁA");

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Błąd: EMAIL_USER lub EMAIL_PASS nie są ustawione!");
    process.exit(1); // Zatrzymujemy serwer, jeśli brak zmiennych
}

// 📌 Tworzenie transportera Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  }
});

// 📌 Obsługa żądania do /send-email
app.post('/send-email', async (req, res) => {
    console.log("📩 Otrzymano żądanie wysłania e-maila:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.error("❌ Błąd: Brak wymaganych pól!");
        return res.status(400).json({ message: "Brak wymaganych pól" });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'adrian.lewkowiczm@gmail.com',
        subject: `Nowa wiadomość od ${name}`,
        text: `Od: ${name} <${email}>\n\n${message}`
    };

    console.log("📤 Wysyłanie e-maila...");

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ E-mail wysłany pomyślnie:", info.response);
        res.status(200).json({ message: 'Email wysłany pomyślnie!' });
    } catch (error) {
        console.error("❌ Błąd wysyłania maila:", error);
        res.status(500).json({ message: 'Wysyłanie nie powiodło się', error: error.message });
    }
});

// 📌 Uruchomienie serwera
app.listen(3000, () => console.log('🚀 Serwer działa na http://localhost:3000'));
