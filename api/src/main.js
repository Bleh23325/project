const express = require('express')
const FloorRouter = require('./routes/floor_routes')
const PlaceRouter = require('./routes/place_routes')
const VideoRouter = require('./routes/video_routes')
const FotoRouter = require('./routes/foto_routes')
const PlaceTypeRouter = require('./routes/place_type_routes')
const PlaceInfoRouter = require('./routes/place_info_routes')
// задаём порт. значение после || задаёт порт в ручную, елси его нет в env
const PORT = process.env.PORT || 8080
const  app = express()

// обязательная штука для нормальной работы!
app.use(express.json())

// для этажей
app.use('/api', FloorRouter)

// для мест
app.use('/api', PlaceRouter)

// для видео
app.use('/api', VideoRouter)

// для фото
app.use('/api', FotoRouter)

// для типа места
app.use('/api', PlaceTypeRouter)

// для инфы места
app.use('/api', PlaceInfoRouter)

//вывод порта в консоль
app.listen(PORT, () => console.log(`Порт сервера: http://localhost:${PORT}`))