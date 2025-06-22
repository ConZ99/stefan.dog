package services

import (
	"BVGButBetter/models"
	"fmt"

	"github.com/go-resty/resty/v2"
)

func FetchTripEntry(endpointString, stopID string) ([]models.TripEntry, error) {
	url := "https://v6.bvg.transport.rest/stops/" + stopID + "/" + endpointString
	var data models.TripEntryType

	client := resty.New()
	resp, err := client.R().
		SetQueryParams(map[string]string{
			"duration": "100",
			"results":  "12",
		}).
		SetHeader("Accept", "application/json").
		SetResult(&data).
		Get(url)

	if err != nil {
		return nil, fmt.Errorf("making request: %v", err)
	}
	if resp.IsError() {
		return nil, fmt.Errorf("non-200 response: %s", resp.Status())
	}

	if len(data.Arrivals) > 0 {
		return data.Arrivals, nil
	}
	return data.Departures, nil
}

func FetchLocations(locationName string) ([]models.Location, error) {
	url := "https://v6.bvg.transport.rest/locations"
	var data []models.Location

	client := resty.New()
	resp, err := client.R().
		SetQueryParams(map[string]string{
			"query":        locationName,
			"fuzzy":        "true",
			"results":      "5",
			"linesOfStops": "true",
		}).
		SetHeader("Accept", "application/json").
		SetResult(&data).
		Get(url)

	if err != nil {
		return nil, fmt.Errorf("making request: %v", err)
	}
	if resp.IsError() {
		return nil, fmt.Errorf("non-200 response: %s", resp.Status())
	}

	return data, nil
}
