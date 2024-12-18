const db = require('../db/Connect')
class placeInfoController{
    // создание адреса
    async createPlaceInfo(req, res) {
        const { type,information } = req.body;
        try {
            const newPlaceInfo = await db.query(
                'INSERT INTO place_info(type,information) VALUES ($1,$2) RETURNING *', 
                [type,information]
            );
            res.json({ message: 'Информация о типе кабинета добавлена в базу данных', address: newPlaceInfo.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении адреса', error: error.message });
        }
    }
    
        // просмотр адреса
        async getPlaceInfo(req, res) {
            try {
                const place_info = await db.query('SELECT * FROM place_info');
                res.json(place_info.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении этажа', error });
            }
        }
    
        // возврат 1 адреса по айди
        async getOnePlaceInfo(req, res) {
            const { id } = req.params;
            try {
                const PlaceInfo = await db.query('SELECT * FROM place_info WHERE id = $1', [id]);
                if (PlaceInfo.rows.length === 0) {
                    res.status(404).json({ message: 'Инфа не найден' });
                } else {
                    res.json(PlaceInfo.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении инфа', error });
            }
        }
    
        // обновление адреса
        async updatePlaceInfo(req, res) {
            const { id } = req.params;
            const { type,information } = req.body;
            try {
                const updatePlaceInfo = await db.query(
                    'UPDATE place_info SET type = $1, information = $2 WHERE id = $3 RETURNING *', 
                    [type,information, id]
                );
                if (updatePlaceInfo.rows.length === 0) {
                    res.status(404).json({ message: 'Тип не найден' });
                } else {
                    res.json(`Тип ${updatePlaceInfo.rows[0].name} обновлён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении типа', error });
            }
        }
    
        // удаление адреса
        async deletePlaceInfo(req, res) {
            const { id } = req.params;
            try {
                const deletePlaceInfo = await db.query('DELETE FROM place_info WHERE id = $1 RETURNING *', [id]);
                if (deletePlaceInfo.rows.length === 0) {
                    res.status(404).json({ message: 'Тип не найден' });
                } else {
                    res.json(`Тип ${deletePlaceInfo.rows[0].name} удалён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении типа', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new placeInfoController