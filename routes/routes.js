const { Router } = require('express');
const router = Router();
const fs = require('fs');

const videogamesFile = fs.readFileSync("./videogames.json", "utf8");
let videogames = JSON.parse(videogamesFile)

router.get("/", (req, res) => {
    res.json("¡¡Bienvenido al api de videojuegos!!");
})

router.get("/videogames", (req, res) => {
    res.status(200).json(videogames);
})

router.post("/videogames", (req, res) => {

    const { title, developer, year, plataforms, genre, mode, ESRB, trailer } = req.body;

    if (!title || !developer || !year || !plataforms || !genre || !mode || !ESRB || !trailer) {
        res.status(401).json({ error: "Por favor diligencie todos los datos" });
    } else {

        const id = videogames.length + 1
        let newVideogame = {
            id,
            title,
            developer,
            year,
            plataforms,
            genre,
            mode,
            ESRB,
            trailer
        }

        videogames.push(newVideogame)
        const json_videogames = JSON.stringify(videogames);

        fs.writeFileSync("./videogames.json", json_videogames, "utf-8");

        res.status(200).json(videogames);
    }
});

router.put("/videogames/:id", (req, res) => {
    const { title, developer, year, plataforms, genre, mode, ESRB, trailer } = req.body;
    const id = req.params.id;

    if (!title || !developer || !year || !plataforms || !genre || !mode || !ESRB || !trailer || !id) {
        res.status(401).json({ error: "Por favor complete los datos y especifique la id" });
    } else {
        videogames.filter( (videogames) => {

        if(videogames.id == id){
                videogames.title = title;
                videogames.developer = developer;
                videogames.year = year;
                videogames.plataforms = plataforms;
                videogames.genre = genre;
                videogames.mode = mode;
                videogames.ESRB = ESRB;
                videogames.trailer = trailer;
            } 
        }
        )
        
        const json_videogames = JSON.stringify(videogames);
        fs.writeFileSync("./videogames.json", json_videogames, "utf-8");

        res.status(200).json("ok")
    }
});

router.delete( "/videogames", ( req, res ) => {
    const id = req.params.id;

    if(!id){
        res.status( 401 ).json( { error: "Especifique una id" } );
    }else{
        const indexVideogame = videogames.findIndex( () => videogames.id === id );
        videogames.splice( indexVideogame, 1 );

        const json_videogames = JSON.stringify(videogames);
        fs.writeFileSync("./videogames.json", json_videogames, "utf-8");
    }

} );

module.exports = router;