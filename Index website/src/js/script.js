// Define the UUIDs for your controller's service and characteristics
const CONTROLLER_SERVICE_UUID = '01:21:02:29:bc:26';
const BUTTON_PRESS_CHARACTERISTIC_UUID = 'button_press_characteristic_uuid';

let controllerDevice;

// Function to initialize the connection to the controller
function connectToController() {
  navigator.bluetooth
    .requestDevice({
      filters: [{ services: [CONTROLLER_SERVICE_UUID] }],
    })
    .then(device => {
      controllerDevice = device;
      return device.gatt.connect();
    })
    .then(server => {
      return server.getPrimaryService(CONTROLLER_SERVICE_UUID);
    })
    .then(service => {
      // Assuming you have a characteristic for button presses
      return service.getCharacteristic(BUTTON_PRESS_CHARACTERISTIC_UUID);
    })
    .then(characteristic => {
      // Set up event listener for button presses
      characteristic.addEventListener('characteristicvaluechanged', onButtonPress);
      return characteristic.startNotifications();
    })
    .catch(error => {
      console.error('Bluetooth connection error:', error);
    });
}

// Function to handle button press events
function onButtonPress(event) {
  const buttonValue = new Uint8Array(event.target.value.buffer)[0];
  console.log('Button Pressed:', buttonValue);
}

// Function to disconnect from the controller
function disconnectFromController() {
  if (controllerDevice) {
    controllerDevice.gatt.disconnect();
    controllerDevice = null;
  }
}

// Start the controller connection
connectToController();

// Optionally, set a timeout for testing purposes
setTimeout(() => {
  // Stop listening to button presses and disconnect
  if (controllerDevice) {
    controllerDevice.gatt.getPrimaryService(CONTROLLER_SERVICE_UUID)
      .then(service => {
        return service.getCharacteristic(BUTTON_PRESS_CHARACTERISTIC_UUID);
      })
      .then(characteristic => {
        characteristic.stopNotifications().then(() => {
          disconnectFromController();
        });
      })
      .catch(error => {
        console.error('Bluetooth disconnection error:', error);
      });
  }
}, 60000); // Disconnect after 60 seconds (adjust as needed)
