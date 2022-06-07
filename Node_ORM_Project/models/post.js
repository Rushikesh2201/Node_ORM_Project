//new post table for association

module.exports = (sequelize,DataTypes) => {
    const Posts = sequelize.define("post",{
        employer : DataTypes.STRING,
        designation : DataTypes.STRING,
        userId : DataTypes.INTEGER,
    },
    {   
        TimeStamps : false,
        updatedAt : false,
        createdAt : false,
    })
    return Posts;
}
