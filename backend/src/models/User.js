const bcrypt = require('bcrypt');

const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
  }
}

User.authenticate = async function(username, password) {

  const user = await User.findOne({ where: { username } });

  if (bcrypt.compareSync(password, user.password)) {
    return user.authorize();
  }

  throw new Error('invalid password');
}

User.prototype.authorize = async function () {
  const { AuthToken } = sequelize.models;
  const user = this

  const authToken = await AuthToken.generate(this.id);

  await user.addAuthToken(authToken);

  return { user, authToken }
};


User.prototype.logout = async function (token) {

  sequelize.models.AuthToken.destroy({ where: { token } });
};


module.exports = User;