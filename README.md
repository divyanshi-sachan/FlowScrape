# FlowScrape

A powerful web scraping and automation platform that allows users to create, manage, and execute visual workflows for web scraping tasks. Built with Next.js, React Flow, and Puppeteer, FlowScrape provides an intuitive drag-and-drop interface for building complex scraping workflows.

## 🚀 Features

### Core Functionality
- **Visual Workflow Editor**: Create workflows using a drag-and-drop interface powered by React Flow
- **Workflow Execution**: Execute workflows with phase-based execution and real-time logging
- **Scheduled Workflows**: Schedule workflows using cron expressions for automated execution
- **Credential Management**: Securely store and manage API keys and credentials with encryption
- **Credit-Based Billing**: Pay-as-you-go credit system for workflow executions
- **Analytics Dashboard**: Track workflow executions, credit usage, and performance metrics
- **Real-time Logging**: Monitor workflow execution with detailed phase-by-phase logs

### Available Task Types
- **Browser Operations**: Launch browser, navigate URLs, scroll elements
- **Element Interaction**: Click elements, fill inputs, wait for elements
- **Data Extraction**: Extract text from elements, extract data with AI (Gemini)
- **Data Processing**: Convert HTML to code, read/add properties to JSON
- **Delivery**: Deliver results via webhooks

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **React Flow (XYFlow)** - Workflow editor visualization
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible component primitives
- **Monaco Editor** - Code editor integration
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js Server Actions** - Server-side logic
- **Prisma** - ORM for database management
- **SQLite** - Database (development)
- **Puppeteer** - Browser automation
- **Cheerio** - HTML parsing
- **Google Generative AI** - AI-powered data extraction

### Authentication & Security
- **Clerk** - Authentication and user management
- **Crypto** - Encryption for credentials (AES-256-CBC)

### Additional Libraries
- **date-fns** - Date manipulation
- **cron-parser** - Cron expression parsing
- **recharts** - Data visualization
- **sonner** - Toast notifications

## 📁 Project Structure

```
flowscrape/
├── actions/              # Server actions
│   ├── analytics/        # Analytics and statistics
│   ├── billing/          # Credit management
│   ├── credentials/      # Credential CRUD operations
│   └── workflows/        # Workflow CRUD and execution
├── app/                  # Next.js app directory
│   ├── (auth)/           # Authentication pages
│   ├── (dashboard)/      # Protected dashboard routes
│   │   ├── (home)/       # Analytics dashboard
│   │   ├── billing/      # Billing and credits
│   │   ├── credentials/  # Credential management
│   │   └── workflows/    # Workflow list
│   ├── workflow/         # Workflow editor and runs
│   └── setup/            # Initial setup
├── components/           # React components
│   ├── ui/               # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   └── providers/        # Context providers
├── lib/                  # Utility libraries
│   ├── workflow/         # Workflow execution engine
│   │   ├── executor/     # Task executors
│   │   └── task/         # Task definitions
│   ├── encryption.ts     # Encryption utilities
│   └── prisma.ts         # Prisma client
├── prisma/               # Database schema and migrations
├── schema/               # Zod validation schemas
└── types/                # TypeScript type definitions
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- SQLite (or configure another database)
- Clerk account for authentication
- Google Generative AI API key (for AI extraction features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flowscrape
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Encryption (generate a 32-byte hex key)
   ENCRYPTION_KEY=your_32_byte_hex_encryption_key

   # Optional: Google Generative AI (for AI extraction)
   # Used when credentials are stored
   ```

   To generate an encryption key:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Database

The project uses Prisma with SQLite by default. To use a different database:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql" // or "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update your `.env.local` with the appropriate connection string

3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

### Clerk Authentication

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key to `.env.local`
4. Configure sign-in/sign-up methods in the Clerk dashboard

## 📖 Usage

### Creating a Workflow

1. Navigate to the **Workflows** page
2. Click **Create Workflow**
3. Enter workflow name and description
4. You'll be redirected to the workflow editor

### Building a Workflow

1. **Add Nodes**: Drag and drop task nodes from the sidebar
2. **Connect Nodes**: Connect output handles to input handles to create data flow
3. **Configure Nodes**: Click on nodes to configure their parameters
4. **Validate**: The editor validates your workflow in real-time
5. **Save**: Your workflow is automatically saved

### Executing a Workflow

1. Click **Run** in the workflow editor
2. Monitor execution in the **Runs** tab
3. View detailed logs for each execution phase

### Scheduling Workflows

1. Open a workflow
2. Configure a cron expression in the schedule settings
3. The workflow will execute automatically based on the schedule

### Managing Credentials

1. Navigate to **Credentials**
2. Click **Create Credential**
3. Enter a name and value (e.g., API key)
4. Credentials are encrypted and can be used in workflows

### Monitoring Usage

- **Home Dashboard**: View execution statistics and credit usage
- **Billing Page**: Check available credits and purchase more
- **Workflow Runs**: View detailed execution history

## 🏗️ Architecture

### Workflow Execution Engine

The execution engine follows a phase-based approach:

1. **Execution Plan Generation**: Converts the visual workflow into an execution plan with phases
2. **Phase Execution**: Executes phases sequentially, with each phase containing nodes that can run in parallel
3. **Data Flow**: Outputs from one phase become inputs to dependent phases
4. **Error Handling**: Failed phases stop execution and log errors
5. **Credit Deduction**: Credits are deducted before each phase execution

### Task System

- **Task Registry**: Central registry of all available task types
- **Task Definitions**: Define inputs, outputs, and metadata for each task
- **Executors**: Implement the actual execution logic for each task type
- **Validation**: Ensures all required inputs are provided before execution

### Security

- **Encryption**: Credentials are encrypted using AES-256-CBC before storage
- **Authentication**: All routes (except auth pages) are protected by Clerk middleware
- **Authorization**: Users can only access their own workflows and data

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗄️ Database Schema

### Models

- **Workflow**: Stores workflow definitions, status, and scheduling info
- **WorkflowExecution**: Tracks individual workflow runs
- **ExecutionPhase**: Represents a phase in workflow execution
- **ExecutionLog**: Stores logs for each execution phase
- **UserBalance**: Tracks user credit balance
- **Credential**: Stores encrypted user credentials

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `ENCRYPTION_KEY` | 32-byte hex key for credential encryption | Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Database Issues
- Ensure SQLite file permissions are correct
- Run `npx prisma generate` after schema changes
- Check `DATABASE_URL` in `.env.local`

### Authentication Issues
- Verify Clerk keys are correct
- Check Clerk dashboard for application status
- Ensure middleware is properly configured

### Execution Failures
- Check browser installation (Puppeteer requires Chrome/Chromium)
- Verify sufficient credits in account
- Review execution logs for detailed error messages

### Encryption Errors
- Ensure `ENCRYPTION_KEY` is a valid 32-byte hex string
- Do not change encryption key after storing credentials (data will be lost)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Flow Documentation](https://reactflow.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Puppeteer Documentation](https://pptr.dev)

---

Built with ❤️ using Next.js and modern web technologies.
