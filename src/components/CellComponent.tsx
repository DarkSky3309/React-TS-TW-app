import React, {FC, memo} from 'react';
import {Cell} from "../models/Cell";

interface CellProps {
    cell: Cell
    selected: boolean
    click: (cell: Cell) => void
    setCell: (cell:Cell) => void
}

const CellComponent: FC<CellProps> = ({cell, selected, click, setCell}) => {
    return (
        <div onClick={() => {click(cell ); setCell(cell)}} className={['cell', cell.color, selected ? "selected" : ''].join(' ')} style={{background: cell.available && cell.figure ? 'green' : ''}}>
            {cell.available && !cell.figure && <div className={"available"}/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt={""}/>}
        </div>
    );
};

export default CellComponent;