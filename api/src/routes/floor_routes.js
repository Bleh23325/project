const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const floorController = require('../controllers/floor_controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/floor', floorController.createFloor)
router.get('/floor', floorController.getFloor)
router.get('/floor/:id', floorController.getOneFloor)
router.put('/floor/:id', floorController.updateFloor)
router.delete('/floor/:id', floorController.deleteFloor)


module.exports = router