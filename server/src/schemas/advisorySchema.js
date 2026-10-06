const { z } = require('zod');

const advisorySchema = z.object({
  cropName: z.string().min(2).max(100),
  growthStage: z.string().min(2).max(50),
  location: z.string().min(2).max(150),
  problemDescription: z.string().min(10).max(2000),
  additionalInformation: z.string().max(2000).optional(),
  weatherCondition: z.string().optional(),
  soilType: z.string().optional(),
});

module.exports = { advisorySchema };
