import Joi from 'joi';
import { CONSTRAINT_TYPE } from '../../constants/enum.js';

export const BankingProductConstraint = Joi.object({
  constraintType: Joi.string().required().valid(
    CONSTRAINT_TYPE.MAX_BALANCE,
    CONSTRAINT_TYPE.MAX_LIMIT,
    CONSTRAINT_TYPE.MIN_BALANCE,
    CONSTRAINT_TYPE.MIN_LIMIT,
    CONSTRAINT_TYPE.OPENING_BALANCE,
  ),
  additionalValue: Joi
    .when('constraintType',
      {
        switch: [
          {
            is: CONSTRAINT_TYPE.MAX_BALANCE,
            then: Joi.string().required(), // TODO AmountStringRegex
          },
          {
            is: CONSTRAINT_TYPE.MAX_LIMIT,
            then: Joi.string().required(), // TODO AmountStringRegex
          },
          {
            is: CONSTRAINT_TYPE.MIN_BALANCE,
            then: Joi.string().required(), // TODO AmountStringRegex
          },
          {
            is: CONSTRAINT_TYPE.MIN_LIMIT,
            then: Joi.string().required(), // TODO AmountStringRegex
          },
          {
            is: CONSTRAINT_TYPE.OPENING_BALANCE,
            then: Joi.string().required(), // TODO AmountStringRegex
            otherwise: Joi.forbidden(),
          },
        ],
      }),
  additionalInfo: Joi.string().allow(null, ''),
  additionalInfoUri: Joi.string().uri().allow(null, ''),
});
