const db = require('../db/Connect')
class floorController{
    // создание адреса
    async createFloor(req, res) {
        const { name } = req.body;
        try {
            const newFloor = await db.query(
                'INSERT INTO floor(name) VALUES ($1) RETURNING *', 
                [name]
            );
            res.json({ message: 'Этаж добавлен в базу данных', floor: newFloor.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении адреса', error: error.message });
        }
    }
    
        // просмотр адреса
        async getFloor(req, res) {
            try {
                const floor = await db.query('SELECT * FROM floor');
                res.json(floor.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении этажа', error });
            }
        }
    
        // возврат 1 адреса по айди
        async getOneFloor(req, res) {
            const { id } = req.params;
            try {
                const floor = await db.query('SELECT * FROM floor WHERE id = $1', [id]);
                if (floor.rows.length === 0) {
                    res.status(404).json({ message: 'Этаж не найден' });
                } else {
                    res.json(floor.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении этажа', error });
            }
        }
    
        // обновление адреса
        async updateFloor(req, res) {
            const { id } = req.params;
            const { name } = req.body;
            try {
                const updateFloor = await db.query(
                    'UPDATE floor SET name = $1 WHERE id = $2 RETURNING *', 
                    [name, id]
                );
                if (updateFloor.rows.length === 0) {
                    res.status(404).json({ message: 'Этаж не найден' });
                } else {
                    res.json(`Этаж ${updateFloor.rows[0].name} обновлён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении этаж', error });
            }
        }
    
        // удаление адреса
        async deleteFloor(req, res) {
            const { id } = req.params;
            try {
                const deleteFloor = await db.query('DELETE FROM floor WHERE id = $1 RETURNING *', [id]);
                if (deleteFloor.rows.length === 0) {
                    res.status(404).json({ message: 'Этаж не найден' });
                } else {
                    res.json(`Этаж ${deleteFloor.rows[0].name} удалён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении этажа', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new floorController