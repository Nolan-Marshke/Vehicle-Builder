// Import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// The Truck class extends the Vehicle class and implements the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[] = [];
  towingCapacity: number;

  // Constructor that accepts the properties of the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    // Call the constructor of the parent class, Vehicle
    super();
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;

    // Initialize the Truck-specific properties
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;

    // Ensure the wheels array contains exactly 4 Wheel objects
    if (!wheels || wheels.length !== 4) {
      this.wheels = [
        new Wheel(18, 'Default Front Left Tire'),
        new Wheel(18, 'Default Front Right Tire'),
        new Wheel(18, 'Default Rear Left Tire'),
        new Wheel(18, 'Default Rear Right Tire'),
      ];
    } else {
      this.wheels = wheels;
    }
  }

  // Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    const { make, model, weight } = vehicle;
    if (!make || !model) {
      console.log('Invalid vehicle to tow.');
      return;
    }

    if (weight <= this.towingCapacity) {
      console.log(`${this.make} ${this.model} is towing ${make} ${model}.`);
    } else {
      console.log(`${make} ${model} is too heavy to be towed by ${this.make} ${this.model}.`);
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // Call the parent class printDetails method
    super.printDetails();
    // Log additional Truck-specific details
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
    this.wheels.forEach((wheel: Wheel, index: number) => {
      console.log(
        `Wheel ${index + 1}: ${wheel.getDiameter} inch with ${wheel.getTireBrand} tire`
      );
    });
  }
}

// Export the Truck class as the default export
export default Truck;

