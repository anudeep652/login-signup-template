import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Sample() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const {user}= useSelector(state => state.auth)
    // const {isSuccess,message}= useSelector(state => state.auth)
    useEffect(() => {
      if(!user )  {
        navigate('/')
      }
      
    },[user,dispatch,navigate,])
   console.log("From sample")
    return (
    <>
    <h1 className='heading'>Welcome</h1>  
    </>
  )
}


export default Sample