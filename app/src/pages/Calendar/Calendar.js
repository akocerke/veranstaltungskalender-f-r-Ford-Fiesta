import React, { useState, useEffect } from 'react'
import { Container, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/de'
import { getAllEvents, fetchImageUrl } from '../../api/events' // Importiere die API-Funktionen

// Setze die Standardzeitzone
moment.tz.setDefault('Europe/Berlin')
const localizer = momentLocalizer(moment)
moment.locale('de')

const CalendarPage = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEvents = await getAllEvents() // Alle Events abrufen

        const eventsWithImageUrls = await Promise.all(
          fetchedEvents.map(async (event) => {
            const originalDate = moment.tz(event.date, 'Europe/Berlin').toDate()

            const isAllDay = event.date.split(' ').length === 1

            let startDate
            let endDate

            if (isAllDay) {
              startDate = moment
                .tz(originalDate, 'Europe/Berlin')
                .startOf('day')
                .toDate()
              endDate = moment
                .tz(originalDate, 'Europe/Berlin')
                .endOf('day')
                .toDate()
            } else {
              startDate = originalDate
              endDate = new Date(originalDate.getTime() + 60 * 60 * 1000) // 1 Stunde nach Startzeit
            }

            // Hole die Bild-URL, indem du den Dateinamen verwendest
            const imageUrl = await fetchImageUrl(event.image) // event.image enthält den Dateinamen

            return {
              id: event.id,
              title: event.title,
              start: startDate,
              end: endDate,
              allDay: isAllDay,
              description: event.description,
              imageUrl, // Verwende die abgerufene URL hier
              comments: event.comments.map((c) => ({
                comment: c.comment,
                username: c.username || 'Unbekannt',
              })),
              ratings: event.ratings,
            }
          })
        )

        setEvents(eventsWithImageUrls) // Setze die Events mit den Bild-URLs
        setFilteredEvents(eventsWithImageUrls)
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredEvents(events)
    } else {
      setFilteredEvents(
        events.filter((event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
  }, [searchTerm, events])

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const handleClose = () => {
    setSelectedEvent(null)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="star">
        {index < rating ? '★' : '☆'}
      </span>
    ))
  }

  return (
    <Container className="mt-5 mb-5">
      <p className="headline">Kalender</p>
      <InputGroup className="mb-4">
        <FormControl
          placeholder="Nach Events suchen"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        allDayAccessor="allDay"
        onSelectEvent={handleEventClick}
        style={{ height: 600 }}
        views={['month', 'week', 'day']}
        culture="de"
        components={{
          event: ({ event }) => <span>{event.title}</span>,
        }}
      />

      {selectedEvent && (
        <Modal show={true} onHide={handleClose} className="bg-mordal">
          <Modal.Header closeButton>
            <Modal.Title className="text-color">
              {selectedEvent.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedEvent.imageUrl} // Verwende hier die Bild-URL
              alt={selectedEvent.title}
              className="img-fluid mb-2"
            />
            <p>
              <strong className="text-color">Datum:</strong>
              <br />
              <span className="span">
                {moment(selectedEvent.start).format('LL')}
              </span>
            </p>
            <p>
              <strong className="text-color">Beschreibung:</strong>
              <br />
              <span className="span">{selectedEvent.description}</span>
            </p>
            <p className="mb-1">
              <strong className="text-color">Kommentare:</strong>
            </p>
            <div>
              {selectedEvent.comments.length > 0 ? (
                selectedEvent.comments.map((c) => (
                  <p key={c.username} className="mb-1">
                    <span className="fw-bold">@{c.username}:</span> {c.comment}
                  </p>
                ))
              ) : (
                <p>Keine Kommentare vorhanden.</p>
              )}
            </div>
            <p className="mt-3">
              <strong className="text-color">Bewertungen:</strong>
            </p>
            <div className="mt-0">
              {selectedEvent.ratings.length > 0 ? (
                selectedEvent.ratings.map((r, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <span>{renderStars(r.rating)}</span>
                    <span className="ms-2">{r.rating}</span>
                  </div>
                ))
              ) : (
                <span>Keine Bewertungen vorhanden</span>
              )}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  )
}

export default CalendarPage
