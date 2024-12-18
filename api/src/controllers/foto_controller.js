const db = require('../db/Connect')
class fotoController{
    // создание адреса
    async createFoto(req, res) {
        const { name,path } = req.body;
        try {
            const newFoto = await db.query(
                'INSERT INTO foto(name,path) VALUES ($1,$2) RETURNING *', 
                [name,path]
            );
            res.json({ message: 'Фото добавлено в базу данных', foto: newFoto.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении фото', error: error.message });
        }
    }
    
        // просмотр адреса
        async getFoto(req, res) {
            try {
                const foto = await db.query('SELECT * FROM foto');
                res.json(foto.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении фото', error });
            }
        }
    
        // возврат 1 адреса по айди
        async getOneFoto(req, res) {
            const { id } = req.params;
            try {
                const foto = await db.query('SELECT * FROM foto WHERE id = $1', [id]);
                if (foto.rows.length === 0) {
                    res.status(404).json({ message: 'Фото не найдено' });
                } else {
                    res.json(foto.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении фото', error });
            }
        }
    
        // обновление адреса
        async updateFoto(req, res) {
            const { id } = req.params;
            const { name,path } = req.body;
            try {
                const updateFoto = await db.query(
                    'UPDATE foto SET name = $1, path = $2 WHERE id = $3 RETURNING *', 
                    [name,path, id]
                );
                if (updateFoto.rows.length === 0) {
                    res.status(404).json({ message: 'Фото не найдено' });
                } else {
                    res.json(`Фото ${updateFoto.rows[0].name} обновлёно`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении фото', error });
            }
        }
    
        // удаление адреса
        async deleteFoto(req, res) {
            const { id } = req.params;
            try {
                const deleteFoto = await db.query('DELETE FROM foto WHERE id = $1 RETURNING *', [id]);
                if (deleteFoto.rows.length === 0) {
                    res.status(404).json({ message: 'Фото не найдено' });
                } else {
                    res.json(`Фото ${deleteFoto.rows[0].name} удалёно`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении фото', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new fotoController