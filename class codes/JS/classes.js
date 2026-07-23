class Person {

    constructor(fname,lname) {

        this.fname = fname
        this.lname = lname
    }
}

const p1 = new Person('Samreen', 'Sariya')
const p2 = new Person('Safa', 'Koul')

console.log(p1.fname)


class Animal {
    constructor(name) {
        this.name = name
    }
}

const a1 = new Animal('Humzah')

console.log(a1.name)
