const express = require('express')
const FloorRouter = require('./routes/floor_routes')
// задаём порт. значение после || задаёт порт в ручную, елси его нет в env
const PORT = process.env.PORT || 8080
const  app = express()

// обязательная штука для нормальной работы!
app.use(express.json())

// для должностей
app.use('/api', FloorRouter)

//вывод порта в консоль
app.listen(PORT, () => console.log(`Порт сервера: http://localhost:${PORT}`))