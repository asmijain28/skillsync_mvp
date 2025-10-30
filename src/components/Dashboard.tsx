import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  TrendingUp,
  Sparkles,
  Target,
  ArrowRight,
  DollarSign,
  Award,
  BookOpen,
  Users,
} from 'lucide-react';
import type { StudentProfile } from '../App';

type DashboardProps = {
  profile: StudentProfile;
  onNavigate: (page: any) => void;
};

export function Dashboard({ profile, onNavigate }: DashboardProps) {
  const topCareer = profile.careerMatches?.[0];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Welcome back, {profile.name}!</h1>
          <p className="text-slate-600">
            Your personalized career roadmap is ready
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span className="text-slate-900">Personality: {profile.personalityType}</span>
        </div>
      </div>

      {/* Top Career Match Card */}
      {topCareer && (
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-600">Top Match</Badge>
                  <Badge variant="outline">{topCareer.match}% Match</Badge>
                </div>
                <CardTitle className="text-slate-900">{topCareer.role}</CardTitle>
                <CardDescription className="mt-2">
                  {topCareer.description}
                </CardDescription>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-slate-600">Avg. Salary</p>
                  <p className="text-slate-900">{topCareer.avgSalary}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-slate-600">Job Growth</p>
                  <p className="text-slate-900">{topCareer.growth}</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('skills')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
            >
              View Skill Pathway
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Career Matches Overview */}
      <div>
        <h2 className="text-slate-900 mb-4">Your Career Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.careerMatches?.map((career, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={index === 0 ? 'default' : 'outline'}>
                    {career.match}% Match
                  </Badge>
                  <Award className={`w-5 h-5 ${index === 0 ? 'text-yellow-500' : 'text-slate-400'}`} />
                </div>
                <CardTitle className="text-lg">{career.role}</CardTitle>
                <CardDescription className="text-sm">
                  {career.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Salary</span>
                    <span className="text-slate-900">{career.avgSalary.split(' - ')[0]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Growth</span>
                    <span className="text-green-600">{career.growth}</span>
                  </div>
                </div>
                <Progress value={career.match} className="mb-3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('skills')}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-slate-900 mb-1">Skill Pathways</p>
                <p className="text-sm text-slate-600">
                  Discover skills to learn
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('courses')}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-slate-900 mb-1">Courses</p>
                <p className="text-sm text-slate-600">
                  Curated learning resources
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('portfolio')}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-slate-900 mb-1">Portfolio Builder</p>
                <p className="text-sm text-slate-600">
                  Build project roadmap
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('mentorship')}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-slate-900 mb-1">Find Mentor</p>
                <p className="text-sm text-slate-600">
                  Connect with professionals
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Your Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-600 mb-2">Education</p>
              <p className="text-slate-900">{profile.education}</p>
              <p className="text-slate-900">{profile.major}</p>
              <p className="text-sm text-slate-600 mt-1">GPA: {profile.gpa.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Top Skills</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.slice(0, 5).map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Interests</p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.slice(0, 5).map((interest) => (
                  <Badge key={interest} variant="outline" className="bg-purple-50">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Projects</p>
              <p className="text-slate-900">{profile.projects.length} completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
