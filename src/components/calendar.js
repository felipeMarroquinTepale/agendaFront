import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';




export default function CalendarSmall() {

  return (

    <LocalizationProvider  dateAdapter={AdapterDayjs} adapterLocale={"es"} >
      <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
        <DemoItem >
          <DateCalendar views={['day']}
            sx={{
              height:'20%', width:'80%', mt:2,
              "& .MuiPickersDay-root": {
                "&.Mui-selected": {
                  backgroundColor: "#0E9AB1",
                  "&.Mui-selected:hover": {
                    backgroundColor: "#0E9AB1",
                  },
                  "&.Mui-selected:focus": {
                    backgroundColor: "#0E9AB1",
                  }
                },
              },
            }}

          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}