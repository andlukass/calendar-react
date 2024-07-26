import { muiInputBorderErrorSx } from './muiInputBorderErrorSx';
import { TextField, Typography } from '@mui/material';

import PropTypes from 'prop-types';


function TextInputRegister( {form, fieldName, width, optional, disabled} ) {

  const requirements = optional ? {} : { required: 'Campo obrigatório' };

  return (
    <>
      <TextField
        sx={{ 
          ...(form.formState.errors[fieldName] ? muiInputBorderErrorSx : {}),
          width: width ? width : 300, 
        }}
        {...form.register(fieldName, requirements)}
        disabled={disabled}
        size='small' />
      {form.formState.errors[fieldName] &&
      <Typography color={"error"} fontSize={12}>
        {form.formState.errors[fieldName].message}
      </Typography>}
    </>
  );
}
TextInputRegister.propTypes = {
  form: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]),
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default TextInputRegister;
