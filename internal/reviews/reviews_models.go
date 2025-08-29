package reviews

import "time"

type Review struct {
	Title      string    `json:"title"`
	Rating     int       `json:"rating"`
	OccuredAt  time.Time `json:"occuredAt"`
	Review     string    `json:"review"`
	File       string    `json:"file"`
	Emotion    string    `json:"emotion"`
	CategoryID int       `json:"category"`
}
