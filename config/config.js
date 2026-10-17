const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    MONGODB_URI: process.env.MONGODB_URI ||"mongodb+srv://knightbenax_db_user:ex1V3nQnpWujYY76@comp229db.ruguvvo.mongodb.net/"||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
    };

module.exports = config;
   