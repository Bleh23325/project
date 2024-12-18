
/** 
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined} 
 */ 
exports.shorthands = undefined; 
/** 
 * @param pgm {import('node-pg-migrate').MigrationBuilder} 
 * @param run {() => void | undefined} 
 * @returns {Promise<void> | void} 
 */ 
// тут будет код для изменения бд 
module.exports =  {up: (pgm) => { 
    //таблица с паролями и логинами 
    pgm.createTable('place', { 
        id: { type: 'serial', primaryKey: true},  //serial - тип счётчика 
        name: { type: 'varchar(40)', notNull: false }, 
        information: {type: 'integer', notNull: false}, 
        foto: {type: 'integer', notNull: false}, 
        video: {type: 'integer', notNull: false}, 
        floor: {type: 'integer', notNull: false}, 
  }); 
  }, 
  /** 
 * @param pgm {import('node-pg-migrate').MigrationBuilder} 
 * @param run {() => void | undefined} 
 * @returns {Promise<void> | void} 
 */ 
// тут код для отката изменения бд 
down: (pgm) => { 
    pgm.dropTable('place'); 
  } 
};