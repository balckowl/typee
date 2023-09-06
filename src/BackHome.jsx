import React from 'react'

const BackHome = ({ isGameRestart }) => {
    return (
        <div class='d-flex justify-content-center'>
            <button onClick={isGameRestart}>BackHome</button>
        </div>
    )
}

export default BackHome