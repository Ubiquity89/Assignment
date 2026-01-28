const mongoose = require('mongoose');
const Deal = require('./src/models/Deal');
require('dotenv').config();

const deals = [
  {
    title: "AWS Credits",
    description: "Get $1000 AWS credits for your startup",
    category: "Cloud",
    partnerName: "Amazon Web Services",
    isLocked: true,
    eligibilityText: "Must be less than 2 years old"
  },
  {
    title: "Notion Pro",
    description: "6 months free Notion Pro plan",
    category: "Productivity",
    partnerName: "Notion",
    isLocked: false,
    eligibilityText: "Available for all startups"
  },
  {
    title: "Stripe Atlas",
    description: "Free incorporation and banking setup",
    category: "Finance",
    partnerName: "Stripe",
    isLocked: true,
    eligibilityText: "Must be registered startup"
  },
  {
    title: "HubSpot Starter",
    description: "90% off HubSpot Starter CRM",
    category: "Marketing",
    partnerName: "HubSpot",
    isLocked: false,
    eligibilityText: "Available for all startups"
  },
  {
    title: "GitHub Team",
    description: "Free GitHub Team plan for 6 months",
    category: "Development",
    partnerName: "GitHub",
    isLocked: false,
    eligibilityText: "Must have public repository"
  },
  {
    title: "Slack Business",
    description: "85% off Slack Business plan",
    category: "Communication",
    partnerName: "Slack",
    isLocked: true,
    eligibilityText: "Must have 10+ team members"
  },
  {
    title: "Figma Pro",
    description: "Free Figma Pro for 1 year",
    category: "Design",
    partnerName: "Figma",
    isLocked: false,
    eligibilityText: "Available for all startups"
  },
  {
    title: "SendGrid Email",
    description: "100,000 free emails per month",
    category: "Email",
    partnerName: "SendGrid",
    isLocked: false,
    eligibilityText: "Must verify domain"
  },
  {
    title: "DigitalOcean Credits",
    description: "$200 free DigitalOcean credits",
    category: "Cloud",
    partnerName: "DigitalOcean",
    isLocked: true,
    eligibilityText: "Must be less than 1 year old"
  },
  {
    title: "Typeform Pro",
    description: "6 months free Typeform Pro plan",
    category: "Forms",
    partnerName: "Typeform",
    isLocked: false,
    eligibilityText: "Available for all startups"
  }
];

async function seedDeals() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing deals
    await Deal.deleteMany({});
    console.log('Cleared existing deals');

    // Add new deals
    const createdDeals = await Deal.insertMany(deals);
    console.log(`Created ${createdDeals.length} deals:`);
    
    createdDeals.forEach((deal, index) => {
      const lockStatus = deal.isLocked ? '🔒 LOCKED' : '🔓 UNLOCKED';
      console.log(`${index + 1}. ${deal.title} - ${lockStatus}`);
    });

    console.log('✅ Deals seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding deals:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDeals();
