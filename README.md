This is the back office of the Handmade Hub project

## Getting Started

First, install project dependencies by running on the command line from the project root directory:

```bash
npm install

```

Second, add project environment variables. You will need to create a .env file in the root directory, your variables will live in the .env files. Check the ".env.example" file to see all the required variables. You will need to get most of the environment variables from the third party services used. The followings are the third party services used:

# Clerk: for handling authentication. Create account, Check clerk documentation on how to use clerk and get clerk API keys

# Stripe: for handling payments. Create account, Check Stripe documentation on how to setup clerk and get API keys

# MongoDB: for database. Check MongoDB documentation on how to setup your database and get the database connection string

# Cloudinary: for file storage. Create cloudinary account and get your upload "cloud name"

You can ignore the STRIPE_WEBHOOK_SECRET variable as you can only create it after running the development server successfully.

third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Proceed to the nexts steps if server running successfully...

# More Information on Stripe

After creating a stripe account you will find your project environment variables in the developer section.
Stripe Webhook is used in this project. The localhost(development) webhook is used as the project is meant for localhost only. To make stripe webhook work on your computer, you need to install stripe CLI. On the homepage of your dashboard click developers > Webhooks > Test in a local environment.

The following step is how to use the stripe CLI on your computer. The instruction is only for Windows computer. Ensure your project is already running on localhost before proceeding to the following steps.

- In the same root directory where this ReadMe is located, there is a directory called "stripe_cli". Open your windows CLI and navigate to the "stripe_cli" directory. Run the below command

```bash
stripe login
```

It will prompt you to press enter and authenticate your stripe account on the browser. After athenticating go back to the command line and run the below command

```bash
stripe listen --forward-to localhost:3000/api/webhooks
```

If your project is not hosted on port 3000 change it to your port number. The commend will generate a webhook secret(long characters) starting with "whsec\_". Copy the secret and use it in .env file.

# You Need To Create Shipping Rate in Your Stripe Account

On the dashboard side left menu click product catalog. In the tabs that appear click shipping rates, click the create shipping rate button that appear. Check the docs to learn more.

# Stripe Test Card

4242 4242 4242 4242
05/24 CVC:123

# By default stripe is in development mode, so you will use the above test card details for payments
