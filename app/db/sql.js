const path = require('path')
const sqlite3 = require('sqlite3').verbose(); //Disable verbose before production!
const dbPath = path.resolve(__dirname, 'sqlite.db')
 
//Immediate function to build a Test if a db file exists
//or create one if needed
//This could potentially be refactored out to a gulp process to make the file
const initialize = (() => {
        let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        //Create new db file if one does not already exist
        if(err){
            db = new sqlite3.Database(dbPath);
            //Need to make api populate call from here for default 5e module
        }
    });
    db.close();
})();

// const GetAllMonsters = (() => {
//     console.log(JSON.parse('[{"Name":"Scimitar","Description":"Melee Weapon Attack: +4 to hit, reach 5 ft, one target. Hit: 5 (1d6 + 2) slashing damage"},{"Name":"Shortbow","Description":"Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage"}]'));
//     let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE)
//     db.serialize(() => {
//         console.log("here");
//         db.each("SELECT * FROM Monsters", (err, row) => {
//             row.Actions = JSON.parse(row.Actions);
//             console.log(row);
//         });
//     })
//     db.close();
// })();