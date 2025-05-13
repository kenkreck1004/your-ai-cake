# 🎂 AI Cake NFT DApp

**AI Cake NFT** is a fun and personalized decentralized application (DApp) where users answer a few personality-based questions. Our AI then generates a unique cake image and description based on the responses. Users can choose to mint their cake as an NFT on the **SUI blockchain** for just **0.01 SUI**.

## ✨ Features

* 🧠 **Personality Quiz**: Answer questions to reveal your personality.
* 🖼️ **AI Cake Generator**: AI creates a cake image reflecting your traits.
* 📃 **Personalized Description**: Get a unique explanation based on your personality.
* 🖼️ **NFT Minting**: Mint your cake image as an NFT for 0.01 SUI.
* 🖼️ **Gallery View**: Browse all minted AI cake NFTs.

## 🛠️ Tech Stack

* **Frontend**: [Next.js 15](https://nextjs.org/), based on [SUI DApp Starter](https://sui-dapp-starter.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Package Manager**: npm
* **Blockchain**: [SUI Network](https://sui.io/)
* **AI Integration**: [ImageRouter](https://ir.myqa.cc/) and [Cerebras AI](https://cloud.cerebras.ai/)
* **Storage**: [Pinata IPFS](https://pinata.cloud/)

## 🚀 Getting Started

### Prerequisites

* Node.js ≥ 18
* npm
* SUI Wallet browser extension

### Installation

```bash
git clone https://github.com/kenkreck1004/your-ai-cake.git
cd your-ai-cake
npm install
```

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to use the DApp.

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CEREBRAS_KEY="your_cerebras_key"
NEXT_PUBLIC_IMAGEROUTER_KEY="your_image_router_key"
```

## 🧠 How It Works

1. **Answer**: User completes a short quiz.
2. **Generate**: AI generates a custom cake image + personality description.
3. **Preview**: User sees the result and can choose to mint.
4. **Mint**: Cake NFT is minted on SUI for 0.01 SUI.
5. **Explore**: View your NFT and others in the public gallery.

## 📆 Deployment

Deploy using platforms like:

* **Vercel**
* **Netlify**

Ensure environment variables are set in the deployment platform.

## 📜 License

This project is open-source under the MIT License.

---

> 🎉 Discover your personality, generate a sweet AI cake, and own it forever on the blockchain!
