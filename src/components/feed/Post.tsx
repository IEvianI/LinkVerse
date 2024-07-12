import Image from "next/image"
import Comments from "./Comments"

const Post = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* USER */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image src="https://images.pexels.com/photos/25568965/pexels-photo-25568965/free-photo-of-bois-mode-gens-personnes.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full" />
                    <span className="font-medium">Jane McBride</span>
                </div>
                <Image src="/more.png"
                    alt=""
                    width={16}
                    height={16} />
            </div>
            {/* DESC */}
            <div className="flex flex-col gap-4">
                <div className="w-full min-h-96 relative">
                <Image src="https://images.pexels.com/photos/9551192/pexels-photo-9551192.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt="" fill className="object-cover rounded-md" />
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolor iure, atque vero inventore praesentium quae placeat libero.
                    Nostrum provident debitis similique laborum, quibusdam praesentium odio ratione libero</p>
            </div>
            {/* INTERACTION */}
            <div className="flex items-center justify-between text-sm my-4">
                <div className="flex gap-8">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                    <Image src="/like.png"
                    alt="" width={16} height={16} className="cursor-pointer" />
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">123<span className="hidden md:inline"> J'aime</span></span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                    <Image src="/comment.png"
                    alt="" width={16} height={16} className="cursor-pointer" />
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">123<span className="hidden md:inline"> Commentaires</span></span>
                    </div>
                </div>
                <div className="">
                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                    <Image src="/share.png"
                    alt="" width={16} height={16} className="cursor-pointer" />
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">123<span className="hidden md:inline"> Partages</span></span>
                    </div>
                </div>
            </div>
            <Comments />
            </div>
    )
}

export default Post