import prisma from "@/lib/client"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"

const AddPost = () => {

    const {userId} = auth()

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
            {/* AVATAR */}
            <Image src="https://images.pexels.com/photos/24589418/pexels-photo-24589418/free-photo-of-bois-paysage-eau-brume.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded-full" />
            {/* POST */}
            <div className="flex-1">
                {/* TEXT INPUT */}
                <form action="" className="flex gap-4">
                    <textarea placeholder="Qu'avez-vous en tête ?" className="flex-1 bg-slate-100 rounded-lg p-2" name="desc"></textarea>
                    <Image src="/emoji.png"
            alt=""
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end">
            </Image>
            <button>Publier</button>
                </form>
                {/* POST OPTIONS */}
                <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
                    <div className="flex items-center gap-2 cursor-pointer">
                    <Image src="/addimage.png" alt="" width={20} height={20} />
                    Photo
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                    <Image src="/addVideo.png" alt="" width={20} height={20} />
                    Vidéo
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                    <Image src="/addevent.png" alt="" width={20} height={20} />
                    Évènement
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                    <Image src="/poll.png" alt="" width={20} height={20} />
                    Sondage
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost