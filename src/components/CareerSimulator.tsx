import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Gamepad2,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Trophy,
  Target,
  Zap,
  RotateCcw,
} from 'lucide-react';
import type { StudentProfile } from '../App';

type CareerSimulatorProps = {
  profile: StudentProfile;
};

type Scenario = {
  id: string;
  role: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  skills: string[];
  situation: string;
  options: Array<{
    id: string;
    text: string;
    outcome: string;
    score: number;
    isCorrect: boolean;
  }>;
};

type SimulationResult = {
  scenarioId: string;
  selectedOption: string;
  score: number;
  totalScore: number;
};

export function CareerSimulator({ profile }: CareerSimulatorProps) {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<SimulationResult[]>([]);

  const scenarios: Scenario[] = [
    {
      id: '1',
      role: 'Data Scientist',
      title: 'Model Performance Issue',
      description: 'Your machine learning model is underperforming in production',
      difficulty: 'medium',
      duration: '5 min',
      skills: ['Machine Learning', 'Problem Solving', 'Data Analysis'],
      situation:
        'You deployed a customer churn prediction model that performed well in testing (92% accuracy), but stakeholders report it\'s only 65% accurate in production. What\'s your first step?',
      options: [
        {
          id: 'a',
          text: 'Immediately retrain the model with more data',
          outcome:
            'While more data can help, you haven\'t identified the root cause. The model might be suffering from data drift or feature issues.',
          score: 40,
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Investigate data distribution differences between training and production',
          outcome:
            'Excellent! You identified data drift as a potential issue. This is the most systematic approach to diagnose the problem.',
          score: 100,
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Tune hyperparameters to improve performance',
          outcome:
            'Hyperparameter tuning won\'t help if there\'s a fundamental issue with data quality or distribution.',
          score: 30,
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Switch to a different algorithm',
          outcome:
            'Changing algorithms without understanding the problem could waste time and resources.',
          score: 20,
          isCorrect: false,
        },
      ],
    },
    {
      id: '2',
      role: 'Product Manager',
      title: 'Feature Prioritization',
      description: 'Conflicting stakeholder requests for your product roadmap',
      difficulty: 'hard',
      duration: '7 min',
      skills: ['Product Strategy', 'Communication', 'Decision Making'],
      situation:
        'Sales wants a feature to close a big deal, Engineering wants to fix technical debt, and Users are requesting improved UX. You have capacity for only one this quarter. What do you prioritize?',
      options: [
        {
          id: 'a',
          text: 'Prioritize the sales feature to generate revenue',
          outcome:
            'Short-term thinking. While revenue is important, ignoring technical debt and user needs can hurt long-term growth.',
          score: 50,
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Gather data on user impact, revenue potential, and technical risk, then decide',
          outcome:
            'Perfect! Data-driven decision making that balances all stakeholder needs is the mark of a great PM.',
          score: 100,
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Fix technical debt to prevent future problems',
          outcome:
            'While important, technical debt should be balanced with user and business needs.',
          score: 60,
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Improve UX based on user feedback',
          outcome:
            'User-centric thinking is good, but you need to consider all factors including business impact.',
          score: 65,
          isCorrect: false,
        },
      ],
    },
    {
      id: '3',
      role: 'UX Designer',
      title: 'Design Critique Challenge',
      description: 'Receiving conflicting feedback on your design',
      difficulty: 'medium',
      duration: '6 min',
      skills: ['UX Design', 'Communication', 'User Research'],
      situation:
        'Your CEO wants a flashy redesign with more colors and animations, but user testing shows users prefer the current minimal design. How do you handle this?',
      options: [
        {
          id: 'a',
          text: 'Follow the CEO\'s direction since they\'re the boss',
          outcome:
            'Ignoring user research to please leadership can lead to poor user experience and product failure.',
          score: 30,
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Present user research data and propose a compromise that addresses concerns',
          outcome:
            'Excellent! You\'re advocating for users while being diplomatic with stakeholders. This is ideal.',
          score: 100,
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Ignore the feedback and stick with your original design',
          outcome:
            'Being inflexible can damage relationships and limit collaboration.',
          score: 20,
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Create two versions and A/B test them',
          outcome:
            'A/B testing is good, but you should first try to align stakeholders with user research.',
          score: 70,
          isCorrect: false,
        },
      ],
    },
    {
      id: '4',
      role: 'Software Engineer',
      title: 'Production Bug Crisis',
      description: 'Critical bug affecting users in production',
      difficulty: 'hard',
      duration: '8 min',
      skills: ['Problem Solving', 'System Design', 'Communication'],
      situation:
        'A critical bug is causing payment failures for 20% of users. Your team lead is unavailable. What\'s your immediate action?',
      options: [
        {
          id: 'a',
          text: 'Quickly push a fix without testing to resolve it fast',
          outcome:
            'Rushing untested code to production could make things worse and affect more users.',
          score: 25,
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Roll back to the last stable version while investigating the root cause',
          outcome:
            'Perfect! Minimizing user impact while maintaining system stability shows excellent judgment.',
          score: 100,
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Wait for your team lead to return before taking action',
          outcome:
            'Delaying action during a critical issue shows lack of initiative and hurts users.',
          score: 15,
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Disable the payment feature entirely until fixed',
          outcome:
            'While safe, completely disabling payments might be too drastic when 80% of transactions work.',
          score: 60,
          isCorrect: false,
        },
      ],
    },
    {
      id: '5',
      role: 'Business Analyst',
      title: 'Data-Driven Decision',
      description: 'Stakeholders want different conclusions from the same data',
      difficulty: 'medium',
      duration: '6 min',
      skills: ['Data Analysis', 'Communication', 'Critical Thinking'],
      situation:
        'Your analysis shows declining user engagement, but marketing claims their campaigns are successful. How do you present your findings?',
      options: [
        {
          id: 'a',
          text: 'Present only the negative trends to emphasize the problem',
          outcome:
            'Cherry-picking data can undermine your credibility and create defensive stakeholders.',
          score: 40,
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Present complete analysis with both positive and negative trends, then recommend actions',
          outcome:
            'Excellent! Balanced, objective analysis with actionable recommendations builds trust.',
          score: 100,
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Adjust your analysis to support marketing\'s claims',
          outcome:
            'Manipulating data to please stakeholders destroys your credibility as an analyst.',
          score: 10,
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Let stakeholders interpret the data themselves',
          outcome:
            'As an analyst, providing interpretation and recommendations is part of your value.',
          score: 50,
          isCorrect: false,
        },
      ],
    },
  ];

  const scenario = scenarios.find((s) => s.id === activeScenario);
  const selectedOptionData = scenario?.options.find((o) => o.id === selectedOption);

  const handleSubmit = () => {
    if (scenario && selectedOptionData) {
      const result: SimulationResult = {
        scenarioId: scenario.id,
        selectedOption: selectedOption!,
        score: selectedOptionData.score,
        totalScore: 100,
      };
      setResults([...results, result]);
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowResult(false);
    setActiveScenario(null);
  };

  const averageScore =
    results.length > 0
      ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length)
      : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  if (activeScenario && scenario) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-900 mb-2">Career Simulator</h1>
            <p className="text-slate-600">Experience: {scenario.role}</p>
          </div>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Exit Simulation
          </Button>
        </div>

        <Card className="border-2 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className={getDifficultyColor(scenario.difficulty)}>
                {scenario.difficulty}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                {scenario.duration}
              </div>
            </div>
            <CardTitle>{scenario.title}</CardTitle>
            <CardDescription>{scenario.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-900">{scenario.situation}</p>
            </div>

            {!showResult ? (
              <>
                <div className="space-y-3">
                  <p className="text-slate-900">What would you do?</p>
                  {scenario.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedOption === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <p className="text-slate-900">{option.text}</p>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Submit Answer
                </Button>
              </>
            ) : (
              <>
                <div
                  className={`p-6 rounded-lg border-2 ${
                    selectedOptionData?.isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-orange-50 border-orange-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {selectedOptionData?.isCorrect ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    ) : (
                      <XCircle className="w-8 h-8 text-orange-600" />
                    )}
                    <div>
                      <p className="text-lg text-slate-900">
                        {selectedOptionData?.isCorrect
                          ? 'Excellent Choice!'
                          : 'Good Try!'}
                      </p>
                      <p className="text-sm text-slate-600">
                        Score: {selectedOptionData?.score}/100
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-slate-600 mb-2">Your choice:</p>
                    <p className="text-slate-900">{selectedOptionData?.text}</p>
                  </div>

                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">Outcome:</p>
                    <p className="text-slate-900">{selectedOptionData?.outcome}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleReset} className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Another Scenario
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Career Simulator</h1>
        <p className="text-slate-600">
          Experience real-world scenarios from different career roles
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Scenarios</p>
                <p className="text-2xl text-slate-900 mt-1">{scenarios.length}</p>
              </div>
              <Gamepad2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Completed</p>
                <p className="text-2xl text-slate-900 mt-1">{results.length}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Score</p>
                <p className="text-2xl text-slate-900 mt-1">{averageScore}%</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Best Score</p>
                <p className="text-2xl text-slate-900 mt-1">
                  {results.length > 0 ? Math.max(...results.map((r) => r.score)) : 0}%
                </p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenarios */}
      <div>
        <h2 className="text-slate-900 mb-4">Available Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scenario) => {
            const completed = results.find((r) => r.scenarioId === scenario.id);
            return (
              <Card
                key={scenario.id}
                className={completed ? 'border-green-200 bg-green-50/30' : ''}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-blue-600">{scenario.role}</Badge>
                    <div className="flex items-center gap-2">
                      {completed && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                      <Badge className={getDifficultyColor(scenario.difficulty)}>
                        {scenario.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{scenario.title}</CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {scenario.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {scenario.options.length} options
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {scenario.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {completed ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Your Score</span>
                          <span className="text-green-600">
                            {completed.score}/{completed.totalScore}
                          </span>
                        </div>
                        <Progress value={completed.score} />
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setActiveScenario(scenario.id)}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Try Again
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => setActiveScenario(scenario.id)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Simulation
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}