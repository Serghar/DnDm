//This file will gather all modules from github and return there names
//It will also provide the parsing needed for adding a specified module's records to DB
const https = require('https');
const path = require('path')
const sqlite3 = require('sqlite3').verbose(); //Disable verbose before production!
const dbPath = path.resolve(__dirname, 'sqlite.db')

//Retrieve current list of monster modules
const GetAllMonsterModules = () => {
    let options = {
        host : 'raw.githubusercontent.com',
        path : '/Serghar/dndm-modules/master/monster_list.json',
        method : 'GET',
    }
    return httpGetRequest(options);
};


const RetrieveSingleMonsterModule = (selectedModule) => {
    let options = {
        host : selectedModule.host,
        path : selectedModule.path,
        method : 'GET'
    }
    return httpGetRequest(options);
}

const importModule = (selectedModule) => {
    //Need to add check to see if module has already been added
    return new Promise((resolve, reject) => {
            RetrieveSingleMonsterModule(selectedModule).then((jsonObj) => {
                let db = new sqlite3.Database(dbPath);
                jsonObj.tables.forEach((table) => {
                    db.serialize(() => {
                        //Build the table if it does not exist already
                        let query = "CREATE TABLE IF NOT EXISTS " + table.name;
                        let columns = table.cols;
                        query += "(";
                        for(let idx = 0; idx < columns.length; idx++) {
                            query += columns[idx].name + " " + columns[idx].type + ", ";
                        }
                        query += "created_at string, updated_at string);";
                        db.run(query);
                        
                        //Add all records to the table
                        table.records.forEach((record) => {
                            let keys = "";
                            let values = "";
                            for(let colName in record) {
                                keys += colName + ",";
                                if(typeof record[colName] === 'string') {
                                    values += "'" + record[colName] + "',";
                                } else if (record[colName] instanceof Array || record[colName] instanceof Object) { 
                                    values += "'" + JSON.stringify(record[colName]) + "',";
                                } else {
                                    values += record[colName] + ",";
                                }
                            }
                            keys = keys.slice(0, -1);
                            values = values.slice(0, -1);
                            let insertQuery = `INSERT INTO ${table.name} (${keys}) VALUES (${values});`
                            db.run(insertQuery);
                        })
                    });
                });
                db.close((err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
    });
}

const httpGetRequest = (options) => {
    return new Promise((resolve, reject) => {
        let req = https.request(options, (res) => {
            res.setEncoding('utf-8');
            let responseString = '';

            res.on('data', (data) => {
                responseString += data;
            });
            res.on('end', () => {
                let responseObject = JSON.parse(responseString);
                resolve(responseObject);
            })
        })
        req.end()
    });
}

export {GetAllMonsterModules, importModule}
