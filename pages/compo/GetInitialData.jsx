import { initialData } from '@/lib/Reducers/AuthSlice'
import { getUsers } from '@/lib/Reducers/todoSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

 const GetInitialData = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    dispatch(initialData())
    dispatch(getUsers())
  }

}
export default GetInitialData;