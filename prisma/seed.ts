import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Clear existing data
  await prisma.successMetric.deleteMany({});
  await prisma.product.deleteMany({});

  // Create success metrics
  const metrics = await prisma.successMetric.createMany({
    data: [
      {
        metricName: "ROI",
        metricValue: "800-1500%",
        displayOrder: 1,
      },
      {
        metricName: "Time Savings",
        metricValue: "20-40%",
        displayOrder: 2,
      },
      {
        metricName: "Production-Ready Tools",
        metricValue: "7",
        displayOrder: 3,
      },
      {
        metricName: "Industry Experience",
        metricValue: "30+ years",
        displayOrder: 4,
      },
    ],
  });

  console.log(`Created ${metrics.count} success metrics`);

  // Create sample tools/products
  const tools = await prisma.product.createMany({
    data: [
      {
        name: "Script Analysis Pro",
        description: `Comprehensive script breakdown and analysis tool for production planning.

- Automated character, location, and prop identification
- Scene complexity scoring and scheduling optimization
- Budget impact analysis for script elements
- Export to industry-standard formats (Movie Magic, StudioBinder)`,
        price: 299.99,
        type: "skill",
      },
      {
        name: "Rights & Clearance Assistant Pro",
        description: `Streamline your rights clearance and legal due diligence process.

- Automated identification of clearance requirements (music, locations, brands)
- Rights tracking and expiration management
- Fair use analysis and risk assessment
- Generate clearance reports and documentation`,
        price: 399.99,
        type: "skill",
      },
      {
        name: "Budget Forecasting Pro",
        description: `AI-powered budget analysis and forecasting for production planning.

- Predictive cost modeling based on script elements
- Historical data analysis and trend identification
- Variance tracking and reporting
- Integration with accounting systems`,
        price: 499.99,
        type: "skill",
      },
      {
        name: "Call Sheet Generator",
        description: `Create professional call sheets in minutes, not hours.

- Auto-populate from script breakdowns and schedules
- Crew and cast contact management
- Weather forecasts and location details integration
- Distribution via email and mobile-friendly formats`,
        price: 199.99,
        type: "skill",
      },
      {
        name: "Production Report Automator",
        description: `Generate comprehensive production reports with minimal manual input.

- Daily progress tracking and variance reporting
- Automated crew time tracking
- Equipment and location usage logs
- Cloud sync and offline capability`,
        price: 249.99,
        type: "skill",
      },
      {
        name: "Location Scout Intelligence",
        description: `Smart location scouting and management powered by AI analysis.

- Automated location research based on script requirements
- Permit and insurance requirement identification
- Cost comparison and feasibility analysis
- Photo and video documentation management`,
        price: 349.99,
        type: "skill",
      },
      {
        name: "Crew Scheduler Pro",
        description: `Optimize crew scheduling and avoid costly conflicts.

- Availability tracking and conflict detection
- Union rules and regulations compliance
- Automated shift planning and break scheduling
- Real-time notifications and updates`,
        price: 279.99,
        type: "skill",
      },
    ],
  });

  console.log(`Created ${tools.count} sample tools/products`);
  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
