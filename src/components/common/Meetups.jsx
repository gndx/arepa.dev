import React from 'react'
import useMeetups from '../../utils/hooks'
import Maps from './Maps'

const MEETUPS = `https://us-central1-meetuptracking.cloudfunctions.net/meetups`
const COMMUNITIES = `https://us-central1-meetuptracking.cloudfunctions.net/communities`
const VENUES = `https://us-central1-meetuptracking.cloudfunctions.net/venues`

const Meetups = () => {
    const meetups = useMeetups(MEETUPS)
    const communities = useMeetups(COMMUNITIES)
    const venues = useMeetups(VENUES)
    return meetups.length === 0 ? <h1>Cargando...</h1> : (
        <div className="App">
            <div className="Stats">
                <div className="Stats-content">
                    <div className="Stats-header">
                        <h2>Datos Generales 2019</h2>
                    </div>
                    <div className="General">
                        <div className="General-content">
                            <div className="General-card">
                                <span>Horas:</span>
                                <strong>
                                    {Math.ceil(parseInt(meetups.totalTime, 10))}
                                </strong>
                            </div>
                            <div className="General-card">
                                <span>Comunidades:</span>
                                <strong>{communities.length}</strong>
                            </div>
                            <div className="General-card">
                                <span>Eventos:</span>
                                <strong>{meetups.events}</strong>
                            </div>
                            <div className="General-card">
                                <span>Venues:</span>
                                <strong>{venues.length}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="EventTypes">
                        <h2>Tipos de Eventos:</h2>
                        <div className="EventTypes-content">
                            {meetups.eventTypes.map(type => (
                                <div className="EventTypes-card">
                                    <span>{type.value}</span>
                                    <strong>{type.count}</strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="Platforms">
                        <h2>Plataformas</h2>
                        <div className="Platforms-content">
                            {meetups.platforms.map(platform => (
                                <div className="Platforms-card">
                                    <span>{platform.value}</span>
                                    <strong>{platform.count}</strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="Quarter">
                        <h2>Eventos por trimestre</h2>
                        <div className="Quarter-content">
                            {meetups.quarter.map(q => (
                                q.count > 0 ? (
                                    <div className="Quarter-card">
                                        <span>{q.value}</span>
                                        <strong>{q.count}</strong>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>

                    <div className="Venues">
                        <h2>Principales Venues:</h2>
                        <div className="Venues-content">
                            {venues.map(venue => (
                                (venue.count > 3 ? (
                                    <div className="Venues-card">
                                        <span>{venue.venueName}</span>
                                        <strong>{venue.count}</strong>
                                    </div>
                                ) : null)
                            ))}
                        </div>
                    </div>

                    <div className="Venues">
                        {venues.length > 0 ?
                            <Maps venues={venues} /> :
                            null
                        }
                    </div>

                    <div className="Disclaimer">
                        <span>* Datos generados automaticamente.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Meetups
