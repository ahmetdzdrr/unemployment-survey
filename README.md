# Unemployment Experience Survey

<div align="center">
  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  </p>
  <p>
    <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn/ui" /></a>
    <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
    <a href="https://appwrite.io/"><img src="https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white" alt="Appwrite" /></a>
  </p>
</div>

A comprehensive survey application designed to gather and analyze unemployment experiences in Turkey. This project aims to understand the challenges, patterns, and experiences of job seekers, particularly focusing on recent graduates and those who have never been employed.

## 📑 Table of Contents

- [Features](#-features)
- [Technologies](#️-technologies)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Appwrite Collection Structure](#-appwrite-collection-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

## 🌟 Features

- **Multi-step Survey Form**: A user-friendly, step-by-step survey interface
- **Real-time Validation**: Ensures complete and accurate data collection
- **Professional Data Collection**: Covers various aspects of unemployment:
  - Personal Information
  - Education Background
  - Job Search Process
  - Interview Experiences
  - Platform Preferences
  - Unemployment Challenges
  - Bootcamp/Course Experiences
- **Modern UI/UX**: Responsive design with smooth transitions and animations
- **Data Security**: Secure data storage using Appwrite backend
- **Anonymous Submissions**: No personal identification data collected

## 🛠️ Technologies

- **Frontend**:
  - Next.js 15
  - TypeScript
  - Tailwind CSS
  - Shadcn UI
  - Framer Motion

- **Backend**:
  - Appwrite
  - Next.js API Routes

- **Development Tools**:
  - ESLint
  - Prettier
  - Git

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Appwrite account and server

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/unemployment-survey.git
   cd unemployment-survey
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```env
   NEXT_PUBLIC_APPWRITE_URL=your_appwrite_url
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
   APPWRITE_API_KEY=your_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📊 Appwrite Collection Structure

The application requires the following collection structure in Appwrite:

- Personal Information (gender, graduationDate, department, gpa, location)
- Job Search Details (desiredPosition, expectedSalary, unemploymentDuration)
- Application Statistics (totalApplications, interviewCount, dailyApplicationCount)
- Satisfaction Ratings (multiple fields for various aspects)
- Preferences (cvPreference, workModelPreference, preferredPlatform)
- Challenges (unemploymentChallenges)
- Bootcamp Experience (bootcampBenefit, bootcampContent, bootcampJobGuarantee)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All survey participants
- The open-source community
- Contributors and supporters

## 📧 Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmetdizdar/)
