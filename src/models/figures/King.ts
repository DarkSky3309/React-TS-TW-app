import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/white-king.png";
import blackLogo from "../../assets/black-king.png";

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KING
    }

    figureAttackAndMove(target:Cell): boolean{
        if (((this.cell.y + 1 === target.y || this.cell.y - 1 === target.y)
                && Math.abs(target.x - this.cell.x) < 2)
            ||
            ((this.cell.x + 1 === target.x || this.cell.x - 1 === target.x)
                && Math.abs(target.y - this.cell.y) < 2))
            return true

        return false
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }
        if (target.isUnderAttack){
            return false
        }
        return this.figureAttackAndMove(target)

    }
}