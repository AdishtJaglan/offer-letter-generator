import Joi from "joi";

const validateAdminSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateAdmin = (req, res, next) => {
  const { error } = validateAdminSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

export default validateAdmin;
