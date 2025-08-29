package jar

import (
	"time"
)

type Memory struct {
	Name      []string  `json:"name"`
	OccuredAt time.Time `json:"occuredAt"`
	Content   string    `json:"content"`
	Title     string    `json:"title"`
	Emotion   string    `json:"emotion"`
	Jar       string    `json:"jar"`
	Image     string    `json:"image"`
}
