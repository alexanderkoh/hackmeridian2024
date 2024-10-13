# Soropay: Seamless DeFi Payment Links with Passkeys

## Overview

Soropay is an innovative payment link solution that leverages passkeys to streamline the onboarding process for new users into the world of decentralized finance (DeFi). Our platform bridges the gap between traditional Web2 platforms and the emerging DeFi ecosystem, providing an intuitive user experience for professionals acquiring services and products online.

## Problem Statement

We are solving the challenge of onboarding new users, particularly those unfamiliar with cryptocurrency ("normies"), by providing a payment link solution that uses passkeys. This approach allows users to quickly and easily onboard into DeFi, making international payments and receipts more accessible.

## Key Features

1. **Service Provider Dashboard**
   - Connect Wallet functionality
   - Product/Service generation
   - Unique Payment Link creation

2. **Payment Link Template**
   - Passkey-based Sign Up / Sign In
   - Comprehensive payment information gathering

3. **Seamless Integration**
   - Easy integration with platforms like Webflow, Framer, and WordPress

## Technology Stack

- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS (for styling)
- PasskeyKit (for wallet management)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/soropay.git
   ```

2. Navigate to the project directory:
   ```
   cd soropay
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   PUBLIC_rpcUrl=https://soroban-testnet.stellar.org
   PUBLIC_networkPassphrase="Test SDF Network ; September 2015"
   PUBLIC_factoryContractId=CCD7M4VVKELWL2RO4XJOZOGBDF3ESFIKG2EAU4ETVNAKMRRKE6YIQU5E
   PUBLIC_nativeContractId=CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC
   PUBLIC_launchtubeUrl=https://testnet.launchtube.xyz
   PUBLIC_mercuryUrl=https://api.mercurydata.app
   ```

5. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Contains the main application code
  - `components/`: Reusable React components
  - `dashboard/`: Dashboard-related pages
  - `payment-link/`: Payment link generation and processing
  - `signup/`: User registration and wallet creation
- `public/`: Static assets
- `styles/`: Global styles and Tailwind CSS configuration

## Key Components

1. **Dashboard (`app/dashboard/page.tsx`)**: Main interface for service providers to manage products and generate payment links.

2. **My Products (`app/dashboard/my-products/page.tsx`)**: Allows service providers to view, add, and manage their products or services.

3. **Payment Link (`app/payment-link/[productId]/page.tsx`)**: Dynamic page for customers to complete payments using passkeys.

4. **Sign Up (`app/signup/page.tsx`)**: User registration page with options to sign up using passkeys or generate a new wallet.

5. **AddProduct (`app/components/AddProduct.tsx`)**: Component for adding new products or services.

## Dependencies

The project relies on several key dependencies:

- [PasskeyKit](https://github.com/kalepail/passkey-kit): TypeScript SDK for creating and managing Stellar smart wallets.
- Next.js: React framework for building the user interface.
- Tailwind CSS: Utility-first CSS framework for styling.

## Contributing

We welcome contributions to Soropay! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Support

For support, please open an issue in the GitHub repository or contact our support team at support@soropay.com.
