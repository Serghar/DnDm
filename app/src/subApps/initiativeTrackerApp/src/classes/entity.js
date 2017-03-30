class Entity {
    constructor(init, name = null, race = null, gameClass = null) {
        this.name = name;
        this.initiative = init;
        this.delaying = false;
        this.class = gameClass;
        this.race = race ? race : "?????";
    }
}

export default Entity;