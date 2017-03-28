const path = require('path')
const dbPath = path.resolve(__dirname, 'sqlite.db')
var sqlite3 = require('sqlite3').verbose(); //Disable verbose before production!
 
//Immediate function to build a Test if a db file exists
//or create one if needed
//This could potentially be refactored out to a gulp process to make the file
let initialize = (() => {
        let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        //Create new db file if one does not already exist
        if(err){
            db = new sqlite3.Database(dbPath);
            //Need to make api populate call from here for default 5e module
        }
    });
    db.close();
})();