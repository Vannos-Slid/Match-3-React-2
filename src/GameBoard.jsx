import { useEffect, useState, useRef } from "react"
import ScoreBoard from "./ScoreBoard"
import './GameBoard.css'

const width = 8
const size = width * width

import reptile from './assets/characters/reptile.gif'
import rain from './assets/characters/rain.gif'
import scorpion from './assets/characters/scorpion.gif'
import ermac from './assets/characters/ermac.gif'
import subzero from './assets/characters/subzero.gif'


const yobls = [
    reptile, rain, scorpion, ermac, subzero
]

const GameBoard = () => {
    // Set current color arrangement function
    const [currentYibloArrangement, setCurrentYibloArrangement] = useState([])
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)
    // const squareBeingDragged = useRef(null)
    // const squareBeingReplaced = useRef(null)


    // Filling the main board with random yobls
    const createBoard = () => {
        const randomYibloArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = yobls[Math.floor(Math.random() * yobls.length)]
            randomYibloArrangement.push(randomColor)
        }
        // console.log(randomYibloArrangement)

        setCurrentYibloArrangement(randomYibloArrangement)
    }

    //Check for N matches by vertical
    const checkForColumnOfN = (number) => {
        const numShouldCheckIndexes = size - width * (number - 1) - 1
        for (let i = 0; i <= numShouldCheckIndexes; i++) {
            const columnOfFour = []
            for (let j = 0; j < number; j++) {
                columnOfFour.push(i + width * j)
            }

            const decidedYiblo = currentYibloArrangement[i]
            const isBlank = currentYibloArrangement[i] === null

            if (columnOfFour.every(square => currentYibloArrangement[square] === decidedYiblo && !isBlank)) {
                setScoreDisplay((score) => score + number)
                columnOfFour.forEach(square => currentYibloArrangement[square] = null)
                return true
            }
            // return false
        }
    }

    //Check for 4 matches by horizontal
    const checkForRowOfN = (number) => {
        for (let i = 0; i <= 63; i++) {
            const rowOfFour = []
            for (let j = 0; j < number; j++) {
                rowOfFour.push(i + j)
            }

            const decidedYiblo = currentYibloArrangement[i]
            const isBlank = currentYibloArrangement[i] === null

            const notValid = []
            const invalidIndex = width - number + 1
            for (let j = invalidIndex; j < width; j += width) {
                for (let z = 0; z < number - 1; z++) {
                    notValid.push(invalidIndex + z)
                }
            }

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentYibloArrangement[square] === decidedYiblo && !isBlank)) {
                setScoreDisplay((score) => score + number)
                rowOfFour.forEach(square => currentYibloArrangement[square] = null)
                return true
            }
            // return false
        }
    }

    //Check for 4 matches by vertical
    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedYiblo = currentYibloArrangement[i]
            const isBlank = currentYibloArrangement[i] === null

            if (columnOfFour.every(square => currentYibloArrangement[square] === decidedYiblo && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                columnOfFour.forEach(square => currentYibloArrangement[square] = null)
                return true
            }
            // return false
        }
    }

    //Check for 3 matches by vertical
    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedYiblo = currentYibloArrangement[i]
            const isBlank = currentYibloArrangement[i] === null

            if (columnOfThree.every(square => currentYibloArrangement[square] === decidedYiblo && !isBlank)) {
                setScoreDisplay((score) => score + 3)
                columnOfThree.forEach(square => currentYibloArrangement[square] = null)
                return true
            }
            // return false
        }
    }


    //Check for 4 matches by horizontal
    const checkForRowOfFour = () => {
        for (let i = 0; i <= 63; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decidedYiblo = currentYibloArrangement[i]
            const isBlank = currentYibloArrangement[i] === null
            const notValid =
                [5, 6, 7,
                    13, 14, 15,
                    21, 22, 23,
                    29, 30, 31,
                    37, 38, 39,
                    45, 46, 47,
                    53, 54, 55,
                    61, 62, 63]

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentYibloArrangement[square] === decidedYiblo && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                rowOfFour.forEach(square => currentYibloArrangement[square] = null)
                return true
            }
            // return false
        }
    }

    //Check for 3 matches by horizontal
    const checkForRowOfThree = () => {
        for (let i = 0; i <= 63; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedYiblo = currentYibloArrangement[i]
            const isBlank = currentYibloArrangement[i] === null
            const notValid =
                [6, 7,
                    14, 15,
                    22, 23,
                    30, 31,
                    38, 39,
                    46, 47,
                    54, 55,
                    62, 63]

            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentYibloArrangement[square] === decidedYiblo && !isBlank)) {
                setScoreDisplay((score) => score + 3)
                rowOfThree.forEach(square => currentYibloArrangement[square] = null)
                return true
            }
            // return false
        }
    }

    //Makes yobls fall down if there is a space below
    //Then generates new yobls on empty spaces
    const moveIntoSquareBelow = () => {
        for (let i = 0; i < 64 - width; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentYibloArrangement[i] === null) {
                currentYibloArrangement[i] = yobls[Math.floor(Math.random() * yobls.length)]
                // console.log(currentYibloArrangement[i])
            }

            if (currentYibloArrangement[i + width] === null) {
                // [currentYibloArrangement[i + width]] = [currentYibloArrangement[i]]
                currentYibloArrangement[i + width] = currentYibloArrangement[i]
                currentYibloArrangement[i] = null
            }
        }
    }

    //Call function once for run
    useEffect(() => {
        createBoard()
    }, [])


    // Check board for every 100ms
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         checkForColumnOfFour()
    //         checkForRowOfFour()
    //         checkForColumnOfThree()
    //         checkForRowOfThree()
    //         moveIntoSquareBelow()
    //         setCurrentYibloArrangement([...currentYibloArrangement])
    //         // console.log(currentYibloArrangement)
    //         // console.log(scoreDisplay)
    //     }, 100)
    //     return () => clearInterval(timer)


    // }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentYibloArrangement])

    useEffect(() => {
        const timer = setInterval(() => {
            for (let i = width; i > 2; i--) {
                checkForColumnOfN(i)
                checkForRowOfN(i)
            }
            moveIntoSquareBelow()
            setCurrentYibloArrangement([...currentYibloArrangement])
            // console.log(currentYibloArrangement)
            // console.log(scoreDisplay)
        }, 100)
        return () => clearInterval(timer)

    }, [checkForColumnOfN, checkForRowOfN, moveIntoSquareBelow, currentYibloArrangement])

    // console.log(currentYibloArrangement)


    const dragStart = (e) => {
        // console.log(e.target);
        console.log('drag start');
        // squareBeingDragged.current = e.target;
        setSquareBeingDragged(e.target)
    };


    const dragDrop = (e) => {
        // console.log(e.target)
        console.log('drag drop')
        // squareBeingReplaced.current = e.target;
        setSquareBeingReplaced(e.target)
    }

    //replace dragged element with hovered one
    const dragEnd = () => {
        // console.log(e.target)
        console.log('drag end')

        //get id-s of dragged and hovered element
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
        // const squareBeingDraggedId = parseInt(squareBeingDragged.current.getAttribute('data-id'))
        // const squareBeingReplacedId = parseInt(squareBeingReplaced.current.getAttribute('data-id'))

        // console.log('squareBeingDraggedId', squareBeingDraggedId)
        // console.log('squareBeingReplacedId', squareBeingReplacedId)

        //Check if we can replace element with selected place
        const validMoves = [
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width,
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width]

        const isValidMove = validMoves.includes(squareBeingReplacedId)

        // const columnOfFour = checkForColumnOfFour()
        // const rowOfFour = checkForRowOfFour()
        // const columnOfThree = checkForColumnOfThree()
        // const forRowOfThree = checkForRowOfThree()


        //replace elements if condition is correct
        if (squareBeingReplacedId && isValidMove) {
            const newYibloArrangement = [...currentYibloArrangement];
            [newYibloArrangement[squareBeingReplacedId], newYibloArrangement[squareBeingDraggedId]] =
                [newYibloArrangement[squareBeingDraggedId], newYibloArrangement[squareBeingReplacedId]];

            // newYibloArrangement[squareBeingReplacedId] = squareBeingDragged.src
            // newYibloArrangement[squareBeingDraggedId] = squareBeingReplaced.src

            // const hasMatches = checkForColumnOfFour() ||
            //     checkForRowOfFour ||
            //     checkForColumnOfThree ||
            //     checkForRowOfThree

            // if (hasMatches) {
            //     setCurrentYibloArrangement([...currentYibloArrangement])
            // }

            // console.log(newYibloArrangement)

            // console.log(currentYibloArrangement)

            setCurrentYibloArrangement(newYibloArrangement);

            // console.log(currentYibloArrangement)
        }

        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
    }

    // Image constructor
    function Tile({ image, index }) {
        return (
            <img
                key={index}
                src={image}
                alt="ha ha loh"
                data-id={index}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
                style={{
                    borderRadius: "50px"
                }}
            ></img>
        )
    }

    //creating a game window
    return (
        <div className="app">
            <div className="game">
                {currentYibloArrangement.map((yiblo, index) => (
                    // <Tile
                    //     key={index}
                    //     image={yiblo}
                    // ></Tile>
                    <img
                        key={index}
                        src={yiblo}
                        alt="ha ha loh"
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                        style={{
                            borderRadius: "50px"
                        }}
                    ></img>
                ))}
            </div>
            <ScoreBoard score={scoreDisplay} />
        </div>
    )
}

export default GameBoard