import {Colors} from "./Colors";

export class Player {
    color: Colors;
    myKingIsUnderAttack: boolean = false;
    constructor(color: Colors) {
        this.color = color;
    }
}

