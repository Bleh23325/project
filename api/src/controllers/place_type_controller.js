const db = require('../db/Connect') 
class place_typeController{ 
 // создание адреса 
 async createPlace_type(req, res) { 
 const { type } = req.body; 
 try { 
 const newPlace_type = await db.query( 
 'INSERT INTO place_type(tupe) VALUES ($1) RETURNING *', 
 [type] 
 ); 
 res.json({ message: 'Тип кабинета добавлен в базу данных', place_type: newPlace_type.rows[0] }); 
 } catch (error) { 
 res.status(500).json({ message: 'Ошибка при добавлении типа кабинета', error: error.message }); 
 } 
 } 
 
 // просмотр адреса 
 async getPlace_type(req, res) { 
 try { 
 const place_type = await db.query('SELECT * FROM place_type'); 
 res.json(place_type.rows); 
 } catch (error) { 
 res.status(500).json({ message: 'Ошибка при получении типа кабинета', error }); 
 } 
 } 
 
 // возврат 1 адреса по айди 
 async getOnePlace_type(req, res) { 
 const { id } = req.params; 
 try { 
 const place_type = await db.query('SELECT * FROM place_type WHERE id = $1', [id]); 
 if (place_type.rows.length === 0) { 
 res.status(404).json({ message: 'Тип кабинета не найден' }); 
 } else { 
 res.json(place_type.rows[0]); 
 } 
 } catch (error) { 
 res.status(500).json({ message: 'Ошибка при получении типа кабинета', error }); 
 } 
 } 
 
 // обновление адреса 
 async updatePlace_type(req, res) { 
 const { id } = req.params; 
 const { type } = req.body; 
 try { 
 const updatePlace_type = await db.query( 
 'UPDATE place_type SET tupe = $1 WHERE id = $2 RETURNING *', 
 [type, id] 
 ); 
 if (updatePlace_type.rows.length === 0) { 
 res.status(404).json({ message: 'Тип кабинета не найден' }); 
 } else { 
 res.json(`Тип кабинета ${updatePlace_type.rows[0].type} обновлён`); 
 } 
 } catch (error) { 
 res.status(500).json({ message: 'Ошибка при обновлении типа кабинета', error }); 
 } 
 } 
 
 // удаление адреса 
 async deletePlace_type(req, res) { 
 const { id } = req.params; 
 try { 
 const deletePlace_type = await db.query('DELETE FROM place_type WHERE id = $1 RETURNING *', [id]); 
 if (deletePlace_type.rows.length === 0) { 
 res.status(404).json({ message: 'Тип кабинета не найден' }); 
 } else { 
 res.json(`Тип кабинета ${deletePlace_type.rows[0].type} удалён`); 
 } 
 } catch (error) { 
 res.status(500).json({ message: 'Ошибка при удалении типа кабинета', error }); 
 } 
 } 
 } 
// экспортируем объект контроллера 
module.exports = new place_typeController