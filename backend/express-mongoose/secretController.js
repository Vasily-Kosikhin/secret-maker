import Secret from './Secret.js';

class SecretController {
  async createSecret(req, res) {
    try {
      const { text, reusable } = req.body;
      const secret = await Secret.create({ text, reusable });
      res.json(`http://localhost:7000/api/secret/${secret._id}`);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  async getSecret(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Нет такого секрета' });
      }
      const secret = await Secret.findById(id);
      if (secret == null) {
        return res.json('Нет такого секрета');
      }
      if (secret.reusable) {
        return res.json(secret.text);
      } else if (secret.text) {
        await Secret.findByIdAndDelete(id);
        return res.json(secret.text);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

export default new SecretController();
