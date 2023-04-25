import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function Calendar() {
  const localizer = momentLocalizer(moment);

  return (
    <div className="h-full">
      <BigCalendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        style={{ height: 500 }}
      />
    </div>
  );
}

export default Calendar;
