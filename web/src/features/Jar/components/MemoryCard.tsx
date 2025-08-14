

function MemoryCard({ memory, onClose } : { memory: any, onClose: () => void }) {
    return (
        <div>
            <section
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-[600px] w-[950px] rounded-2xl shadow-[0px_0px_67px_34px_rgba(0,_0,_0,_0.1)] flex flex-col  items-center backdrop-blur-3xl border-1">
                <div className="absolute top-6 right-10 cursor-pointer" onClick={onClose}>X</div>

                <h1 className="text-3xl mt-6 font-semibold">{memory.title}</h1>

                <div className="flex flex-wrap gap-2 mt-7">
                    {Array.isArray(memory.name) ? (
                        memory.name.map((name: string, index: number) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {name}
                            </span>
                        ))
                    ) : (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {memory.name}
                        </span>
                    )}
                </div>

                <div className="mt-4 text-center">
                    <p className="text-gray-500 mt-2">Emotion: <span className="font-semibold">{memory.emotion}</span></p>
                    <p className="text-gray-500 mt-1">Jar: <span className="font-semibold">{memory.jar}</span></p>
                    <p className="text-gray-500 mt-1">Occured At: <span className="font-semibold">{new Date(memory.occuredAt).toLocaleDateString()}</span></p>
                </div>

                <div style={{overflow: 'scroll', scrollbarWidth: "none"}} className="w-[90%] h-[70%] mt-6 p-4 rounded-t-lg shadow-md">
                    {memory.content}
                </div>


            </section>
        </div>
    )
}

export default MemoryCard;