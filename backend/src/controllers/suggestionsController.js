import * as suggestionService from '../services/suggestionService.js';

export const getAllSuggestions = async (req, res) => {
  try {
    const suggestions = await suggestionService.getAllSuggestions();
    res.status(200).json({ success: true, data: suggestions });
  } catch (error) {
    next(error);
  }
};

export const createSuggestion = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const { id_usuario } = req.user;

    const suggestion = await suggestionService.createSuggestion({
      titulo,
      descripcion,
      id_usuario,
    });
    res.status(201).json({ success: true, data: suggestion });
  } catch (error) {
    next(error);
  }
};
