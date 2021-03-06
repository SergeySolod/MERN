const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

// распарсинг данных, приходящих с frontend
app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (e) {
        process.exit(1)
    }
}

start()


app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))