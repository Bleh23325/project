const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const placeInfoController = require('../controllers/place_info_controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/placeInfo', placeInfoController.createPlaceInfo)
router.get('/placeInfo', placeInfoController.getPlaceInfo)
router.get('/placeInfo/:id', placeInfoController.getOnePlaceInfo)
router.put('/placeInfo/:id', placeInfoController.updatePlaceInfo)
router.delete('/placeInfo/:id', placeInfoController.deletePlaceInfo)


module.exports = router