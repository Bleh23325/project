const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const videoController = require('../controllers/video_controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/video', videoController.createiVideo)
router.get('/video', videoController.getVideo)
router.get('/video/:id', videoController.getOneVideo)
router.put('/video/:id', videoController.updateVideo)
router.delete('/video/:id', videoController.deleteVideo)


module.exports = router