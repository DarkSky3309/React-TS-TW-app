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

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }

        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2
        if (!this.cell.board.getCell(this.cell.x, this.cell.y + direction).isEmpty())
            return false
        if ((target.y === this.cell.y + direction || this.isFirstStep && (target.y === this.cell.y + firstStepDirection))
        && target.x === this.cell.x
        && this.cell.board.getCell(target.x, target.y).isEmpty())
            return true
        return false
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}