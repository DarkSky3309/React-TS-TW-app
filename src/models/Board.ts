import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {Queen} from "./figures/Queen";
import {King} from "./figures/King";
import {Knight} from "./figures/Knight";
import {Bishop} from "./figures/Bishop";
import {Rook} from "./figures/Rook";
import {Figure} from "./figures/Figure";
import {Player} from "./Player";

export class Board {
    cells: Cell[][] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []
    whiteKingDangerous: boolean = false;
    blackKingDangerous: boolean = false;


    public InitCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 != 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // Black cell
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) //White cell
                }
            }
            this.cells.push(row);
        }
        ;
    };

    get getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        newBoard.lostBlackFigures = this.lostBlackFigures
        newBoard.whiteKingDangerous = this.whiteKingDangerous;
        newBoard.blackKingDangerous = this.blackKingDangerous;
        return newBoard;
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1))
            new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }

    private addQueen() {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }

    private addKing() {
        new King(Colors.BLACK, this.getCell(4, 0))
        new King(Colors.WHITE, this.getCell(4, 7))
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.WHITE, this.getCell(6, 7))
        new Knight(Colors.BLACK, this.getCell(6, 0))
        new Knight(Colors.WHITE, this.getCell(1, 7))
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.WHITE, this.getCell(7, 7))
        new Rook(Colors.BLACK, this.getCell(7, 0))
        new Rook(Colors.WHITE, this.getCell(0, 7))
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
        new Bishop(Colors.BLACK, this.getCell(5, 0))
        new Bishop(Colors.WHITE, this.getCell(2, 7))
    }

    private findKingPosition(player: Player) {
        for (const row of this.cells) {
            for (const cell of row) {
                if (cell.figure?.name === "KING" && cell.figure.color === player.color)
                    return cell;
            }
        }
    }

    public kingIsUnderAttack(player: Player) {
        let kingPosition = this.findKingPosition(player);
        for (const row of this.cells) {
            for (const cell of row) {
                if (cell.figure && cell.figure.color !== player.color && kingPosition) {
                    if (cell.figure.canMove(kingPosition)) {
                        return true
                    }
                }
            }
        }
    }

    public checkAllCellOnAttack (player: Player) {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.isUnderAttack = false;
            }
        }
        for (const row of this.cells) {
            for (const cell of row) {
                let figure = null;
                if (cell.figure && cell.figure.color === player.color){
                    figure = cell.figure
                }
                if (figure){
                    for (const indexRow of this.cells) {
                        for (const indexCell of indexRow) {
                            if (indexCell.figure?.name === "KING" && figure?.canMove(indexCell)){
                                if (indexCell.figure?.color === Colors.WHITE){
                                    console.log("white king in dangerous")
                                    this.whiteKingDangerous = true;
                                } else if (indexCell.figure?.color === Colors.BLACK){
                                    console.log("black king in dangerous")
                                    this.blackKingDangerous = true;
                                }
                            }
                            if (figure?.canFight(indexCell) && !this.blackKingDangerous && !this.whiteKingDangerous){
                                indexCell.isUnderAttack = true
                            } else if (figure?.canMove(indexCell)) {
                                indexCell.isUnderAttack = true;
                                indexCell.isUnderAttackToKing = true;
                            }

                        }
                    }
                }
            }
        }
    }

    public getCell(x: number, y: number
    ) {
        return this.cells[y][x]
    }

    public addFigures() {
        this.addBishops();
        this.addKing();
        this.addQueen();
        this.addPawns();
        this.addRooks();
        this.addKnights()
    }
}