#include <Arduino.h>
#include <string.h>
#include "DHT.h"
#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>
 
#define DHTPIN D1
#define DHTTYPE DHT11
#define MQ2pin (A0)

WebSocketsClient webSocket;

unsigned long messageInterval = 1000;
bool connected = false;

// 0 temperature
// 1 gas
int mode = -1; 

DHT dht(DHTPIN, DHTTYPE);


void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_TEXT:
            if(!strcmp((char *)payload,"temperature")) 
            mode = 0;

            if(!strcmp((char *)payload,"gas")) 
            mode = 1;
            break; 
        case WStype_BIN:
            hexdump(payload, length);
            break;
    }
 
}
char char_array_user[255];
char char_array_pass[255];
char *data[]={char_array_user,char_array_pass};
char* serial_tochar(int choose_data) {
    while(Serial.available()==0) { }
    String str =Serial.readString();
    str.toCharArray(data[choose_data], str.length());
    return data[choose_data];
}

void connect_wifi() {
    char * username;
    Serial.println("Please enter the username: ");
    username = strtok(serial_tochar(0), " ");
    char * password;
    Serial.println("Please enter the password: ");
    password = strtok(serial_tochar(1), " ");
    WiFi.begin(username, password);

    uint8_t i = 0;
    while(WiFi.status() != WL_CONNECTED && i < 20) {
      Serial.print(".");
      delay(500);
      i++;
    }
}

void print_networks() {
    int networks_number = WiFi.scanNetworks();
    for(int i=0;i<networks_number;i++) 
    {
      Serial.print("ssid: ");
      Serial.print(WiFi.SSID(i));
      Serial.print(", strength: ");
      Serial.print(WiFi.RSSI(i));
      Serial.print("\n");
    }
}

void send_temperature() {
    int temp = dht.readTemperature();
    char tempc[5];
    itoa(temp, tempc,10);
    Serial.print(tempc);
    webSocket.sendTXT(tempc);
}

void send_gas() {
    int gas = analogRead(MQ2pin);
    char gasc[5];
    itoa(gas, gasc,10);
    Serial.print(gas);

    webSocket.sendTXT( gasc);
}

void setup() {
    Serial.begin(115200); 
    for(uint8_t t = 4; t > 0; t--) {
        Serial.printf("Pease wait for %d seconds\n", t);
        Serial.flush();
        delay(1000);
    }
    while(WiFi.status() !=  WL_CONNECTED )
    {
        print_networks();
        connect_wifi();
    }
    Serial.print("Local IP: "); Serial.println(WiFi.localIP());
    // server address, port and URL
    webSocket.begin("damp-spire-67518.herokuapp.com", 80, "/sensor","text");
 
    // event handler
    webSocket.onEvent(webSocketEvent);
}
  String list[] = {"STUDBME1","STUDBME2","STUDBME3","CMP-lab1","CMP_LAB1","Sbme-Staff","CUFE","bdawy","CIVil-2022"};
 String names[9];
 int strengths[9];
unsigned long lastUpdate = millis();

void loop() {
    webSocket.loop();
    if (lastUpdate+messageInterval<millis()){
      for(int i=0;i<9;i++)
    {
        names[i]="";
        strengths[i]=0;
    }
    int networks_number = WiFi.scanNetworks();
    for(int i=0;i<networks_number;i++) 
    {
      if (WiFi.SSID(i)==list[0])
      {
        names[0]=WiFi.SSID(i);
        int sum = 0;
        for(int j=0;j<10;j++)
        {
                    Serial.println(WiFi.RSSI(i));

          sum += WiFi.RSSI(i);
        }
        strengths[0] = sum / 10;
      }
      else if (WiFi.SSID(i)==list[1])
      {
        names[1]=WiFi.SSID(i);
                int sum = 0;
        for(int j=0;j<10;j++)
        {
                    Serial.println(WiFi.RSSI(i));

          sum += WiFi.RSSI(i);
        }
        strengths[1]=sum / 10;
      }    
      else if (WiFi.SSID(i)==list[2])
      {
        names[2]=WiFi.SSID(i);
                int sum = 0;
        for(int j=0;j<10;j++)
        {
                    Serial.println(WiFi.RSSI(i));

          sum += WiFi.RSSI(i);
        }
        strengths[2]=sum / 10;
      }  
      else if (WiFi.SSID(i)==list[3])
      {
        names[3]=WiFi.SSID(i);
                int sum = 0;
        for(int j=0;j<10;j++)
        {
                    Serial.println(WiFi.RSSI(i));

          sum += WiFi.RSSI(i);
        }
        strengths[3]=sum / 10;
      }
      else if (WiFi.SSID(i)==list[4])
      {
        names[4]=WiFi.SSID(i);
        strengths[4]=WiFi.RSSI(i);
        
                int sum = 0;
        for(int j=0;j<10;j++)
        {
                    Serial.println(WiFi.RSSI(i));

          sum += WiFi.RSSI(i);
        }
        strengths[4]=sum / 10;
      }
      else if (WiFi.SSID(i)==list[5])
      {
        names[5]=WiFi.SSID(i);
                int sum = 0;
        for(int j=0;j<10;j++)
        {
                    Serial.println(WiFi.RSSI(i));

          sum += WiFi.RSSI(i);
        }
        strengths[5]=sum / 10;
      }
      else if (WiFi.SSID(i)==list[6])
      {
        names[6]=WiFi.SSID(i);
                int sum = 0;
        for(int j=0;j<10;j++)
        {
                    Serial.println(WiFi.RSSI(i));

          sum += WiFi.RSSI(i);
        }
        strengths[6]=sum / 10;
      }
      else if (WiFi.SSID(i)==list[7])
      {
        names[7]=WiFi.SSID(i);
                int sum = 0;
        for(int j=0;j<10;j++)
        {
          Serial.println(WiFi.RSSI(i));
          sum += WiFi.RSSI(i);
        }
        strengths[7]=sum / 10;
      }
      else if (WiFi.SSID(i)==list[8])
      {
        names[8]=WiFi.SSID(i);
                int sum = 0;
        for(int j=0;j<10;j++)
        {
          Serial.println(WiFi.RSSI(i));
          sum += WiFi.RSSI(i);
        }
        strengths[8]=sum / 10;
      }
    }
    for(int i=0;i<9;i++)
    {
      if (names[i] != list[i])
      {
        names[i]=list[i];
        strengths[i]=-100;
        }
    }
    char str[200];
    //strcpy(str, "{");
    for(int i=0;i<9;i++)
    { 
    //strcat(str, "\"");
    //strcat(str, names[i].c_str()); 
    //strcat(str, "\"");
    //strcat(str, ":");
    strcat(str,String(strengths[i]).c_str());
    if(i<8)
    strcat(str, ",");
    }
    strcat(str, "\n");
    Serial.println(str);
    webSocket.sendTXT(str);
    delay(5000); 
        lastUpdate = millis();
    }
}
