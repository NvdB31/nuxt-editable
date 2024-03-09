import { string, date, number, boolean, object, mixed } from 'yup'

const defaultValidatorsForFieldTypes = {
  text: string(),
  'multiline-text': string(),
  email: string().email(),
  file: string(),
  image: string(),
  url: string().url(),
  phone: string().matches(/^[0-9]+$/, 'This field must be a valid phone number.'),
  number: number(),
  date: date(),
  datetime: date(),
  options: mixed(),
  switch: boolean(),
  'rich-text': string(),
}

/**
 * Get the Yup schema for the current collection
 * Applies the validators from defaultValidatorsForFieldTypes to create a Yup schema with default validators
 * Additionally, applies custom validators from the configuration, as defined in the validators property
 */
function applyValidators(validator, validators) {
  Object.keys(validators).forEach(key => {
    const value = validators[key];

    switch (key) {
      case 'required':
        if (value) validator = validator.required();
        break;
      case 'length':
        validator = validator.length(value);
        break;
      case 'lessThan':
        validator = validator.lessThan(value);
        break;
      case 'moreThan':
        validator = validator.moreThan(value);
        break;
      case 'positive':
        if (value) validator = validator.positive();
        break;
      case 'negative':
        if (value) validator = validator.negative();
        break;
      case 'min':
        validator = validator.min(value);
        break;
      case 'max':
        validator = validator.max(value);
        break;
      case 'matches':
        validator = validator.matches(value);
        break;
      case 'email':
        if (value) validator = string().email();
        break;
      case 'url':
        if (value) validator = string().url();
        break;
      case 'phone':
        if (value) validator = string().matches(/^[0-9]+$/);
        break;
      case 'datetime':
        if (value) validator = date();
        break;
      case 'date':
        if (value) validator = date();
        break;
      case 'lowercase':
        if (value) validator = validator.lowercase();
        break;
      case 'uppercase':
        if (value) validator = validator.uppercase();
        break;
    }
  });

  return validator;
}

export const getYupValidationSchema = (schema: any) => {
  const yupSchemaFields = {};

  Object.keys(schema).forEach(key => {
    const { type, ...validators } = schema[key];
    const baseValidator = defaultValidatorsForFieldTypes[type] || string(); // Fallback to string validator
    yupSchemaFields[key] = applyValidators(baseValidator, validators);
  });

  return object(yupSchemaFields)
}