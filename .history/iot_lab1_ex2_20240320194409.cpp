// Define the pins for LEDs and the variable resistor
#define LED1_PIN 2
#define LED2_PIN 3
#define LED3_PIN 4
#define POTENTIOMETER_PIN A0

// Define thresholds for slow, medium, and fast levels of the variable resistor
#define SLOW_THRESHOLD 300
#define MEDIUM_THRESHOLD 600

void setup()
{
    // Initialize serial communication for debugging
    Serial.begin(9600);

    // Set the LED pins as output
    pinMode(LED1_PIN, OUTPUT);
    pinMode(LED2_PIN, OUTPUT);
    pinMode(LED3_PIN, OUTPUT);
}

void loop()
{
    // Read the value of the variable resistor
    int potValue = analogRead(POTENTIOMETER_PIN);

    // Determine the speed based on the value of the variable resistor
    int delayTime;
    if (potValue < SLOW_THRESHOLD)
    {
        delayTime = 1000; // Slow speed
        Serial.println("Slow speed");
    }
    else if (potValue < MEDIUM_THRESHOLD)
    {
        delayTime = 500; // Medium speed
        Serial.println("Medium speed");
    }
    else
    {
        delayTime = 250; // Fast speed
        Serial.println("Fast speed");
    }

    // Sequentially light up the LEDs from left to right and vice versa
    for (int i = 0; i < 2; i++)
    {
        digitalWrite(LED1_PIN, HIGH);
        delay(delayTime);
        digitalWrite(LED1_PIN, LOW);

        digitalWrite(LED2_PIN, HIGH);
        delay(delayTime);
        digitalWrite(LED2_PIN, LOW);

        digitalWrite(LED3_PIN, HIGH);
        delay(delayTime);
        digitalWrite(LED3_PIN, LOW);

        digitalWrite(LED2_PIN, HIGH);
        delay(delayTime);
        digitalWrite(LED2_PIN, LOW);
    }
}