import {memo, useEffect, useState} from 'react'
import './App.css'
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFiguresComponent from "./components/LostFiguresComponent";

const App = memo(() => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.InitCells();
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer() {
        if (currentPlayer)
        board.checkAllCellOnAttack(currentPlayer);
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className={"lost"}>
                <LostFiguresComponent title={"White figures"}
                                      figures={board.lostWhiteFigures}/></div>

            <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
            <div className={"lost"}>
                <LostFiguresComponent title={"Black figures"}
                                      figures={board.lostBlackFigures}/>
            </div>


        </div>
    )
})

export default App
