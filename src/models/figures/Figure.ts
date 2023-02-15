import {Colors} from "../Colors";
import logo from "../../assets/black-bishop.png"
import {Cell} from "../Cell";

export enum FigureNames {
    FIGURE = "FIGURE",
    KING = "KING",
    BISHOP = "BISHOP",
    PAWN = "PAWN",
    QUEEN = "QUEEN",
    ROOK = "ROOK",
    KNIGHT = "KNIGHT",
}

export class Figure {
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


    canMove(target: Cell): boolean {
        if (target.figure?.color === this.color)
            return false
        return true
    }



    canFight(target: Cell): boolean {
        if (this.name === "BISHOP") {
            return this.cell.isEmptyDiagonal(target);

        }
        if (this.name === "QUEEN") {
            if (this.cell.isEmptyVertical(target))
                return true;
            if (this.cell.isEmptyHorizontal(target))
                return true
            return this.cell.isEmptyDiagonal(target);
        }
        if (this.name === "KING") {
            return ((this.cell.y + 1 === target.y || this.cell.y - 1 === target.y)
                    && Math.abs(target.x - this.cell.x) < 2)
                ||
                ((this.cell.x + 1 === target.x || this.cell.x - 1 === target.x)
                    && Math.abs(target.y - this.cell.y) < 2);

        }
        if (this.name === "KNIGHT") {
            const dx = Math.abs(this.cell.x - target.x);
            const dy = Math.abs(this.cell.y - target.y);
            return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
        }
        if (this.name === "ROOK") {
            if (this.cell.isEmptyVertical(target))
                return true;
            return this.cell.isEmptyHorizontal(target);

        }
        if (this.name === "PAWN") {
            const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
            if (target.y === this.cell.y + direction && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)) {
                return true
            }
        }
        return false
    }

    moveFigure(target: Cell) {

    }

}