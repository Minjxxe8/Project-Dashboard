package jar

import (
	"context"
	"project-dashboard/pkg/database"
)

func InsertMemoryJar(mem Memory) error {
	ctx := context.Background()

	tx, err := database.DB.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	var memoryID string
	err = tx.QueryRow(ctx, "INSERT INTO memory_entries (content, image_url, occurred_at, title, emoji, jar_name) VALUES ($1, $2, $3::date, $4, $5, $6) RETURNING id",
		mem.Content, mem.Image, mem.OccuredAt, mem.Title, mem.Emotion, mem.Jar).Scan(&memoryID)
	if err != nil {
		return err
	}

	for _, name := range mem.Name {
		var personID string
		err = tx.QueryRow(ctx, "INSERT INTO people (name) VALUES ($1) RETURNING id", name).Scan(&personID)
		if err != nil {
			return err
		}

		_, err = tx.Exec(ctx, "INSERT INTO memory_people (memory_id, person_id) VALUES ($1, $2)", memoryID, personID)
		if err != nil {
			return err
		}
	}

	return tx.Commit(ctx)
}

func GetAllMemories() ([]Memory, error) {
	ctx := context.Background()

	rows, err := database.DB.Query(ctx, `
        SELECT m.content, m.occurred_at, m.title, m.emoji, m.jar_name,
               COALESCE(array_agg(p.name) FILTER (WHERE p.name IS NOT NULL), '{}') AS people
        FROM memory_entries m
        LEFT JOIN memory_people mp ON m.id = mp.memory_id
        LEFT JOIN people p ON mp.person_id = p.id
        GROUP BY m.id
    `)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var memories []Memory
	for rows.Next() {
		var mem Memory
		var people []string

		if err := rows.Scan(
			&mem.Content,
			&mem.OccuredAt,
			&mem.Title,
			&mem.Emotion,
			&mem.Jar,
			&people,
		); err != nil {
			return nil, err
		}

		mem.Name = people
		memories = append(memories, mem)
	}

	return memories, nil
}
