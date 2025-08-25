package reviews

import (
	"context"
	"project-dashboard/pkg/database"
	"time"
)

func InsertReview(review Review) error {
	ctx := context.Background()
	tx, err := database.DB.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	err = tx.QueryRow(ctx, "INSERT INTO reviews (title, rating, review_date, content, emotion, photo_url,category_id) VALUES ($1, $2, $3::date, $4, $5, $6) RETURNING category_id",
		review.Title, review.Rating, review.OccuredAt, review.Review, review.File, review.Emotion, review.CategoryID).Scan(&review.CategoryID)
	if err != nil {
		return err
	}

	return tx.Commit(ctx)
}

func GetAllReviews() ([]Review, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	rows, err := database.DB.Query(ctx, `
		SELECT title, rating, review_date, content, photo_url, emotion, category_id
		FROM reviews
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reviews []Review
	for rows.Next() {
		var review Review
		if err := rows.Scan(&review.Title, &review.Rating, &review.OccuredAt, &review.Review, &review.File, &review.Emotion, &review.CategoryID); err != nil {
			return nil, err
		}
		reviews = append(reviews, review)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return reviews, nil
}
