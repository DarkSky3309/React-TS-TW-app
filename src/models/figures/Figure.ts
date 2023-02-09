import {Colors} from "../Colors";
import logo from "../../assets/black-bishop.png"
import {Cell} from "../Cell";

export enum FigureNames{
    FIGURE = "FIGURE",
    KING = "KING",
    BISHOP = "BISHOP",
    PAWN = "BISHOP",
    QUEEN = "QUEEN",
    ROOK = "QUEEN",
    KNIGHT = "KNIGHT",
}
export class Figure{
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }
    showWindowToChange(){
        console.log(this.name)
    }
    canMove(target:Cell):boolean {
        if (target.figure?.color === this.color)
            return false
        if (target.figure?.name === FigureNames.KING)
            return false
        return true
    }
    moveFigure(target:Cell){

    }
}