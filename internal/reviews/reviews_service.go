package reviews

import "fmt"

func AddReview(review Review) error {
	if review.Title == "" || review.Rating < 1 || review.Rating > 10 || review.OccuredAt.IsZero() || review.Review == "" || review.Emotion == "" {
		return fmt.Errorf("all fields must be filled and rating must be between 1 and 10")
	}

	if review.CategoryID == 0 || review.CategoryID > 5 {
		review.CategoryID = 1
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
