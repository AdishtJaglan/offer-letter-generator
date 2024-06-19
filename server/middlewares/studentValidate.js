import Joi from "joi";

const validateStudentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  dateOfJoining: Joi.date().required(),
  dateOfCompletion: Joi.date().required(),
  domain: Joi.string().required(),
});

const validateStudent = (req, res, next) => {
  const { error } = validateStudentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export default validateStudent;
