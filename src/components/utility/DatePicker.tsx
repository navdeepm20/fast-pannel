import { useState } from "preact/hooks";
//mui
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
//libs
import dayjs from "dayjs";

function CustomDatePicker({ datestring }: { datestring: string }) {
  const [value, setValue] = useState<dayjs.Dayjs | "" | null>(
    dayjs(datestring) || ""
  );
  const handleChange = (newValue: dayjs.Dayjs | "" | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        // label="Date desktop"
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
