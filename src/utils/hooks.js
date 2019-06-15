import { useEffect, useState } from 'react'

const useMeetups = (url) => {
    const [meetups, setMeetups] = useState([])
    useEffect(() => {
        window
            .fetch(url)
            .then(response => response.json())
            .then(data => setMeetups(data))
    }, [])

    return meetups
}

export default useMeetups
