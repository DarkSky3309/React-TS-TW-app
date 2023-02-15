import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/white-pawn.png";
import blackLogo from "../../assets/black-pawn.png";

export class Pawn extends Figure {

    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.PAWN
    }

    pawnMove(target:Cell, direction:number):boolean{
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2
        if (!this.cell.board.getCell(this.cell.x, this.cell.y + direction).isEmpty() && this.isFirstStep)
            return false
        if ((target.y === this.cell.y + direction || this.isFirstStep && (target.y === this.cell.y + firstStepDirection))
            && target.x === this.cell.x
            && this.cell.board.getCell(target.x, target.y).isEmpty())
            return true
        return false
    }
    pawnAttack(target:Cell, direction:number):boolean{
        if (target.y === this.cell.y + direction && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && this.cell.isEnemy(target)) {
            return true
        }
        return false
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        return (this.pawnAttack(target, direction) || this.pawnMove(target, direction))

    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}