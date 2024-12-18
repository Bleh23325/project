const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const placeController = require('../controllers/place_controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/place', placeController.createPlace)
router.get('/place', placeController.getPlace)
router.get('/place/:id', placeController.getOnePlace)
router.put('/place/:id', placeController.updatePlace)
router.delete('/place/:id', placeController.deletePlace)


module.exports = router