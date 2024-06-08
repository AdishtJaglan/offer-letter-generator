import Joi from "joi";

const validateStudentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  dateOfJoining: Joi.date().required(),
  dateOfCompletion: Joi.date().required(),
  paid: Joi.string().valid("paid", "unpaid").required(),
  domain: Joi.string().required(),
  refNo: Joi.string().required(),
});

const validateStudent = (req, res, next) => {
  const { error } = validateStudentSchema.valid(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

export default validateStudent;
