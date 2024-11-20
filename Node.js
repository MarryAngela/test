const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/proxy', async (req, res) => {
    const { url } = req.body;

    try {
        const formData = new URLSearchParams();
        formData.append('url', url);
        formData.append('submitBtn', 'submit');

        const response = await fetch('https://twidropper.com/result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        });

        const html = await response.text();
        res.send(html); // 返回 HTML 给前端解析
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
