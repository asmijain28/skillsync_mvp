import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GraduationCap, Plus, X, FileText, Sparkles } from 'lucide-react';
import type { StudentProfile } from '../App';

type OnboardingProps = {
  onComplete: (profile: StudentProfile) => void;
};

// AI Career Matching Logic
function analyzeCareerField(major: string, skills: string[], interests: string[], resumeText: string): {
  careerField: string;
  personalityType: string;
  careerMatches: Array<{
    role: string;
    match: number;
    description: string;
    avgSalary: string;
    growth: string;
  }>;
} {
  const lowerMajor = major.toLowerCase();
  const lowerResume = resumeText.toLowerCase();
  const allText = `${lowerMajor} ${skills.join(' ').toLowerCase()} ${interests.join(' ').toLowerCase()} ${lowerResume}`;

  // Define career categories and their keywords
  const careerCategories = {
    technology: {
      keywords: ['computer', 'software', 'programming', 'coding', 'tech', 'it', 'development', 'web', 'app', 'data', 'ml', 'ai', 'python', 'java', 'javascript'],
      roles: [
        {
          role: 'Software Engineer',
          match: 95,
          description: 'Build scalable software systems and applications',
          avgSalary: '₹8,00,000 - ₹22,00,000',
          growth: '+25% (2024-2034)',
        },
        {
          role: 'Data Scientist',
          match: 92,
          description: 'Analyze complex datasets to drive business decisions',
          avgSalary: '₹10,00,000 - ₹25,00,000',
          growth: '+36% (2024-2034)',
        },
        {
          role: 'Full Stack Developer',
          match: 90,
          description: 'Develop both frontend and backend applications',
          avgSalary: '₹7,00,000 - ₹20,00,000',
          growth: '+22% (2024-2034)',
        },
      ],
      personalityType: 'The Tech Innovator',
    },
    design: {
      keywords: ['design', 'ux', 'ui', 'creative', 'visual', 'graphic', 'figma', 'sketch', 'adobe', 'user experience', 'interface'],
      roles: [
        {
          role: 'UX Designer',
          match: 96,
          description: 'Create intuitive user experiences for digital products',
          avgSalary: '₹7,00,000 - ₹18,00,000',
          growth: '+16% (2024-2034)',
        },
        {
          role: 'Product Designer',
          match: 93,
          description: 'Design end-to-end product experiences',
          avgSalary: '₹8,00,000 - ₹20,00,000',
          growth: '+13% (2024-2034)',
        },
        {
          role: 'UI Developer',
          match: 88,
          description: 'Build beautiful and responsive user interfaces',
          avgSalary: '₹6,00,000 - ₹15,00,000',
          growth: '+18% (2024-2034)',
        },
      ],
      personalityType: 'The Creative Designer',
    },
    fashion: {
      keywords: ['fashion', 'textile', 'apparel', 'clothing', 'styling', 'garment', 'fabric', 'trend', 'boutique', 'retail fashion'],
      roles: [
        {
          role: 'Fashion Designer',
          match: 96,
          description: 'Design clothing, accessories, and fashion collections',
          avgSalary: '₹4,00,000 - ₹15,00,000',
          growth: '+18% (2024-2034)',
        },
        {
          role: 'Textile Designer',
          match: 92,
          description: 'Create patterns and designs for fabrics',
          avgSalary: '₹3,50,000 - ₹10,00,000',
          growth: '+12% (2024-2034)',
        },
        {
          role: 'Fashion Stylist',
          match: 88,
          description: 'Curate looks for clients, photoshoots, and events',
          avgSalary: '₹3,00,000 - ₹12,00,000',
          growth: '+15% (2024-2034)',
        },
      ],
      personalityType: 'The Fashion Visionary',
    },
    law: {
      keywords: ['law', 'legal', 'advocate', 'attorney', 'litigation', 'corporate law', 'policy', 'constitution', 'judiciary', 'court'],
      roles: [
        {
          role: 'Corporate Lawyer',
          match: 95,
          description: 'Advise on business law, mergers, and compliance',
          avgSalary: '₹8,00,000 - ₹30,00,000',
          growth: '+10% (2024-2034)',
        },
        {
          role: 'Criminal Lawyer',
          match: 90,
          description: 'Defend or prosecute in criminal cases',
          avgSalary: '₹5,00,000 - ₹25,00,000',
          growth: '+8% (2024-2034)',
        },
        {
          role: 'Public Policy Analyst',
          match: 87,
          description: 'Research and develop policy recommendations',
          avgSalary: '₹6,00,000 - ₹18,00,000',
          growth: '+12% (2024-2034)',
        },
      ],
      personalityType: 'The Legal Advocate',
    },
    psychology: {
      keywords: ['psychology', 'counseling', 'therapy', 'mental health', 'clinical', 'behavioral', 'cognitive', 'psychologist'],
      roles: [
        {
          role: 'Clinical Psychologist',
          match: 96,
          description: 'Provide therapy and mental health support',
          avgSalary: '₹5,00,000 - ₹15,00,000',
          growth: '+20% (2024-2034)',
        },
        {
          role: 'Counseling Psychologist',
          match: 93,
          description: 'Help individuals cope with life challenges',
          avgSalary: '₹4,00,000 - ₹12,00,000',
          growth: '+18% (2024-2034)',
        },
        {
          role: 'Organizational Psychologist',
          match: 88,
          description: 'Improve workplace culture and employee well-being',
          avgSalary: '₹6,00,000 - ₹18,00,000',
          growth: '+14% (2024-2034)',
        },
      ],
      personalityType: 'The Empathetic Healer',
    },
    humanities: {
      keywords: ['humanities', 'sociology', 'history', 'literature', 'philosophy', 'research', 'social science', 'anthropology', 'professor', 'teaching'],
      roles: [
        {
          role: 'Research Scholar',
          match: 94,
          description: 'Conduct research in social sciences and humanities',
          avgSalary: '₹6,00,000 - ₹20,00,000',
          growth: '+15% (2024-2034)',
        },
        {
          role: 'University Professor',
          match: 91,
          description: 'Teach and conduct research in higher education',
          avgSalary: '₹8,00,000 - ₹25,00,000',
          growth: '+10% (2024-2034)',
        },
        {
          role: 'Content Writer',
          match: 87,
          description: 'Create compelling content for various media',
          avgSalary: '₹4,00,000 - ₹12,00,000',
          growth: '+12% (2024-2034)',
        },
      ],
      personalityType: 'The Scholarly Thinker',
    },
    business: {
      keywords: ['business', 'management', 'mba', 'marketing', 'finance', 'commerce', 'consulting', 'entrepreneur', 'sales', 'strategy'],
      roles: [
        {
          role: 'Product Manager',
          match: 93,
          description: 'Drive product strategy and execution',
          avgSalary: '₹12,00,000 - ₹28,00,000',
          growth: '+14% (2024-2034)',
        },
        {
          role: 'Business Analyst',
          match: 90,
          description: 'Bridge technology and business strategy',
          avgSalary: '₹6,00,000 - ₹15,00,000',
          growth: '+11% (2024-2034)',
        },
        {
          role: 'Marketing Manager',
          match: 87,
          description: 'Develop and execute marketing strategies',
          avgSalary: '₹7,00,000 - ₹18,00,000',
          growth: '+10% (2024-2034)',
        },
      ],
      personalityType: 'The Business Strategist',
    },
    arts: {
      keywords: ['art', 'fine arts', 'painting', 'sculpture', 'illustration', 'animation', 'media', 'film', 'photography', 'creative arts'],
      roles: [
        {
          role: 'Graphic Designer',
          match: 95,
          description: 'Create visual content for brands and media',
          avgSalary: '₹4,00,000 - ₹12,00,000',
          growth: '+13% (2024-2034)',
        },
        {
          role: '3D Artist',
          match: 90,
          description: 'Create 3D models and animations',
          avgSalary: '₹5,00,000 - ₹15,00,000',
          growth: '+16% (2024-2034)',
        },
        {
          role: 'Art Director',
          match: 88,
          description: 'Lead creative vision for projects',
          avgSalary: '₹8,00,000 - ₹20,00,000',
          growth: '+11% (2024-2034)',
        },
      ],
      personalityType: 'The Creative Artist',
    },
  };

  // Calculate match scores for each category
  let bestCategory = 'technology';
  let maxScore = 0;

  for (const [category, data] of Object.entries(careerCategories)) {
    let score = 0;
    for (const keyword of data.keywords) {
      if (allText.includes(keyword)) {
        score += 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  }

  const selectedCategory = careerCategories[bestCategory as keyof typeof careerCategories];

  return {
    careerField: bestCategory,
    personalityType: selectedCategory.personalityType,
    careerMatches: selectedCategory.roles,
  };
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    major: '',
    gpa: '',
    careerField: '',
    skills: [] as string[],
    interests: [] as string[],
    projects: [] as Array<{ title: string; description: string }>,
    resumeText: '',
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentInterest, setCurrentInterest] = useState('');
  const [currentProject, setCurrentProject] = useState({ title: '', description: '' });

  const careerFields = [
    'Technology/IT',
    'Fashion & Design',
    'Law',
    'Psychology',
    'Humanities & Social Sciences',
    'Business & Management',
    'Arts & Media',
    'Engineering',
    'Healthcare',
    'Other',
  ];

  const suggestedSkills = ['Python', 'JavaScript', 'Data Analysis', 'Machine Learning', 'UI/UX Design', 'Project Management', 'Communication', 'Leadership', 'Fashion Design', 'Legal Research', 'Counseling', 'Writing'];
  const suggestedInterests = ['Technology', 'Business', 'Design', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Research', 'Fashion', 'Law', 'Psychology', 'Arts'];

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setCurrentSkill('');
    }
  };

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData({ ...formData, interests: [...formData.interests, interest] });
      setCurrentInterest('');
    }
  };

  const addProject = () => {
    if (currentProject.title && currentProject.description) {
      setFormData({
        ...formData,
        projects: [...formData.projects, currentProject],
      });
      setCurrentProject({ title: '', description: '' });
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  const removeInterest = (interest: string) => {
    setFormData({ ...formData, interests: formData.interests.filter((i) => i !== interest) });
  };

  const removeProject = (index: number) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    // Analyze career field and generate recommendations
    const analysis = analyzeCareerField(
      formData.major,
      formData.skills,
      formData.interests,
      formData.resumeText
    );

    const profile: StudentProfile = {
      ...formData,
      gpa: parseFloat(formData.gpa) || 0,
      assessmentComplete: true,
      careerField: analysis.careerField,
      personalityType: analysis.personalityType,
      careerMatches: analysis.careerMatches,
    };
    onComplete(profile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle>Welcome to SkillSync</CardTitle>
          <CardDescription>
            AI-powered career recommendations based on your profile
          </CardDescription>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-12 rounded-full ${
                  s <= step ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="education">Current Education Level</Label>
                <Input
                  id="education"
                  placeholder="e.g., Bachelor's in Computer Science, BA in Psychology"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="major">Major/Field of Study</Label>
                <Input
                  id="major"
                  placeholder="e.g., Computer Science, Fashion Design, Law, Psychology"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="careerField">Preferred Career Field</Label>
                <Select
                  value={formData.careerField}
                  onValueChange={(value) => setFormData({ ...formData, careerField: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your career field" />
                  </SelectTrigger>
                  <SelectContent>
                    {careerFields.map((field) => (
                      <SelectItem key={field} value={field}>
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gpa">GPA/Percentage</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.01"
                  placeholder="3.5 or 85%"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <Label htmlFor="resume">Resume/CV Summary</Label>
                </div>
                <CardDescription className="mb-3">
                  Paste your resume content or summarize your experience, education, and achievements
                </CardDescription>
                <Textarea
                  id="resume"
                  placeholder="E.g., I am a fashion design student with experience in textile design and pattern making. I have worked on sustainable fashion projects and have skills in draping, sewing, and digital design tools like Adobe Illustrator..."
                  value={formData.resumeText}
                  onChange={(e) => setFormData({ ...formData, resumeText: e.target.value })}
                  rows={10}
                  className="resize-none"
                />
                <p className="text-sm text-slate-500 mt-2">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  Our AI will analyze this to provide personalized career recommendations
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Your Skills</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add a skill"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(currentSkill))}
                  />
                  <Button onClick={() => addSkill(currentSkill)} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {suggestedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => addSkill(skill)}
                    >
                      + {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} className="bg-blue-600">
                      {skill}
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Your Interests</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add an interest"
                    value={currentInterest}
                    onChange={(e) => setCurrentInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest(currentInterest))}
                  />
                  <Button onClick={() => addInterest(currentInterest)} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {suggestedInterests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-50"
                      onClick={() => addInterest(interest)}
                    >
                      + {interest}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.interests.map((interest) => (
                    <Badge key={interest} className="bg-purple-600">
                      {interest}
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => removeInterest(interest)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <Label>Projects & Achievements (Optional)</Label>
                <div className="space-y-3 mt-2">
                  <Input
                    placeholder="Project title"
                    value={currentProject.title}
                    onChange={(e) =>
                      setCurrentProject({ ...currentProject, title: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Brief description"
                    value={currentProject.description}
                    onChange={(e) =>
                      setCurrentProject({ ...currentProject, description: e.target.value })
                    }
                  />
                  <Button onClick={addProject} className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>
              </div>

              {formData.projects.length > 0 && (
                <div className="space-y-2">
                  {formData.projects.map((project, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-slate-900">{project.title}</p>
                            <p className="text-sm text-slate-600">{project.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeProject(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600"
                disabled={!formData.name || !formData.major}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Career Recommendations
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
