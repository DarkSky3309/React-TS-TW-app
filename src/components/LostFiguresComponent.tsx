import React, {FC, memo} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFiguresProps {
    title: string;
    figures: Figure[]
}
const LostFiguresComponent: FC<LostFiguresProps> = ({title, figures}) => {
    return (
        <div >
            <h3>{title}</h3>
            <div className={"listOfChess"}>
                {figures.map(figure =>
                    <div key={figure.id}>
                        {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo}/>}
                    </div>)}
            </div>

        </div>
    );
};

export default LostFiguresComponent;