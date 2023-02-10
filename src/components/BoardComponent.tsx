import React, {FC, memo, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import {FigureNames} from "../models/figures/Figure";
import {Queen} from "../models/figures/Queen";
import {Knight} from "../models/figures/Knight";
import {Bishop} from "../models/figures/Bishop";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = memo(({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [cell, setCell] = useState<Cell | null>(null)

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer()
            checkEndBoard(cell)
            setSelectedCell(null);
        } else if (cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell)
        }
    }

    function checkEndBoard(cell: Cell) {
        if (cell.figure?.color === Colors.BLACK && cell.y === 7 && cell.figure.name === FigureNames.PAWN) {
            return setShowModal(true)
        } else if (cell.figure?.color === Colors.WHITE && cell.y === 0 && cell.figure.name === FigureNames.PAWN) {
            return setShowModal(true)
        }
    }

    function changeFigureToQueen(cell: any) {
        cell.figure = new Queen(cell.figure.color, cell)
        setShowModal(false)
    }

    function changeFigureToKnight(cell: any) {
        cell.figure = new Knight(cell.figure.color, cell)
        setShowModal(false)
    }

    function changeFigureToBishop(cell: any) {
        cell.figure = new Bishop(cell.figure.color, cell)
        setShowModal(false)
    }


    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard;
        setBoard(newBoard);
    }


    return (
        <div>
            <h3>Current Player: {currentPlayer?.color}</h3>
            {showModal ?
                <div className={"board"}>
                    <div className={"modalWindow"}>
                        <div className={"content"}>
                            <div className={"chesses"}>
                                {currentPlayer?.color === Colors.WHITE ? (
                                        <>
                                            <div onClick={() => changeFigureToKnight(cell)} className={"chess"}><img
                                                src="src/assets/black-knight.png" alt=""/></div>
                                            <div onClick={() => changeFigureToBishop(cell)} className={"chess"}><img
                                                src="src/assets/black-bishop.png" alt=""/></div>
                                            <div onClick={() => changeFigureToQueen(cell)} className={"chess"}><img
                                                src="src/assets/black-queen.png" alt=""/></div>
                                        </>)
                                    :
                                    <>
                                        <div onClick={() => changeFigureToKnight(cell)} className={"chess"}><img
                                            src="src/assets/white-knight.png" alt=""/></div>
                                        <div onClick={() => changeFigureToBishop(cell)} className={"chess"}><img
                                            src="src/assets/white-bishop.png" alt=""/></div>
                                        <div onClick={() => changeFigureToQueen(cell)} className={"chess"}><img
                                            src="src/assets/white-queen.png" alt=""/></div>
                                    </>
                                }
                            </div>
                            <h3>Choose your figure</h3>
                        </div>
                    </div>
                </div>
                : (<div className={"board"}>
                    {board.cells.map((row, index) =>
                        <React.Fragment key={index}>
                            {row.map(cell => <CellComponent click={click} cell={cell} key={cell.id} setCell={setCell}
                                                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>)}
                        </React.Fragment>)}
                </div>)
            }
        </div>
    );
});

export default BoardComponent;