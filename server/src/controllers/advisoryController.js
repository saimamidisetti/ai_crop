const supabase = require('../config/supabase');
const { getAdvisoryFromGemini } = require('../services/geminiService');
const { advisorySchema } = require('../schemas/advisorySchema');

const createAdvisory = async (req, res, next) => {
  try {
    const validatedData = advisorySchema.parse(req.body);
    const userId = req.user.id;

    // Call Gemini
    const aiResponse = await getAdvisoryFromGemini(validatedData);

    // Save to Supabase
    const { data: savedAdvisory, error } = await supabase
      .from('advisories')
      .insert([
        {
          user_id: userId,
          crop_name: validatedData.cropName,
          growth_stage: validatedData.growthStage,
          location: validatedData.location,
          problem_description: validatedData.problemDescription,
          additional_information: validatedData.additionalInformation,
          weather_condition: validatedData.weatherCondition,
          soil_type: validatedData.soilType,
          analysis: aiResponse.analysis,
          possible_causes: aiResponse.possibleCauses,
          recommended_actions: aiResponse.recommendedActions,
          prevention_tips: aiResponse.preventionTips,
          warning: aiResponse.warning
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return res.status(500).json({ error: 'Failed to save advisory' });
    }

    res.status(201).json(savedAdvisory);
  } catch (error) {
    next(error);
  }
};

const getAdvisories = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('advisories')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch advisories' });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAdvisoryById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('advisories')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Advisory not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteAdvisory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { error } = await supabase
      .from('advisories')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete advisory' });
    }

    res.status(200).json({ message: 'Advisory deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdvisory,
  getAdvisories,
  getAdvisoryById,
  deleteAdvisory
};
