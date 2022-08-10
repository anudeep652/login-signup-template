import { useSelector } from 'react-redux'

function Sample() {
    const {email}= useSelector(state => state.auth?.user)
    console.log(email)
    return (
    <>
    <div>Hello </div>
    </>
  )
}

export default Sample