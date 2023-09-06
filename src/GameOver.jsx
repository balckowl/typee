import React, { useState, useEffect } from 'react'
import BackHome from './BackHome';
import { db, auth } from '../plugins/firebase'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const GameOver = ({ missNumber, point, isGameRestart, user, setUserHighscore, score }) => {

    const sendData = async () => {

        if (user) {
            const { uid } = auth.currentUser;
            const userDocRef = doc(db, 'users', uid);

            // ユーザー文書がすでに存在するかどうかを確認
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                // 文書が存在しない場合、新しい文書を作成
                await setDoc(userDocRef, {
                    highscore: score,
                    uid,
                });
                setUserHighscore(score);
            } else {
                // 文書が存在する場合、新しいハイスコアで文書を更新
                const userData = userDocSnap.data();
                const existingHighscore = userData.highscore;

                if (score > existingHighscore) {
                    await updateDoc(userDocRef, {
                        highscore: score,
                        uid,
                    });
                    setUserHighscore(score);
                } else {
                    setUserHighscore(existingHighscore);
                }
            }
        }
    }

    useEffect(() => {
        sendData();
    }, [point]);

    return (
        <div>
            <h4 className='game-over'>GameOver</h4>
            <BackHome isGameRestart={isGameRestart} />
        </div>
    )
}

export default GameOver