package models

type TripEntryType struct {
	Departures []TripEntry `json:"departures,omitempty"`
	Arrivals   []TripEntry `json:"arrivals,omitempty"`
}

type TripEntry struct {
	TripID string `json:"tripId"`
	Line   struct {
		Name    string `json:"name"`
		Product string `json:"product"`
	} `json:"line" `
	Direction   string `json:"direction" `
	When        string `json:"when" `
	PlannedWhen string `json:"plannedWhen" `
	Delay       int    `json:"delay" `
	PrevStop    struct {
		ID   string `json:"id" `
		Name string `json:"name"`
	} `json:"origin"`
}

func Cleanup(arrivals, departures []TripEntry) []TripEntry {
	tripMap := make(map[string]TripEntry)

	for _, departure := range departures {
		tripMap[departure.TripID] = departure
	}
	for _, arrival := range arrivals {
		if entry, found := tripMap[arrival.TripID]; found {
			entry.PrevStop = arrival.PrevStop
			tripMap[arrival.TripID] = entry
		}
	}

	result := []TripEntry{}
	for _, trip := range tripMap {
		result = append(result, trip)
	}

	return result
}
