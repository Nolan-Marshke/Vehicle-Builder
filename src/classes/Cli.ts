import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// Define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[]; // Updated to include Truck and Motorbike
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // Static method to generate a VIN
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // Method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") this.createCar();
        else if (answers.vehicleType === "Truck") this.createTruck();
        else if (answers.vehicleType === "Motorbike") this.createMotorbike();
      });
  }

  // Method to create a car
  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  // Method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "towingCapacity", message: "Enter Towing Capacity" },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  // Method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "frontWheelDiameter", message: "Enter Front Wheel Diameter" },
        { type: "input", name: "frontWheelBrand", message: "Enter Front Wheel Brand" },
        { type: "input", name: "rearWheelDiameter", message: "Enter Rear Wheel Diameter" },
        { type: "input", name: "rearWheelBrand", message: "Enter Rear Wheel Brand" },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
            new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand),
          ]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Tow vehicle (Truck only)",
            "Wheelie (Motorbike only)",
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find((v) => v.vin === this.selectedVehicleVin);

        if (!selectedVehicle) return;

        switch (answers.action) {
          case "Print details":
            selectedVehicle.printDetails();
            break;
          case "Start vehicle":
            selectedVehicle.start();
            break;
          case "Accelerate 5 MPH":
            selectedVehicle.accelerate(5);
            break;
          case "Decelerate 5 MPH":
            selectedVehicle.decelerate(5);
            break;
          case "Stop vehicle":
            selectedVehicle.stop();
            break;
          case "Turn right":
            selectedVehicle.turn("right");
            break;
          case "Turn left":
            selectedVehicle.turn("left");
            break;
          case "Reverse":
            selectedVehicle.reverse();
            break;
          case "Tow vehicle (Truck only)":
            if (selectedVehicle instanceof Truck) this.findVehicleToTow(selectedVehicle);
            break;
          case "Wheelie (Motorbike only)":
            if (selectedVehicle instanceof Motorbike) selectedVehicle.wheelie();
            break;
          case "Select or create another vehicle":
            this.startCli();
            return;
          case "Exit":
            this.exit = true;
            return;
        }

        if (!this.exit) this.performActions();
      });
  }

  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles
            .filter((v) => v.vin !== truck.vin)
            .map((v) => ({
              name: `${v.vin} -- ${v.make} ${v.model}`,
              value: v.vin,
            })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find((v) => v.vin === answers.vehicleToTow);

        if (!vehicleToTow) return;

        if (vehicleToTow.weight <= truck.towingCapacity) {
          console.log(`${truck.make} ${truck.model} is towing ${vehicleToTow.make} ${vehicleToTow.model}.`);
        } else {
          console.log(`${vehicleToTow.make} ${vehicleToTow.model} is too heavy to be towed by ${truck.make} ${truck.model}.`);
        }

        this.performActions();
      });
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message: "Would you like to create a new vehicle or perform an action on an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === "Create a new vehicle") this.createVehicle();
        else this.chooseVehicle();
      });
  }
}

export default Cli;
