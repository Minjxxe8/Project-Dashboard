import Table from "./components/Table.tsx";
import {useState} from "react";
import ReviewsPopup from "./components/ReviewsPopup.tsx";


function ReviewsPage() {

    const [showPopup, setShowPopup] = useState(false);

    const handleReviewclick = () => {
        console.log("Add Review button clicked");
        setShowPopup(true);
    }

    return (
        <>
            <p className="text-center text-3xl underline">Reviews</p>
            <div className="w-[90%] mx-auto mt-10 gap-6 mt-[70px]">
                <button onClick={handleReviewclick}
                    className="py-4 px-6 rounded-xl cursor-pointer border border-black hover:bg-black hover:text-white">Add
                    Reviews
                </button>
                <Table/>
            </div>

            {showPopup && <ReviewsPopup onclose={() => setShowPopup(false)} /> }
        </>
    )
}

export default ReviewsPage;