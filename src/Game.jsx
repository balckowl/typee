import React, { useEffect, useState, useRef } from 'react'


const Game = ({ timer, missNumber, setMissNumber, point, setPoint, words, setScore }) => {
    const word = ['react', 'vue', 'typescript', 'svelte', 'html', 'css'];
    const [currentNumber, setCurrentNumber] = useState(0);
    const [wordNumber, setWordNumber] = useState(0);
    let [wordSplit, setWordSplit] = useState(null);
    const gameContainerRef = useRef(null);

    const caluclateScore = () => {
        setScore(point * 10 - missNumber)
    }

    useEffect(() => {
        setWordSplit(words[wordNumber].word.split(''));
        gameContainerRef.current.focus();
    }, [wordNumber])

    //最終スコアを計算
    useEffect(() =>{
        caluclateScore();
    },[point, missNumber])

    const handleKeyDown = (e) => {
        if (e.key === wordSplit[currentNumber]) {
            setCurrentNumber(currentNumber + 1);
        } else {
            setMissNumber(missNumber + 1);
        }

        if (currentNumber === wordSplit.length - 1) {
            setWordNumber(Math.floor(Math.random() * words.length));
            setPoint(point + 1);
            setCurrentNumber(0);
        }
    }


    return (
        <div>
            <div onKeyDown={(e) => handleKeyDown(e)} tabIndex={0} ref={gameContainerRef} className='game'>
                <span className='correct'>
                    {words[wordNumber].word.slice(0, currentNumber)}
                </span>
                <span className='defo'>
                    {words[wordNumber].word.slice(currentNumber, words[wordNumber].word.length)}
                </span>
            </div>
        </div >
    )
}

export default Game