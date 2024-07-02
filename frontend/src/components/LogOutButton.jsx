import { ArrowLeftIcon } from "@chakra-ui/icons"
import useLogout from "../hooks/useLogout"

const LogOutButton = () => {
  const {loading, logout} = useLogout();
  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <ArrowLeftIcon className='w-6 h-6 text-white cursor-pointer' style={{ color: 'white' }} onClick={logout}/> 
      )}   
    </div>
  )
}

export default LogOutButton
