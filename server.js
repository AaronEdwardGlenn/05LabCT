require('dotevn').config(); 
// process.env.MONGODB_URI now exists
require('/lib/utils/connect')(); 
const app = require('./lib/app.js'); 

app.listen(7890, () => {
    console.log('we listnin on 7890, app started');
});