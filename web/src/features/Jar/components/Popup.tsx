function Popup() {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-[500px] w-[750px] rounded-2xl shadow-[0px_0px_67px_34px_rgba(0,_0,_0,_0.1)] flex flex-col items-center p-10">
            <h1 className="text-2xl">Add Memories</h1>
            <input placeholder="entre"/>
        </div>
)
}

export default Popup;