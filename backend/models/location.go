package models

type Line struct {
	Name    string `json:"name"`
	Product string `json:"product"`
}

type Location struct {
	Type  string `json:"type"`
	Id    string `json:"id"`
	Name  string `json:"name,omitempty"`
	Lines []Line `json:"lines" `
}

func FilterLocationsByType(locations []Location) []Location {
	var filtered []Location
	for _, loc := range locations {
		if loc.Type == "stop" {
			filtered = append(filtered, loc)
		}
	}
	return filtered
}
