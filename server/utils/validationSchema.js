const Joi = require('joi');
const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

const validateBase64Image = Joi.string()
  .pattern(/^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+$/)
  .custom((value, helpers) => {
    const base64String = value.split(',')[1];
    const byteSize = (base64String.length * 3) / 4 - (base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0);
    if (byteSize > MAX_IMAGE_SIZE) {
      return helpers.error("any.invalid");
    }
    return value;
  })
  .message("Image should not exceed 3 MiB.");

const schema = {
  createCourse: Joi.object({
    title: Joi.string().min(4).max(50).trim().required(),
    description: Joi.string().min(10).max(5000).trim().required(),
    images: Joi.array().items(validateBase64Image).min(1).max(3).required()
  }),
  
  enrollCourse: Joi.object({
    userEmail: Joi.string().email().trim().required(),
    courseId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
  })
};

module.exports = schema;
