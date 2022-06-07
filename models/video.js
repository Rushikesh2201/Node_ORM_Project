//table for polymorphic relationship

module.exports = (sequelize,DataTypes) => {
    const Video = sequelize.define("video",{
        name : DataTypes.STRING,
        text : DataTypes.STRING
    })
    return Video;
}