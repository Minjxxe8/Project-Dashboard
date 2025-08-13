package jar

import (
	"context"
	"project-dashboard/pkg/database"
)

func InsertMemoryJar(mem Memory) error {
	ctx := context.Background()

	_, err := database.DB.Exec(ctx, "INSERT INTO memory_entries (content, image_url, occurred_at, title, emoji, jar_name) VALUES ($1, $2, $3::date, $4, $5, $6)",
		mem.Content, mem.Image, mem.OccuredAt, mem.Title, mem.Emotion, mem.Jar)
	return err
}

func GetAllMemories() ([]Memory, error) {
	ctx := context.Background()
	rows, err := database.DB.Query(ctx, "SELECT content, occurred_at, title, emoji, jar_name FROM memory_entries")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var memories []Memory
	for rows.Next() {
		var mem Memory
		if err := rows.Scan(&mem.Content, &mem.OccuredAt, &mem.Title, &mem.Emotion, &mem.Jar); err != nil {
			return nil, err
		}
		memories = append(memories, mem)
	}
	return memories, nil
}
