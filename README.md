# DeliveryApp Front-End
The project encompasses the development of a mobile application focused on the purchase of products from gastronomic establishments. Developed in React Native with React Navigation, Axios, and visual libraries, the application provides a seamless and engaging user experience. Among its notable features are secure payment options through Mercado Pago and Stripe, covering transactions with international debit and credit cards. Product organization is facilitated through categories, allowing users to easily explore and select desired items.

The order tracking function seamlessly integrates with Google Maps, offering users a real-time view of the progress of their orders, from preparation to delivery. This feature not only enhances the transparency of the process but also contributes to a more satisfying user experience.

For administrative roles, the application provides advanced management tools, enabling efficient handling of orders and product categories. This facilitates the continuous adaptation and update of the catalog, as well as effective control of internal operations.

On the other hand, delivery personnel are provided with the convenience of viewing orders to be delivered, along with the route they need to follow and customer details for any delivery-related issues.

## Steps to follow to start the application

### First step
Download the project. Once opened, open the console and write:

```
npm install
```
### Second step
Create the **app.json** file in the root folder. Copy the content of the "app.example.json", and paste it, replacing the **googleMapsApiKey**. which is obtained by entering **https://console.cloud.google.com/apis/credentials** and generating it within your new project *(for this app it is necessary that you have the account activated, or at least the trial version)*

### Third step
Create a file **GoogleMapApiKey.tsx** inside the *src/Presentation/constants* folder. And as seen in the "ExampleGoogleMapApiKey.tsx", replace the value of the constant **GOOGLE_MAPS_API_KEY** with the key generated in the previous step.

### Fourth step
Create a file **stripeClientKey.tsx** inside the *src/Presentation/constants* folder. And as seen in the "ExampleStripeClientKey.tsx", replace the value of the constant **STRIPE_CLIENT_KEY** with the **public key** obtained at *https://dashboard.stripe.com/test/apikeys* (log in with your account). On this platform you can see the payments made through stripe.
