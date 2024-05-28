import UserService from '../application/user.service.js';

const UserController = {
  async register(req, res) {
    try {
      const newUser = await UserService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedUser = await UserService.updateUser(userId, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deletedUser = await UserService.deleteUser(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default UserController;