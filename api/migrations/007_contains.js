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
     //связь place_type/place_info
     pgm.addConstraint('place_info', 'fk_type_info', {// (1 - куда подкл, 2 - назв. связ, 3 - параметры)
        foreignKeys: [{
            columns: 'type',
            references: 'place_type(id)',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'  
        }]
    }),
    pgm.addConstraint('place', 'fk_foto_info', {
        foreignKeys: [{
            columns: 'foto',
            references: 'foto(id)',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }]
    }),
    pgm.addConstraint('place', 'fk_main_place', {
        foreignKeys: [{
            columns: 'information',
            references: 'place_info(id)',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }]
    }),
    pgm.addConstraint('place', 'fk_place_floor', {
        foreignKeys: [{
            columns: 'floor',
            references: 'floor(id)',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'  
         }]    
    }),
    pgm.addConstraint('place', 'fk_foto_place', {
        foreignKeys: [{
            columns: 'video',
            references: 'video(id)',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }]
    })

},

  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {

  }
};