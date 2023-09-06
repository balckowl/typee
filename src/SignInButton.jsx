import React from 'react'

const SignInButton = ({ signInWithGoogle }) => {
    return (
        <div onClick={signInWithGoogle}>
            <div>ログイン</div>
        </div>
    )
}

export default SignInButton