const db = require('../db/Connect')
class videoController{
    // создание адреса
    async createiVideo(req, res) {
        const { name,path } = req.body;
        try {
            const newVideo = await db.query(
                'INSERT INTO video(name,path) VALUES ($1,$2) RETURNING *', 
                [name,path]
            );
            res.json({ message: 'Видео добавлено в базу данных', place: newVideo.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении видео', error: error.message });
        }
    }
    
        // просмотр адреса
        async getVideo(req, res) {
            try {
                const video = await db.query('SELECT * FROM video');
                res.json(video.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении видео', error });
            }
        }
    
        // возврат 1 адреса по айди
        async getOneVideo(req, res) {
            const { id } = req.params;
            try {
                const video = await db.query('SELECT * FROM video WHERE id = $1', [id]);
                if (video.rows.length === 0) {
                    res.status(404).json({ message: 'Видео не найдено' });
                } else {
                    res.json(video.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении видео', error });
            }
        }
    
        // обновление адреса
        async updateVideo(req, res) {
            const { id } = req.params;
            const { name,path } = req.body;
            try {
                const updateVideo = await db.query(
                    'UPDATE video SET name = $1, path = $2 WHERE id = $3 RETURNING *', 
                    [name,path, id]
                );
                if (updateVideo.rows.length === 0) {
                    res.status(404).json({ message: 'Видео не найдено' });
                } else {
                    res.json(`Видео ${updateVideo.rows[0].name} обновлено`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении видео', error });
            }
        }
    
        // удаление адреса
        async deleteVideo(req, res) {
            const { id } = req.params;
            try {
                const deleteVideo = await db.query('DELETE FROM video WHERE id = $1 RETURNING *', [id]);
                if (deleteVideo.rows.length === 0) {
                    res.status(404).json({ message: 'Видео не найдено' });
                } else {
                    res.json(`Видео ${deleteVideo.rows[0].name} удалено`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении видео', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new videoController