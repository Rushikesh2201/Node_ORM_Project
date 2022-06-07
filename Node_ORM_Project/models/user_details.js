
module.exports = (sequelize,DataTypes) => {
    const Users = sequelize.define("user_details", {
        
        name : DataTypes.STRING,
        email : DataTypes.STRING,
        gender : DataTypes.STRING

    }, {
        //tableName : 'userdata'   ...if we want too change table name
        timeStamps : false,
        // updatedAt : false,
        // createdAT : false,
        //createdAt : 'created_at',
        //updatedAt : 'modified_at',
        //engine :'MYISAM' 
    })
    return Users;
}