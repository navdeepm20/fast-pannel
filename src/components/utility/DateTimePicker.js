import { useState } from "preact/hooks";
//mui
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";

//libs
import dayjs from "dayjs";

function CustomDateTimePicker({ datetimestring, ...props }) {
  const [value, setValue] = useState(dayjs(datetimestring) || "");
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Date&Time picker"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
        ampm={false}
        {...props}
      />
    </LocalizationProvider>
  );
}

export default CustomDateTimePicker;
