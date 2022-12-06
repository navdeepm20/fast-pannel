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
    dayjs(datestring).format("YYYY-MM-DDThh:mm:ss") || ""
  );
  const handleChange = (newValue) => {
    setValue(dayjs(newValue).format("YYYY-MM-DDThh:mm"));
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
