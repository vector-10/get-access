# getAccess - Web3 Event Ticketing Platform

A modern event ticketing platform built with Web3 technology, featuring Civic Auth integration, Solana blockchain payments, and NFT-based tickets.

## Features

### 🎫 **Complete Ticketing System**
- Event creation and management
- Multiple ticket types (General, VIP, Early-bird, Student)
- Real-time ticket sales tracking
- QR code generation for tickets

### 🔐 **Web3 Authentication**
- Civic Auth integration with embedded Solana wallets
- Seamless wallet creation for new users
- Identity verification and user management
- Role-based access (Organizers vs Attendees)

### ⛓️ **Blockchain Integration**
- Solana blockchain for payments
- NFT ticket minting with metadata
- Low transaction fees
- Non-custodial embedded wallets

### 👥 **User Roles**

**Organizers:**
- Create and manage events
- Track ticket sales and attendees
- Real-time dashboard metrics
- Attendee management

**Attendees:**
- Browse all events
- Purchase tickets with SOL
- Receive NFT tickets
- Manage ticket collection

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Civic Auth Web3 SDK
- **Blockchain**: Solana
- **Database**: MongoDB with Mongoose
- **UI Components**: Lucide React icons
- **Notifications**: Sonner toasts

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd getaccess
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Civic Auth Client ID and MongoDB connection string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## Key Features Demo

### Authentication Flow
- Users sign in with Google/email via Civic Auth
- Automatic Solana wallet creation for attendees
- Seamless Web2 to Web3 onboarding

### Event Management
- Organizers can create events with images and details
- Real-time metrics dashboard
- Attendee tracking and management

### Ticket Purchase Flow
1. Browse events or access via shareable links
2. Select ticket type and quantity
3. Pay with Solana (SOL) from embedded wallet
4. Receive NFT ticket with metadata
5. Automatic QR code generation

### NFT Tickets
- Each ticket is minted as a unique NFT
- Contains event metadata and attributes
- Stored securely on Solana blockchain
- Can be viewed in user's wallet

## Project Structure

```
/app
  /dashboard          # Organizer dashboard
  /events            # Public events listing
  /event/[id]        # Individual event pages
  /auth              # Authentication flow
  /api               # Backend API routes
/components          # Reusable UI components
/models             # Database schemas
/lib                # Utilities and configurations
```

## Database Models

- **User**: Civic DID, name, role (organizer/attendee)
- **Event**: Event details, location, timing, organizer
- **Ticket**: Ticket details, NFT metadata, payment info

## Web3 Integration

- **Civic Auth**: Handles authentication and wallet creation
- **Solana Integration**: Embedded wallets for seamless payments
- **NFT Minting**: Automatic ticket NFT creation with metadata
- **Smart Payments**: Low-fee transactions on Solana network

## Security Features

- Non-custodial embedded wallets
- Identity verification via Civic
- Secure payment processing
- Role-based access control

## Future Enhancements

- Real Solana transaction processing
- Advanced NFT marketplace features
- Multi-chain support
- Event streaming integration
- Advanced analytics dashboard

---

**Built with Passion using Next.js, Civic Auth, and Solana**