import { Typography } from "@mui/material";
import { muiInputBorderErrorSx } from "./muiInputBorderErrorSx";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import 'dayjs/locale/pt';

function DatePickerRegister( {form, fieldName, width, disabled} ) {

  const { setValue, clearErrors, formState: {errors} } = form;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
      <Controller
        name={fieldName}
        control={form.control}
        render={({ field }) => {
          const { onChange, ...other } = field;
          return ( 
            <DatePicker size="small" {...other}
              slotProps={{ textField: { size: 'small' } }}
              {...form.register(fieldName, { required: 'Campo obrigatório' })}
                onChange={(date) => {
                setValue(fieldName, date);
                clearErrors(fieldName);
              }}
              sx={{ 
                ...(errors[fieldName] ? muiInputBorderErrorSx : {}),
                width: width ? width : 300, 
              }}
              disabled={disabled ? disabled : false}
            />
 
          )
        }}
      /> 

      {errors[fieldName] && <Typography color={"error"} fontSize={12}>{errors[fieldName].message}</Typography>}
</LocalizationProvider>
  );
}
DatePickerRegister.propTypes = {
  form: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  width: PropTypes.number,
  disabled: PropTypes.bool,
};

export default DatePickerRegister;