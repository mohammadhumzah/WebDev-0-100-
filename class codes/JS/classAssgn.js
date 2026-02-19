// create a circle class

// class Circle {
//     constructor(radius, color){
//         this.radius = radius
//         this.color = color
//     }

//     // methods of this class
//     area() {
//          const area = (this.radius ** 2) * Math.PI
//          return area
//     }

//     paint() {
//         console.log(`Painting with color ${this.color}`)
//     }
// }


// const circle = new Circle(2, "red")

// const circleArea = circle.area()
// console.log(circleArea)


// create a base shape class and then extend properties to different shapes

class Shape {
  constructor(color) {
    this.color = color;
  }

  paint() {
    console.log(`Painting with color ${this.color}`);
  }

  area() {
    throw new Error("The area method must be implemented in the subclass");
  }

  getDescription() {
    return `A shape with color ${this.color}`;
  }
}


class Circle extends Shape {
    constructor(radius, color){
        super(color)
        this.radius = radius
    }

    area() {
        return (this.radius ** 2) * Math.PI
    }

    getDescription() {
        return `A shape with color ${this.color} and radius ${this.radius}`
    }
}

const circle = new Circle(2, "Blue")
console.log(circle.paint())