import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { SkillPathways } from './components/SkillPathways';
import { CourseRecommendations } from './components/CourseRecommendations';
import { PortfolioBuilder } from './components/PortfolioBuilder';
import { MentorshipMatching } from './components/MentorshipMatching';
import { CareerSimulator } from './components/CareerSimulator';
import { InstitutionalDashboard } from './components/InstitutionalDashboard';
import { Navigation } from './components/Navigation';

export type StudentProfile = {
  name: string;
  education: string;
  major: string;
  gpa: number;
  skills: string[];
  interests: string[];
  projects: Array<{ title: string; description: string }>;
  resumeText: string;
  careerField: string;
  assessmentComplete: boolean;
  personalityType?: string;
  careerMatches?: Array<{
    role: string;
    match: number;
    description: string;
    avgSalary: string;
    growth: string;
  }>;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    'onboarding' | 'dashboard' | 'skills' | 'courses' | 'portfolio' | 'mentorship' | 'simulator' | 'institutional'
  >('onboarding');
  
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [isInstitutionalView, setIsInstitutionalView] = useState(false);

  const handleProfileComplete = (profile: StudentProfile) => {
    setStudentProfile(profile);
    setCurrentPage('dashboard');
  };

  const handleAssessmentComplete = (results: any) => {
    if (studentProfile) {
      setStudentProfile({
        ...studentProfile,
        assessmentComplete: true,
        personalityType: results.personalityType,
        careerMatches: results.careerMatches,
      });
      setCurrentPage('dashboard');
    }
  };

  const toggleView = () => {
    setIsInstitutionalView(!isInstitutionalView);
    if (!isInstitutionalView) {
      setCurrentPage('institutional');
    } else {
      setCurrentPage('dashboard');
    }
  };

  if (isInstitutionalView && currentPage === 'institutional') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-slate-900">SkillSync - Institutional Dashboard</h1>
            <button
              onClick={toggleView}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Switch to Student View
            </button>
          </div>
          <InstitutionalDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {currentPage === 'onboarding' && (
        <Onboarding onComplete={handleProfileComplete} />
      )}

      {studentProfile && currentPage !== 'onboarding' && (
        <>
          <Navigation
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onToggleView={toggleView}
            studentName={studentProfile.name}
          />

          <div className="container mx-auto px-4 py-6">
            {currentPage === 'dashboard' && (
              <Dashboard profile={studentProfile} onNavigate={setCurrentPage} />
            )}
            {currentPage === 'skills' && (
              <SkillPathways profile={studentProfile} />
            )}
            {currentPage === 'courses' && (
              <CourseRecommendations profile={studentProfile} />
            )}
            {currentPage === 'portfolio' && (
              <PortfolioBuilder profile={studentProfile} />
            )}
            {currentPage === 'mentorship' && (
              <MentorshipMatching profile={studentProfile} />
            )}
            {currentPage === 'simulator' && (
              <CareerSimulator profile={studentProfile} />
            )}
          </div>
        </>
      )}
    </div>
  );
}