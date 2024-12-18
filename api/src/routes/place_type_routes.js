const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const place_typeController = require('../controllers/place_type_controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/placeType', place_typeController.createPlace_type)
router.get('/placeType', place_typeController.getPlace_type)
router.get('/placeType/:id', place_typeController.getOnePlace_type)
router.put('/placeType/:id', place_typeController.updatePlace_type)
router.delete('/placeType/:id', place_typeController.deletePlace_type)


module.exports = router