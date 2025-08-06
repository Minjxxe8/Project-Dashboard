import Table from "./components/Table.tsx";


function ReviewsPage() {
    return (
        <>
            <p className="text-center text-3xl underline">Reviews</p>
            <div className="w-[90%] mx-auto mt-10 gap-6 mt-[70px]">
                <button
                    className="py-4 px-6 rounded-xl cursor-pointer border border-black hover:bg-black hover:text-white">Add
                    Reviews
                </button>
                <Table/>
            </div>
        </>
    )
}

export default ReviewsPage;