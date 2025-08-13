package jar

import (
	"fmt"
	"time"
)

func AddMemory(mem Memory) error {
	if len(mem.Name) == 0 || time.Time(mem.OccuredAt).IsZero() || mem.Content == "" || mem.Title == "" || mem.Emotion == "" || mem.Jar == "" {
		return fmt.Errorf("all fields must be filled")
	}

	return InsertMemoryJar(mem)
}

func GetAllMemory() ([]Memory, error) {
	memories, err := GetAllMemories()
	if err != nil {
		return nil, fmt.Errorf("error retrieving memories: %w", err)
	}

	if len(memories) == 0 {
		return nil, fmt.Errorf("no memories found")
	}

	return memories, nil
}
