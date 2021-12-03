import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { VscCalendar } from "@react-icons/all-files/vsc/VscCalendar";
import { VscRefresh } from "@react-icons/all-files/vsc/VscRefresh";
import { VscArrowRight } from "@react-icons/all-files/vsc/VscArrowRight";

const TimeInput = ({ value, onChange, disabled }) => {
  const [type, setType] = useState("date");
  const [localValue, setLocalValue] = useState(value || {});

  useEffect(() => {}, [localValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalValue({
      ...localValue,
      [type]: { ...localValue[type], [name]: value },
    });
    if(onChange) {
      onChange(localValue);
    }
  };

  const handleDateChange = (e) => {
    const input = new Date(e.target.value);
    const isoString = input.toISOString();
    setLocalValue({
      ...localValue,
      date: { inputDate: e.target.value, displayDate: isoString },
    });
    if(onChange) {
      onChange(localValue);
    }
  };

  const timeIntervalMenu = () => {
    return (
      <TextField
        select
        variant="outlined"
        size="small"
        defaultValue="seconds"
        style={{ justifySelf: "center", marginLeft: 2 }}
        onChange={handleChange}
        name="type"
        value={localValue[type]?.type || ""}
      >
        <MenuItem value="seconds">Seconds</MenuItem>
        <MenuItem value="minutes">Minutes</MenuItem>
        <MenuItem value="hours">Hours</MenuItem>
        <MenuItem value="days">Days</MenuItem>
        <MenuItem value="weeks">Weeks</MenuItem>
        <MenuItem value="months">Months</MenuItem>
      </TextField>
    );
  };

  const timeInputSelect = () => {
    if (type === "date") {
      return (
        <>
          <input
            type="datetime-local"
            onChange={handleDateChange}
            name="date"
            value={localValue?.date?.inputDate || ""}
            style={{
              height: '40.73px',
              borderRadius: '4px',
              border: '1px solid rgb(196, 196, 196)',
              fontSize: '16px',
              padding: '10px',
            }}
          />
        </>
      );
    } else if (type === "period" || type === "interval") {
      return (
        <>
          <TextField
            variant="outlined"
            type="number"
            size="small"
            label={`${type === "period" ? "After" : "Interval Every"}`}
            onChange={handleChange}
            name="amount"
            value={localValue[type]?.amount || ""}
            style={
              type === 'interval' ? {width: '150px'} : {width: '168px'}
      
            }
          />
          {timeIntervalMenu()}
        </>
      );
    } else {
      return "invalid selection";
    }
  };

  return (
    <div className="TimeInput" style={{ padding: "20px", width: '500px' }}>
      <div className="TimeInputSelect">
        <TextField
          select
          variant="outlined"
          size="small"
          value={type}
          defaultValue="date"
          style={{ justifySelf: "center", marginRight: 2 }}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="date">
            <VscCalendar style={{marginRight: 8}}/> Date
          </MenuItem>
          <MenuItem value="period">
            <VscArrowRight style={{marginRight: 8}}/> After
          </MenuItem>
          <MenuItem value="interval">
            <VscRefresh style={{marginRight: 8}}/> Interval
          </MenuItem>
        </TextField>
        {timeInputSelect()}
      </div>
      {/* <fieldset style={{
        width: '350px'
      }}>
        <legend>Time Settings</legend>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <VscCalendar /> {`${localValue?.date?.displayDate || ""}`}
          </li>
          <li>
            <VscArrowRight /> {`${localValue?.period?.amount || ""} ${localValue?.period?.type || ""}`}
          </li>
          <li>
            <VscRefresh /> {`${localValue?.interval?.amount || ""} ${localValue?.interval?.type || ""}`}
          </li>
        </ul>
      </fieldset> */}
    </div>
  );
};

export default TimeInput;
