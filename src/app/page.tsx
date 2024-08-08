import AddPost from "@/components/AddPost"
import Feed from "@/components/feed/Feed"
import LeftMenu from "@/components/leftMenu/LeftMenu"
import ProfileCard from "@/components/leftMenu/ProfileCard"
import RightMenu from "@/components/rightMenu/RightMenu"
import Stories from "@/components/Stories"

const Homepage = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className='flex max-[767px]:flex-col gap-6 pt-6'>
      <div className="hidden xl:block w-[20%]"><LeftMenu type="home" /></div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed />
          {type === "home" && <ProfileCard />}
        </div>
      </div>
      <div className="max-[767px]:w-full lg:block w-[30%]"><RightMenu /></div>
    </div>
  )
}

export default Homepage