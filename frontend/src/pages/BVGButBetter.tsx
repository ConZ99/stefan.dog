import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Location {
    id: string;
    name: string;
}

interface Trip {
    tripId: string;
    line: {
        name: string;
        product: string;
    };
    direction: string;
    when: string;
    plannedWhen: string;
    delay: number;
    origin: {
        id: string;
        name: string;
    };
}

interface LocationResponse {
    locations: Location[];
}

interface TripsResponse {
    stopID: string;
    trips: Record<string, Trip[]>;
}

const BVGButBetter: React.FC = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [trips, setTrips] = useState<Record<string, Trip[][]>>({});
    const [countdown, setCountdown] = useState(60);

    /**
     * Groups trips first by product (e.g., bus, train) and then by origin ID.
     * If there are more than two groups per product, flattens into one.
     */
    const groupTrips = (trips: Trip[]): Record<string, Trip[][]> => {
        const productMap = new Map<string, Map<string, Trip[]>>();

        for (const trip of trips) {
            const product = trip.line.product.toLowerCase();
            const originId = trip.origin.id;

            if (!productMap.has(product)) {
                productMap.set(product, new Map());
            }

            const originMap = productMap.get(product)!;

            if (!originMap.has(originId)) {
                originMap.set(originId, []);
            }

            originMap.get(originId)!.push(trip);
        }

        const result: Record<string, Trip[][]> = {};

        productMap.forEach((originMap, product) => {
            const groups = Array.from(originMap.values());
            console.log('groups:', groups);
            result[product] = groups.length > 3 ? [groups.flat()] : groups;
        });

        return result;
    };

    /** Fetch trips for the selected location and sort by planned arrival time */
    const fetchTrips = async (locationId: string) => {
        try {
            const res = await axios.get<TripsResponse>(
                `/api/trips/${encodeURIComponent(locationId)}`
            );
            const allTrips = Object.values(res.data.trips).flat();
            console.log('allTrips:', Object.values(allTrips));
            const sortedTrips = allTrips.sort((a, b) => new Date(a.plannedWhen).getTime() - new Date(b.plannedWhen).getTime());
            setTrips(groupTrips(sortedTrips));
        } catch (error) {
            console.error("Failed to fetch trip data:", error);
        }
    };

    /** Handles the logic after a user selects a location */
    const handleOptionSelect = async (location: Location) => {
        setShowDropdown(false);
        setSelectedLocation(location);
        setQuery(location.name);
        await fetchTrips(location.id);
    };

    /** Countdown timer for auto-refresh */
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 60));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    /** Refetch trips when countdown hits zero */
    useEffect(() => {
        if (countdown === 0 && selectedLocation) {
            fetchTrips(selectedLocation.id);
        }
    }, [countdown, selectedLocation]);

    /** Fetch location suggestions based on user input */
    const fetchSuggestions = async (
        query: string,
        setSuggestions: React.Dispatch<React.SetStateAction<Location[]>>
    ): Promise<void> => {
        if (query.trim().length === 0) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await axios.get<LocationResponse>(
                `/api/locations/${encodeURIComponent(query)}`
            );
            setSuggestions(res.data.locations);
            console.log('Fetched locations:', res.data.locations);
        } catch (err) {
            console.error('Error fetching locations:', err);
            setSuggestions([]);
        }
    };

    /** Debounced input listener for search field */
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            fetchSuggestions(query, setSuggestions);
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [query]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
            <input
                type="text"
                placeholder="Search for a stop..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => setShowDropdown(false)}
                onFocus={() => setShowDropdown(true)}
                style={{ margin: '8px' }}
            />
            {showDropdown && (suggestions?.length ?? 0) > 0 && (
                <ul
                    className="dropdown"
                    style={{
                        width: 'fitContent',
                        top: '6rem',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        listStyle: 'none',
                        margin: '9px',
                        padding: 0,
                        maxHeight: '200px',
                        overflowY: 'auto',
                    }}
                >
                    {suggestions.map((stop, index) => (
                        <li
                            key={index}
                            onMouseDown={() => handleOptionSelect(stop)}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                width: '100%',
                                boxSizing: 'border-box',
                            }}
                        >
                            {stop.name}
                        </li>
                    ))}
                </ul>
            )}
            {Object.keys(trips).length > 0 && (
                <>
                    {Object.entries(trips).map(([product, groups]) => (
                        <div key={product} style={{ marginBottom: '24px' }}>
                            <h3 style={{ textTransform: 'capitalize' }}>{product}</h3>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                {groups.map((group, groupIndex) => {
                                    const showOrigin = groups.length <= 3
                                    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p style={{ fontStyle: 'italic', visibility: showOrigin ? 'visible' : 'hidden' }}>Originates from: {group[0].origin.name}</p>
                                        <table key={groupIndex} style={{ minWidth: '20%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Line</th>
                                                    <th>Direction</th>
                                                    <th>Arriving in</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-body">
                                                {group.map((trip, idx) => {
                                                    const minutesLeft = Math.ceil((new Date(trip.plannedWhen).getTime() - Date.now()) / 60000);
                                                    const getTextColor = (delay: number): React.CSSProperties => {
                                                        if (delay > 0) return { color: 'red', fontWeight: 'bold' };
                                                        if (delay < 0) return { color: 'limegreen', fontWeight: 'bold' };
                                                        return {};
                                                    };
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{trip.line?.name}</td>
                                                            <td className='direction'>{trip.direction}</td>
                                                            <td style={getTextColor(trip.delay)}>{minutesLeft < 1 ? 'Now' : minutesLeft}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                })}
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: '8px', fontStyle: 'italic' }}>Refreshing in {countdown} seconds...</div>
                </>
            )}
        </div >
    );
};

export default BVGButBetter;
