const mongoose = require('mongoose')

if(process.argv.length != 5 && process.argv.length != 3) {
    console.log("Please enter password, name, and number of contact")
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://aadilu555:${password}@test-cluster.dsqhr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=test-cluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Contact = mongoose.model('Contact', contactSchema)

if(process.argv.length == 5) {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4]
    })

    contact.save().then(result => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}
else {
    Contact.find({}).then(response => {
        response.forEach(contact => {
            console.log(contact)
        })
        mongoose.connection.close()
    })
}

