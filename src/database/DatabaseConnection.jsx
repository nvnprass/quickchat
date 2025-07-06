import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'quickchat.db';
const database_version = '1.0';
const database_displayname = 'QuickChat Database';
const database_size = 200000;

export default class DatabaseConnection {
  initDB() {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      )
        .then(db => {
          db.executeSql(
            'CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(150), phone_number VARCHAR(150), chated_at TEXT)',
          )
            .then(() => {
              resolve(db);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      db.close()
        .then(() => console.log('Database closed'))
        .catch(error => console.log('Error closing database: ' + error));
    }
  }
}
