import DatabaseConnection from './DatabaseConnection';

const databaseConnection = new DatabaseConnection();

export default class ChatService {
  // Create new chat
  static addChat(item) {
    return new Promise((resolve, reject) => {
      databaseConnection
        .initDB()
        .then(db => {
          db.transaction(
            tx => {
              tx.executeSql(
                'INSERT INTO chats (name, phone_number, chated_at) VALUES (?, ?, ?)',
                [item.name, item.phone_number, item.chated_at],
                (_, results) => {
                  resolve(results.insertId);
                },
                (_, error) => {
                  reject(error);
                },
              );
            },
            error => {
              console.error('Transaction error:', error);
              reject(error);
            },
            () => {},
          );
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // Get all chats
  static getChats() {
    return new Promise((resolve, reject) => {
      const chats = [];
      databaseConnection
        .initDB()
        .then(db => {
          db.transaction(
            tx => {
              tx.executeSql(
                'SELECT * FROM chats ORDER BY id DESC',
                [],
                (_, results) => {
                  const len = results.rows.length;
                  for (let i = 0; i < len; i++) {
                    chats.push(results.rows.item(i));
                  }
                  resolve(chats);
                },
                (_, error) => {
                  console.error('SQL error:', error);
                  reject(error);
                  return true;
                },
              );
            },
            error => {
              console.error('Transaction error:', error);
              reject(error);
            },
            () => {},
          );
        })
        .catch(error => {
          console.error('DB init error:', error);
          reject(error);
        });
    });
  }

  // Chat Delete
  static deleteChat(id) {
    return new Promise((resolve, reject) => {
      databaseConnection
        .initDB()
        .then(db => {
          let deleted = false;

          db.transaction(
            tx => {
              tx.executeSql(
                'DELETE FROM chats WHERE id = ?',
                [id],
                (_, results) => {
                  if (results.rowsAffected > 0) {
                    console.log('Data deleted');
                    deleted = true;
                  } else {
                    console.log('No data deleted');
                  }
                },
                (_, error) => {
                  console.error('SQL error:', error);
                  reject(error);
                  return true;
                },
              );
            },
            error => {
              console.error('Transaction error:', error);
              reject(error);
            },
            () => {
              if (deleted) {
                resolve(true);
              } else {
                reject('No rows affected');
              }
            },
          );
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // Chat Search
  static searchChat(search) {
    return new Promise((resolve, reject) => {
      const chats = [];
      databaseConnection
        .initDB()
        .then(db => {
          db.transaction(
            tx => {
              tx.executeSql(
                'SELECT * FROM chats WHERE name LIKE ? or phone_number LIKE ?',
                [`%${search}%`, `%${search}%`],
                (_, results) => {
                  const len = results.rows.length;
                  for (let i = 0; i < len; i++) {
                    chats.push(results.rows.item(i));
                  }
                  resolve(chats);
                },
                (_, error) => {
                  console.error('SQL error:', error);
                  reject(error);
                  return true;
                },
              );
            },
            error => {
              console.error('Transaction error:', error);
              reject(error);
            },
            () => {},
          );
        })
        .catch(error => {
          console.error('DB init error:', error);
          reject(error);
        });
    });
  }
}
