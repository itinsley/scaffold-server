'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable('people', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unique: true},
    user_uuid: {type:'string', notNull: true, unique:true},
    first_name: {type:'string', required: true},
    surname: {type:'string', required: true},
    created_at: {type: 'timestamp',required: true},
    updated_at: {type: 'timestamp',required: true}
  });

};

exports.down = async function(db) {
  await db.dropTable('people');
};

exports._meta = {
  "version": 1
};
