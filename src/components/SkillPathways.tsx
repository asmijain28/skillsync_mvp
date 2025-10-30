import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  CheckCircle2,
  Circle,
  TrendingUp,
  Clock,
  Zap,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import type { StudentProfile } from '../App';

type SkillPathwaysProps = {
  profile: StudentProfile;
};

type Skill = {
  name: string;
  category: 'technical' | 'soft';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToLearn: string;
  demand: number;
  completed: boolean;
};

export function SkillPathways({ profile }: SkillPathwaysProps) {
  const topCareer = profile.careerMatches?.[0]?.role || 'Software Engineer';

  const [skills, setSkills] = useState<Skill[]>([
    {
      name: 'Python Programming',
      category: 'technical',
      difficulty: 'beginner',
      timeToLearn: '3-4 months',
      demand: 95,
      completed: profile.skills.includes('Python'),
    },
    {
      name: 'Data Structures & Algorithms',
      category: 'technical',
      difficulty: 'intermediate',
      timeToLearn: '4-6 months',
      demand: 92,
      completed: false,
    },
    {
      name: 'Machine Learning Fundamentals',
      category: 'technical',
      difficulty: 'intermediate',
      timeToLearn: '5-7 months',
      demand: 98,
      completed: profile.skills.includes('Machine Learning'),
    },
    {
      name: 'SQL & Database Management',
      category: 'technical',
      difficulty: 'beginner',
      timeToLearn: '2-3 months',
      demand: 88,
      completed: false,
    },
    {
      name: 'Cloud Computing (AWS/Azure)',
      category: 'technical',
      difficulty: 'advanced',
      timeToLearn: '6-8 months',
      demand: 94,
      completed: false,
    },
    {
      name: 'Data Visualization',
      category: 'technical',
      difficulty: 'intermediate',
      timeToLearn: '2-3 months',
      demand: 85,
      completed: profile.skills.includes('Data Analysis'),
    },
    {
      name: 'Communication Skills',
      category: 'soft',
      difficulty: 'beginner',
      timeToLearn: 'Ongoing',
      demand: 90,
      completed: profile.skills.includes('Communication'),
    },
    {
      name: 'Leadership & Team Management',
      category: 'soft',
      difficulty: 'intermediate',
      timeToLearn: 'Ongoing',
      demand: 87,
      completed: profile.skills.includes('Leadership'),
    },
    {
      name: 'Problem Solving',
      category: 'soft',
      difficulty: 'intermediate',
      timeToLearn: 'Ongoing',
      demand: 95,
      completed: false,
    },
    {
      name: 'Presentation & Public Speaking',
      category: 'soft',
      difficulty: 'intermediate',
      timeToLearn: 'Ongoing',
      demand: 82,
      completed: false,
    },
  ]);

  const toggleSkill = (skillName: string) => {
    setSkills(
      skills.map((s) =>
        s.name === skillName ? { ...s, completed: !s.completed } : s
      )
    );
  };

  const technicalSkills = skills.filter((s) => s.category === 'technical');
  const softSkills = skills.filter((s) => s.category === 'soft');

  const completedCount = skills.filter((s) => s.completed).length;
  const completionPercentage = (completedCount / skills.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const SkillCard = ({ skill }: { skill: Skill }) => (
    <Card className={skill.completed ? 'border-green-200 bg-green-50/30' : ''}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <button
              onClick={() => toggleSkill(skill.name)}
              className="mt-1"
            >
              {skill.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300" />
              )}
            </button>
            <div className="flex-1">
              <h3
                className={`text-slate-900 mb-2 ${
                  skill.completed ? 'line-through text-slate-500' : ''
                }`}
              >
                {skill.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={getDifficultyColor(skill.difficulty)}>
                  {skill.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Clock className="w-3 h-3" />
                  {skill.timeToLearn}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Market Demand</span>
                  <span className="text-slate-900">{skill.demand}%</span>
                </div>
                <Progress value={skill.demand} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Skill Development Pathways</h1>
        <p className="text-slate-600">
          Recommended skills for your journey to becoming a {topCareer}
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription>
                {completedCount} of {skills.length} recommended skills mastered
              </CardDescription>
            </div>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <span className="text-2xl text-blue-600">
                {Math.round(completionPercentage)}%
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-3" />
        </CardContent>
      </Card>

      {/* Skill Priority Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <CardTitle>Priority Skills to Learn Next</CardTitle>
          </div>
          <CardDescription>
            High-demand skills that will accelerate your career growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills
              .filter((s) => !s.completed && s.demand >= 90)
              .slice(0, 4)
              .map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="text-slate-900 mb-1">{skill.name}</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-sm text-green-600">
                        {skill.demand}% demand
                      </span>
                    </div>
                  </div>
                  <Button size="sm">
                    Start
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Categories */}
      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="technical">
            Technical Skills ({technicalSkills.length})
          </TabsTrigger>
          <TabsTrigger value="soft">
            Soft Skills ({softSkills.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicalSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="soft" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {softSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Learning Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>6-Month Learning Roadmap</CardTitle>
          <CardDescription>
            Structured pathway to master essential skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: 'Months 1-2', skills: ['Python Programming', 'SQL & Database Management'] },
              { month: 'Months 3-4', skills: ['Data Structures & Algorithms', 'Data Visualization'] },
              { month: 'Months 5-6', skills: ['Machine Learning Fundamentals', 'Communication Skills'] },
            ].map((phase, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  {index < 2 && <div className="w-0.5 h-16 bg-slate-200 mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-slate-900 mb-2">{phase.month}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
