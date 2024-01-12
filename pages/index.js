import { useEffect, useState } from "react";
import Navbar12 from "./Navbar12";
// import { useSelector } from "react-redux";
import UserPageSlider from "./compo/PrevSlide";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div>
        {isClient && <Navbar12/>}
        {/* <h1>{user?.name}</h1> */}

        <div className="flex justify-center pt-14">
          <h1 className="font-bold text-2xl">Home Page</h1>
        </div>
        <UserPageSlider />
      </div>
    </>
  );
}
