import newSecret from './newSecret.js';

class SecretController {
  //   async create(req, res) {
  //     try {
  //       const { secret } = req.body;
  //       const secretBody = await newSecret.create({ secret });
  //       console.log(secretBody);
  //       res.json(`http://localhost:7000/api/getSecret/${secretBody._id}`);
  //       console.log(`WE GOT POST`);
  //     } catch (error) {
  //       res.status(500).json(error);
  //     }
  //   }

  async createReusable(req, res) {
    try {
      const { secret } = req.body;
      const secretBody = await newSecret.create({ secret });
      res.json(`http://localhost:7000/api/getSecret/${secretBody._id}`);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createDisposable(req, res) {
    try {
      const { secret } = req.body;
      const secretBody = await newSecret.create({ secret });
      res.json(
        `http://localhost:7000/api/getAndDeleteSecret/${secretBody._id}`
      );
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getSecret(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Нет такого секрета' });
      }
      const secret = await newSecret.findById(id);
      return res.json(secret.secret);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAndDeleteSecret(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Нет такого секрета' });
      }
      const secret = await newSecret.findByIdAndDelete(id);
      if (secret == null) {
        return res.json(`Теперь тут уже ничего нет...`);
      }
      return res.json(secret.secret);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new SecretController();
