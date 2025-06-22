1. FE to BE link
2. FE has a search bar, on enter it requests: "https://v6.bvg.transport.rest/locations?query={$name}&results=10&linesOfStops=true"
3. Make search bar show list of options, BE queries and sends to FE the list of station names to select.
4. Make search bar show options without the need to press enter
5. Select a station name then request: "https://v6.bvg.transport.rest/stops/{$id}/departures?duration=100&results=10"
6. Make a list of possible lines and make buttons/links for them (from 2.)
7. Show list of arrivals in table

Nice to have:
1. Add map "openStreetMap" ??? under table of lines
2. Select a stop then select a line (take rideId from departures) and list out stopOvers or polyLine to draw on map.
3. A button to filter only bus/tram... how? elegant solution POC

Notes:
!!! figure out which side the tram is on !!! use destination (if Schoneweide then on Wuhlheide side, otherwise on appartment side.. hardcoded no like)
Use arrivals: origin!!! map stationIDs and group rides on stationID "https://v6.bvg.transport.rest/stops/900181506/arrivals?duration=20&results=10"
At #2 save: {stopName, id, lines[name, productName/product(to color code)]}.
At #5 pass the saved id to query.
At #5 save: {line.name, line.productName/product, plannedWhen, delay/when, destination}
At #6 make use of saves list of lines.


options = filter by type == stop; list of names of stops
stop = bus/tram/sbahn/ubahn station
line = name of auto (27, M17...)
ride = the specific 27 bus that arrives in 2 min and goes to xyz
