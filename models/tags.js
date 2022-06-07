//table for tags for many to many relationship


module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("tag",{
        name : DataTypes.STRING,
    })
    return Tags;
}
