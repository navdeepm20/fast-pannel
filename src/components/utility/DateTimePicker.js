import { useState } from "preact/hooks";
//mui
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";

//libs
import dayjs from "dayjs";

function CustomDateTimePicker({ datestring, ...props }) {
  const [value, setValue] = useState(
    dayjs(datestring).format("YYYY-MM-DDTHH:mm:ss.SSS") || ""
  );
  const handleChange = (newValue) => {
    setValue(dayjs(newValue).format("YYYY-MM-DDTHH:mm:ss.SSS"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Date&Time picker"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
        ampm={false}
        inputFormat="YYYY-MM-DDTHH:mm:ss.SSS"
        {...props}
      />
    </LocalizationProvider>
  );
}

export default CustomDateTimePicker;
