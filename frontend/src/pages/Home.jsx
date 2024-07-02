import SideBar from "../components/SideBar";
import MessageContainer from "../components/MessageContainer"

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-blue-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
      <SideBar/>
      <MessageContainer/> 
    </div>
  )
}

export default Home;
