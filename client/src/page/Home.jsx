import React, { useState } from 'react'
import moment from 'moment'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

function Home() {
  const [currentEvents, setCurrentEvents] = useState([])

  const handleDateClick = (selected) => {
    const title = prompt('Please enter a new title for your event')
    console.log(selected)
    const calendarApi = selected.view.calendar
    calendarApi.unselect()

    // this part makes the event that pass over
    // "eventsSet"
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      })
    }

    console.log('>>>>>>>>>>>>>>>>>>>>', calendarApi)
  }

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove()
    }
  }
  return (
    <div className='bg-gray-500 pt-3 flex '>
      <div className='w-1/5'>
        <h1 className='text-center text-lg'>Events</h1>
        <ul className='px-2'>
          {currentEvents.map((event) => (
            <li className='bg-blue-400 rounded m-1 text-center' key={event.id}>
              <span>{event.title}</span>
              <p>{console.log(typeof event.start)}</p>
              <p>{moment(event.start).format('YYYY-MM-DD')}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-4/5'>
        <FullCalendar
          height='75vh'
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventClick={handleEventClick}
          eventsSet={(events) => setCurrentEvents(events)}
          initialEvents={[
            {
              id: '12315',
              title: 'All-day event',
              date: '2022-09-14',
            },
            {
              id: '5123',
              title: 'Timed event',
              date: '2022-09-28',
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Home
