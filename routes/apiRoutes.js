const {v4: uuidv4} = require("uuid")
const fs = require("fs")


module.exports = function(app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(JSON.parse(data));
            }
        })
    });

    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        newNote.id = uuidv4();
        fs.readFile("db/db.json", "utf8", function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var notes = JSON.parse(data);
                notes.push(newNote);

                fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
                    res.json(newNote);
                })
            }
        })
    });

    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("db/db.json", "utf8", function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var notes = JSON.parse(data);
                var updatedNotes = notes.filter(function(note) {
                    if (note.id != req.params.id) {
                        return note;
                    }
                });
                fs.writeFile("./db/db.json", JSON.stringify(updatedNotes), (err, data) => {
                    res.json({"Status": "ok"});
                })
            }
        });
    })

};