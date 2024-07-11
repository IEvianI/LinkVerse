import Image from "next/image"

const Stories = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
            <div className="flex gap-8 w-max">
                {/* STORY */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/19068966/pexels-photo-19068966/free-photo-of-main-ete-boire-paille.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Anthony</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/19068966/pexels-photo-19068966/free-photo-of-main-ete-boire-paille.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Anthony</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/19068966/pexels-photo-19068966/free-photo-of-main-ete-boire-paille.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Anthony</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/19068966/pexels-photo-19068966/free-photo-of-main-ete-boire-paille.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Anthony</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/19068966/pexels-photo-19068966/free-photo-of-main-ete-boire-paille.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Anthony</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/19068966/pexels-photo-19068966/free-photo-of-main-ete-boire-paille.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Anthony</span>
                </div>
            </div>
            </div>
    )
}

export default Stories