import React from 'react'
import { auth } from '../plugins/firebase';

const SignOutButton = () => {
    return (
        <div>
            <div onClick={() => auth.signOut()}>サインアウト</div>
        </div>
    )
}

export default SignOutButton