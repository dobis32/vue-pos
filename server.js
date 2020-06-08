const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const AddOnRouter = require('./src/routers/addons');
const TabsRouter = require('./src/routers/tabs');
const ItemsRouter = require('./src/routers/items');
// mongoose('mongodb+srv://dev:vander123@dev0-cccrm.gcp.mongodb.net/test?retryWrites=true&w=majority', {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false,
// 	useUnifiedTopology: true
// });

mongoose.connect('mongodb://127.0.0.1:27017/vue-pos', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/dist'));
app.use(AddOnRouter);
app.use(TabsRouter);
app.use(ItemsRouter);

app.get('*', async (req, res) => {
	res.sendFile(__dirname + '/dist/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App listening on ${PORT}`);
});
