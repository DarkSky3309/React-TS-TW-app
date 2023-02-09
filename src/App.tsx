import {useEffect, useState} from 'react'
import './App.css'
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";

function App() {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
    useEffect(() => {
        restart()
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.InitCells();
        newBoard.addFigures()
        setBoard(newBoard)
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <BoardComponent board={board} setBoard={setBoard}/>
        </div>
    )
}

export default App
