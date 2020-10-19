const bodyParser = require('body-parser');
const multer = require('multer');
var cors = require('cors')
const app = require("express")();

app.use(cors())

let port = process.env.PORT || 3000;
const uploadImage = require('./config/uploadImage');

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        // no larger than 5mb.
        fileSize: 25 * 1024 * 1024,
    },
});

app.disable('x-powered-by')
app.use(multerMid.array('photos'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/uploads', async (req, res, next) => {
    try {
        var array = []
        for (let i = 0; i < req.files.length; i++) {
            const element = req.files[i];
            const imageUrl = await uploadImage(element)
            array.push(imageUrl)
        }
        res.send(array)
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, () => {
    console.log('Hello')
})