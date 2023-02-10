import React, {FC} from 'react';
import {Colors} from "../models/Colors";
import {Player} from "../models/Player";
import {Cell} from "../models/Cell";

interface ModalWindowProps {
    currentPlayer: Player | null
    changeFigureToKnight: (cell:Cell) => void
    changeFigureToQueen: (cell:Cell) => void
    changeFigureToBishop: (cell:Cell) => void
}
const ModalWindowComponent: FC<ModalWindowProps> = () => {
    return (
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
    );
};

export default ModalWindowComponent;