const mongoose = require('mongoose');
let listar = true;

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
} else if (process.argv.length > 3 && process.argv.length < 5) {
    console.log('give name and number as arguments');
    process.exit(1);
} else if (process.argv.length > 5) {
    console.log('only password, name and number as arguments are allowed');
    process.exit(1);
} else if (process.argv.length === 5) {
    listar = false;
}

const password = process.argv[2];
const url = `mongodb+srv://dcardoh:${password}@nodejstdea-f8r7w.mongodb.net/fullstack_Helsinki_U?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

mongoose.connect(url, { useNewUrlParser: true });

if (listar) {
    Person.find({}).then(result => {
        console.log('Phonebook:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
} else {
    const name = process.argv[3];
    const number = process.argv[4];
    const newPerson = {
        name,
        number
    };
    const person = new Person(newPerson);

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    }).catch(error => {
        console.log('error', error);
        mongoose.connection.close();
    });
}
