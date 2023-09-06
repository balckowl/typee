import React, { useEffect, useState } from 'react'
import Game from './Game'
import GameOver from './GameOver'
import GameStrat from './GameStrat'
import guestUser from './assets/guestUser.png'
import SignInButton from './SignInButton'
import { auth, provider } from '../plugins/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import SignOutButton from './SignOutButton'
import { db } from '../plugins/firebase'
import { doc, getDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {

    //ログイン機能
    const [user] = useAuthState(auth);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    }

    const [isStart, setIsStart] = useState(false);
    const [timer, setTimer] = useState(20);
    let [missNumber, setMissNumber] = useState(0);
    let [point, setPoint] = useState(0);
    const [words, setWords] = useState(null);
    const [score, setScore] = useState(0);
    const [userHighscore, setUserHighscore] = useState(0);
    const [loading, setLoading] = useState(true);

    //スタート
    const isGameStart = () => {
        setIsStart(true);
    }

    const isGameRestart = () => {
        setIsStart(false);
        setTimer(20);
        setMissNumber(0);
        setPoint(0);
        setScore(0);
    }

    //ワードゲームを取得する
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "words"));

        const fetchedPosts = querySnapshot.docs.map((doc) => {
            return doc.data();
        });

        setWords(fetchedPosts);
        setLoading(false);
    }

    const getUserHighScore = async () => {
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'users', userId);

            try {
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    return userData.highscore || 0;
                }
            } catch (error) {
                console.error('ハイスコアの取得中にエラーが発生しました', error);
            }
        }
        return 0;
    };

    useEffect(() => {
        getData();
    }, [])

    //ハイスコアを取得
    useEffect(() => {
        if (user) {
            getUserHighScore().then((highscore) => {
                setUserHighscore(highscore);
            });
        }
    }, [user]);

    //タイマー
    useEffect(() => {
        let countdown;

        if (isStart && timer > 0) {
            countdown = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0) {
            // タイマーが0になったときの処理
            clearInterval(countdown);
        }

        return () => clearInterval(countdown);
    }, [timer, isStart]);

    return (
        <div>
            {loading ? (
                <div>
                    <p>Loading</p>
                </div>
            ) : (
                <div>
                    <header>
                        <div className="container">
                            <h1><a href="">Typee</a></h1>
                            <ul>
                                {user ? (
                                    <li>
                                        <SignOutButton />
                                    </li>
                                ) : (
                                    <li>
                                        <SignInButton signInWithGoogle={signInWithGoogle} />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </header>

                    <main>
                        <div className="container">
                            <div className="row g-0">
                                <div className="col-lg-2 s-left">残り時間：{timer}</div>
                                <div className="col-lg-2 s-middle">クリアー数：{point}</div>
                                <div className="col-lg-2 s-right">ミス数：{missNumber}</div>
                                <div className="col-lg-2 score">スコア：{score}</div>
                                <div className="col-lg-8 left d-flex justify-content-center align-items-center">
                                    {isStart ? (timer > 0 ? <Game timer={timer} missNumber={missNumber} setMissNumber={setMissNumber} point={point} setPoint={setPoint} words={words} setScore={setScore} /> : <GameOver missNumber={missNumber} point={point} isGameRestart={isGameRestart} user={user} setUserHighscore={setUserHighscore} score={score} />) : <GameStrat setIsStart={setIsStart} />}
                                </div>
                                <div className="col-lg-4 right d-flex justify-content-center align-items-center">
                                    {user ? (
                                        <div>
                                            <div className='d-flex justify-content-center mb-3'>
                                                <img src={auth.currentUser.photoURL} alt="" className='user-icon' />
                                            </div>
                                            <h3>{auth.currentUser.displayName}</h3>
                                            <p className="text-center">最高得点：{userHighscore}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className='d-flex justify-content-center mb-3'>
                                                <img src={guestUser} alt="" className='user-icon' />
                                            </div>
                                            <h3>ゲストユーザー</h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    )
}

export default Home