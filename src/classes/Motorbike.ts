import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// The Motorbike class extends the Vehicle class
class Motorbike extends Vehicle {
  vin!: string;
  color!: string;
  make!: string;
  model!: string;
  year!: number;
  weight!: number;
  topSpeed!: number;
  wheels!: Wheel[];

  // Constructor that accepts the properties of the Motorbike class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    // Call the constructor of the parent class, Vehicle
    super();
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;

    // Initialize the properties of the Motorbike class
    this.topSpeed = topSpeed;

    // Ensure the wheels array contains exactly 2 Wheel objects
    if (!wheels || wheels.length !== 2) {
      this.wheels = [
        new Wheel(17, 'Default Front Tire'),
        new Wheel(17, 'Default Rear Tire'),
      ];
    } else {
      this.wheels = wheels;
    }
  }

  wheelie(): void {
    console.log(`Motorbike ${this.make}, ${this.model} is doing a wheelie!`);
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // Call the parent class printDetails method
    super.printDetails();

    // Log additional details for the Motorbike class
    console.log(`Top Speed: ${this.topSpeed} mph`);
    this.wheels.forEach((wheel, index) => {
      console.log(
        `Wheel ${index + 1}: ${wheel.getDiameter} inch with ${wheel.getTireBrand} tire`
      );
    });
  }
}

// Export the Motorbike class as the default export
export default Motorbike;

