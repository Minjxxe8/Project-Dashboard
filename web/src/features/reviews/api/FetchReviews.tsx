import {reviews} from "../../typescript/ReviewsOptions.ts";

//Il faudra l'importer de la data du backend
export async function fetchReviews() {
    return new Promise<typeof reviews>((resolve) => {
        setTimeout(() => {
            resolve(reviews);
        }, 300);
    });
}