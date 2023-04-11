import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import "../assets/stylesheets/calendario.css";
import React, { useState, useRef } from "react";



export default function Calendario () {
  const calendarRef = useRef();
  const [startDate] = useState(new Date());

  return (
    <div className="calendario">
      <FullCalendar
      ref={calendarRef}


      headerToolbar={{
        center:"title",
        start:"today prev next",
        end: "dayGridMonth dayGridWeek dayGridDay",

      }}
      height={840}
      contentHeight= {780}
      aspectRatio={3}

      views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      plugins={[daygridPlugin]}

      locale={'es'}
      goToDate={startDate}
      />
    </div>
  );
};