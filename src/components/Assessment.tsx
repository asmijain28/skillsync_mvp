import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Brain, CheckCircle2 } from 'lucide-react';
import type { StudentProfile } from '../App';

type AssessmentProps = {
  profile: StudentProfile;
  onComplete: (results: any) => void;
};

const questions = [
  {
    id: 1,
    question: 'When solving a problem, I prefer to:',
    options: [
      { value: 'A', text: 'Use data and analytics to find solutions', trait: 'analytical' },
      { value: 'B', text: 'Brainstorm creative alternatives', trait: 'creative' },
      { value: 'C', text: 'Follow proven methodologies', trait: 'structured' },
      { value: 'D', text: 'Collaborate with others for ideas', trait: 'collaborative' },
    ],
  },
  {
    id: 2,
    question: 'In a team project, I naturally:',
    options: [
      { value: 'A', text: 'Take the lead and organize tasks', trait: 'leadership' },
      { value: 'B', text: 'Support others and ensure harmony', trait: 'supportive' },
      { value: 'C', text: 'Focus on technical execution', trait: 'technical' },
      { value: 'D', text: 'Generate innovative ideas', trait: 'innovative' },
    ],
  },
  {
    id: 3,
    question: 'I feel most energized when:',
    options: [
      { value: 'A', text: 'Working with cutting-edge technology', trait: 'technical' },
      { value: 'B', text: 'Designing user experiences', trait: 'design' },
      { value: 'C', text: 'Analyzing market trends', trait: 'business' },
      { value: 'D', text: 'Mentoring and teaching others', trait: 'mentoring' },
    ],
  },
  {
    id: 4,
    question: 'My ideal work environment is:',
    options: [
      { value: 'A', text: 'Fast-paced startup culture', trait: 'dynamic' },
      { value: 'B', text: 'Structured corporate setting', trait: 'structured' },
      { value: 'C', text: 'Remote and flexible', trait: 'flexible' },
      { value: 'D', text: 'Collaborative open office', trait: 'collaborative' },
    ],
  },
  {
    id: 5,
    question: 'I prefer projects that:',
    options: [
      { value: 'A', text: 'Have clear measurable outcomes', trait: 'analytical' },
      { value: 'B', text: 'Allow creative freedom', trait: 'creative' },
      { value: 'C', text: 'Involve building systems', trait: 'technical' },
      { value: 'D', text: 'Make social impact', trait: 'impact' },
    ],
  },
  {
    id: 6,
    question: 'What type of content do you enjoy most?',
    options: [
      { value: 'A', text: 'Research papers and academic journals', trait: 'research' },
      { value: 'B', text: 'Art, fashion, and design magazines', trait: 'artistic' },
      { value: 'C', text: 'Legal case studies and policy documents', trait: 'legal' },
      { value: 'D', text: 'Human behavior and psychology articles', trait: 'empathetic' },
    ],
  },
  {
    id: 7,
    question: 'Your approach to helping others is:',
    options: [
      { value: 'A', text: 'Provide practical solutions', trait: 'practical' },
      { value: 'B', text: 'Listen and understand emotions', trait: 'empathetic' },
      { value: 'C', text: 'Advocate for their rights', trait: 'advocate' },
      { value: 'D', text: 'Express through creative means', trait: 'artistic' },
    ],
  },
  {
    id: 8,
    question: 'What motivates you the most?',
    options: [
      { value: 'A', text: 'Creating beautiful, aesthetic work', trait: 'artistic' },
      { value: 'B', text: 'Fighting for justice and fairness', trait: 'advocate' },
      { value: 'C', text: 'Understanding human psychology', trait: 'empathetic' },
      { value: 'D', text: 'Discovering new knowledge', trait: 'research' },
    ],
  },
];

export function Assessment({ profile, onComplete }: AssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      processResults();
    }
  };

  const processResults = () => {
    // Analyze answers to determine personality type and career matches
    const traits: Record<string, number> = {};
    
    questions.forEach((q, index) => {
      const answer = answers[index];
      const option = q.options.find((opt) => opt.value === answer);
      if (option) {
        traits[option.trait] = (traits[option.trait] || 0) + 1;
      }
    });

    // Determine dominant traits
    const sortedTraits = Object.entries(traits).sort((a, b) => b[1] - a[1]);
    const dominantTrait = sortedTraits[0]?.[0] || 'balanced';

    // Map traits to personality types and career matches
    const personalityMap: Record<string, { type: string; careers: any[] }> = {
      analytical: {
        type: 'The Analyst',
        careers: [
          {
            role: 'Data Scientist',
            match: 95,
            description: 'Analyze complex datasets to drive business decisions',
            avgSalary: '₹10,00,000 - ₹25,00,000',
            growth: '+36% (2024-2034)',
          },
          {
            role: 'Business Analyst',
            match: 90,
            description: 'Bridge technology and business strategy',
            avgSalary: '₹6,00,000 - ₹15,00,000',
            growth: '+11% (2024-2034)',
          },
          {
            role: 'Financial Analyst',
            match: 85,
            description: 'Evaluate financial data and market trends',
            avgSalary: '₹5,50,000 - ₹12,00,000',
            growth: '+9% (2024-2034)',
          },
        ],
      },
      creative: {
        type: 'The Innovator',
        careers: [
          {
            role: 'UX Designer',
            match: 94,
            description: 'Create intuitive user experiences',
            avgSalary: '₹7,00,000 - ₹18,00,000',
            growth: '+16% (2024-2034)',
          },
          {
            role: 'Product Designer',
            match: 92,
            description: 'Design end-to-end product experiences',
            avgSalary: '₹8,00,000 - ₹20,00,000',
            growth: '+13% (2024-2034)',
          },
          {
            role: 'Creative Director',
            match: 88,
            description: 'Lead creative vision and strategy',
            avgSalary: '₹12,00,000 - ₹30,00,000',
            growth: '+10% (2024-2034)',
          },
        ],
      },
      technical: {
        type: 'The Builder',
        careers: [
          {
            role: 'Software Engineer',
            match: 96,
            description: 'Build scalable software systems',
            avgSalary: '₹8,00,000 - ₹22,00,000',
            growth: '+25% (2024-2034)',
          },
          {
            role: 'DevOps Engineer',
            match: 91,
            description: 'Automate and optimize infrastructure',
            avgSalary: '₹9,00,000 - ₹24,00,000',
            growth: '+27% (2024-2034)',
          },
          {
            role: 'Cloud Architect',
            match: 89,
            description: 'Design cloud infrastructure solutions',
            avgSalary: '₹15,00,000 - ₹35,00,000',
            growth: '+22% (2024-2034)',
          },
        ],
      },
      leadership: {
        type: 'The Leader',
        careers: [
          {
            role: 'Product Manager',
            match: 93,
            description: 'Drive product strategy and execution',
            avgSalary: '₹12,00,000 - ₹28,00,000',
            growth: '+14% (2024-2034)',
          },
          {
            role: 'Project Manager',
            match: 90,
            description: 'Lead cross-functional project teams',
            avgSalary: '₹8,00,000 - ₹18,00,000',
            growth: '+8% (2024-2034)',
          },
          {
            role: 'Engineering Manager',
            match: 87,
            description: 'Manage technical teams and deliverables',
            avgSalary: '₹18,00,000 - ₹40,00,000',
            growth: '+11% (2024-2034)',
          },
        ],
      },
      artistic: {
        type: 'The Creative Artist',
        careers: [
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
      },
      advocate: {
        type: 'The Advocate',
        careers: [
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
      },
      empathetic: {
        type: 'The Empathetic Helper',
        careers: [
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
      },
      research: {
        type: 'The Scholar',
        careers: [
          {
            role: 'Research Scientist',
            match: 94,
            description: 'Conduct research in academic or industrial settings',
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
            role: 'Social Researcher',
            match: 87,
            description: 'Study human behavior and social phenomena',
            avgSalary: '₹5,00,000 - ₹15,00,000',
            growth: '+12% (2024-2034)',
          },
        ],
      },
    };

    const results = personalityMap[dominantTrait] || personalityMap.analytical;

    setShowResults(true);
    setTimeout(() => {
      onComplete({
        personalityType: results.type,
        careerMatches: results.careers,
      });
    }, 3000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="mb-4">Assessment Complete!</CardTitle>
            <CardDescription>
              Analyzing your responses and matching you with ideal career paths...
            </CardDescription>
            <Progress value={100} className="mt-6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>Psychometric Assessment</CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {questions.length}
                </CardDescription>
              </div>
            </div>
          </div>
          <Progress value={progress} />
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-slate-900 mb-4">{question.question}</h3>
            <RadioGroup
              value={answers[currentQuestion] || ''}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between pt-4">
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className="ml-auto bg-gradient-to-r from-purple-600 to-pink-600"
            >
              {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}