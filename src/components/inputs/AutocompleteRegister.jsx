import { Autocomplete, Box, TextField, Typography, createFilterOptions } from "@mui/material";
import { muiInputBorderErrorSx } from "./muiInputBorderErrorSx";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';

const filter = createFilterOptions();

function AutocompleteRegister( {form, fieldName, options, width, creatable, disabled} ) {

  const { setValue, clearErrors, formState: {errors} } = form;
  const [inputValue, setInputValue] = useState('');
  const optionsLength = useRef(0);

  const creatableParams = {
    filterOptions: (options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '' && !filtered.length) {
            filtered.push(params.inputValue);
        }
        return filtered;
    },
    forcePopupIcon: true,
    freeSolo: true,
  }

  useEffect(() => {
    if (options === undefined || (optionsLength.current !== 0 && optionsLength.current !== options.length)){
      setValue(fieldName, '');
      setInputValue('');
    }
    optionsLength.current = options ? options.length : 0;
  }, [options]);

  const onBlur = (e) => {
    if (!options) return;
    if (creatable) return;
    if (!options.includes(e.target.value)) {
      setInputValue('');
      setValue(fieldName, '');
    }
  };

  return (
    <Box>
      <Controller
        name={fieldName}
        control={form.control}
        render={({ field }) => {
          const { onChange, value, ...other } = field;
          return ( 
            <Autocomplete
              renderInput={(params) => ( <TextField {...params} {...other} onBlur={onBlur} /> )}
              {...form.register(fieldName, { required: 'Campo obrigatório' })}
              isOptionEqualToValue={(option, value) => option === value}
              disabled={(options && options.length ) ? disabled : true}
              onChange={(event, item) => { onChange(item) }}
              sx={{ 
                ...(errors[fieldName] ? muiInputBorderErrorSx : {}),
                width: width ? width : 300, 
              }}
              onInputChange={(event, newInputValue) => {
                setValue(fieldName, newInputValue);
                setInputValue(newInputValue);
                clearErrors(fieldName);
              }}
              {...(creatable && creatableParams)}
              inputValue={inputValue}
              disableClearable
              options={options || []}
              value={value || null}
              size="small"
              {...other}
            /> 
          )
        }}
      /> 
      {errors[fieldName] && <Typography color={"error"} fontSize={12}>{errors[fieldName].message}</Typography>}
    </Box>
  );
}
AutocompleteRegister.propTypes = {
  form: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  options: PropTypes.array,
  width: PropTypes.number,
  creatable: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default AutocompleteRegister;