
//table for polymorphic relationship
module.exports=(sequelize,DataTypes) => {
    const Image = sequelize.define("image",{
        name  : DataTypes.STRING,
        url : DataTypes.STRING
    })
    return Image;
}
