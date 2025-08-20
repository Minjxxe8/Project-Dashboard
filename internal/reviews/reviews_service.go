package reviews

import "fmt"

func AddReview(review Review) error {
	if review.Title == "" || review.Rating < 1 || review.Rating > 10 || review.OccuredAt.IsZero() || review.Review == "" || review.CategoryID == "" {
		return fmt.Errorf("all fields must be filled and rating must be between 1 and 10")
	}

	return InsertReview(review)
}

func GetAllReview() ([]Review, error) {
	reviews, err := GetAllReviews()
	if err != nil {
		return nil, fmt.Errorf("error retrieving reviews: %w", err)
	}

	if len(reviews) == 0 {
		return nil, fmt.Errorf("no reviews found")
	}

	return reviews, nil
}
