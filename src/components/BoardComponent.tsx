import React, {FC, memo, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import {FigureNames} from "../models/figures/Figure";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = memo(({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [showModal, setShowModal] = useState(false)

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
                                    <><div className={"chess"}><img src="src/assets/black-knight.png" alt=""/></div>
                                        <div className={"chess"}><img src="src/assets/black-bishop.png" alt=""/></div>
                                        <div className={"chess"}><img src="src/assets/black-queen.png" alt=""/></div></> )
                                    :
                                    <><div className={"chess"}><img src="src/assets/white-knight.png" alt=""/></div>
                                        <div className={"chess"}><img src="src/assets/white-knight.png" alt=""/></div>
                                        <div className={"chess"}><img src="src/assets/white-knight.png" alt=""/></div></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                : (<div className={"board"}>
                    {board.cells.map((row, index) =>
                        <React.Fragment key={index}>
                            {row.map(cell => <CellComponent click={click} cell={cell} key={cell.id}
                                                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>)}
                        </React.Fragment>)}
                </div>)
            }
        </div>
    );
});

export default BoardComponent;