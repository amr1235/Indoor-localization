# Indoor Localization & tracking
WiFi tracking module where a bracelet can be attached to an object and the user can localize and track the current location of the object in real time through either a mobile application or a website
## Prerequisites

1. [Node.js](https://nodejs.org/en/download/).
2. [ESP32](https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf).
3. [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## Getting Started
1. Install dependencies.
  - Open server folder
```sh
> npm install
```
2. Run server.

```sh
> npm start
```
3. Configure the esp to send the readings to your server from Embedded folder.

4. Configure the index.html file to receive from your server from Client folder.

5. Run index.html using Live Server
