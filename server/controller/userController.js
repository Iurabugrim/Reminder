const ApiError = require("../Error/ApiError");
const { User } = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return next(ApiError.badRequest("Не коректные данные"));
      }
      const candidate = await User.findOne({ where: { email: email } });
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с таким email уже зарегестрирован")
        );
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ name, email, password: hashPassword });
      const token = generateJwt(user.id, user.email, user.name);

      return res.cookie("token", token).json({ token });
    } catch (e) {
      return e;
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Не коректные данные"));
      }
      const user = await User.findOne({ where: { email: email } });
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!user || !checkPassword) {
        return next(ApiError.badRequest("Не верный логин или пароль"));
      }
      const token = generateJwt(user.id, user.email, user.name);

      return res.cookie("token", token).json({ token });
    } catch (e) {
      return e;
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.name);
    return res.cookie("token", token).json({ token });
  }
}

module.exports = new UserController();
