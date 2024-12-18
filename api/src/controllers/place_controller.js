const db = require('../db/Connect')
class placeController{
    // создание адреса
    async createPlace(req, res) {
        const { name,information,foto,video,floor } = req.body;
        try {
            const newPlase = await db.query(
                'INSERT INTO place(name,information,foto,video,floor) VALUES ($1,$2,$3,$4,$5) RETURNING *', 
                [name,information,foto,video,floor]
            );
            res.json({ message: 'Место добавлен в базу данных', place: newPlase.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении места', error: error.message });
        }
    }
    
        // просмотр адреса
        async getPlace(req, res) {
            try {
                const place = await db.query('SELECT * FROM place');
                res.json(place.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении места', error });
            }
        }
    
        // возврат 1 адреса по айди
        async getOnePlace(req, res) {
            const { id } = req.params;
            try {
                const place = await db.query('SELECT * FROM place WHERE id = $1', [id]);
                if (place.rows.length === 0) {
                    res.status(404).json({ message: 'Место не найдено' });
                } else {
                    res.json(place.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении места', error });
            }
        }
    
        // обновление адреса
        async updatePlace(req, res) {
            const { id } = req.params;
            const { name,information,foto,video,floor } = req.body;
            try {
                const updatePlace = await db.query(
                    'UPDATE place SET name = $1, information = $2,foto = $3,video = $4,floor = $5 WHERE id = $6 RETURNING *', 
                    [name,information,foto,video,floor, id]
                );
                if (updatePlace.rows.length === 0) {
                    res.status(404).json({ message: 'Место не найдено' });
                } else {
                    res.json(`Место ${updatePlace.rows[0].name} обновлено`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении места', error });
            }
        }
    
        // удаление адреса
        async deletePlace(req, res) {
            const { id } = req.params;
            try {
                const deleteFloor = await db.query('DELETE FROM place WHERE id = $1 RETURNING *', [id]);
                if (deleteFloor.rows.length === 0) {
                    res.status(404).json({ message: 'Место не найдено' });
                } else {
                    res.json(`Место ${deleteFloor.rows[0].name} удалено`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении места', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new placeController