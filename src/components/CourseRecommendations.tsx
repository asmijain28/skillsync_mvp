import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import {
  BookOpen,
  Star,
  Clock,
  Users,
  DollarSign,
  ExternalLink,
  Search,
  Award,
  TrendingUp,
} from 'lucide-react';
import type { StudentProfile } from '../App';

type CourseRecommendationsProps = {
  profile: StudentProfile;
};

type Course = {
  title: string;
  provider: string;
  type: 'online' | 'offline' | 'hybrid';
  rating: number;
  students: string;
  duration: string;
  price: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  certificate: boolean;
  matchScore: number;
};

export function CourseRecommendations({ profile }: CourseRecommendationsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'online' | 'offline' | 'hybrid'>('all');

  const courses: Course[] = [
    {
      title: 'Complete Machine Learning & Data Science Bootcamp',
      provider: 'Coursera',
      type: 'online',
      rating: 4.8,
      students: '250K+',
      duration: '6 months',
      price: '₹3,999/month',
      level: 'intermediate',
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
      certificate: true,
      matchScore: 98,
    },
    {
      title: 'AWS Certified Solutions Architect',
      provider: 'Udemy',
      type: 'online',
      rating: 4.7,
      students: '180K+',
      duration: '4 months',
      price: '₹799 one-time',
      level: 'advanced',
      skills: ['Cloud Computing', 'AWS', 'DevOps'],
      certificate: true,
      matchScore: 92,
    },
    {
      title: 'Full Stack Web Development',
      provider: 'edX',
      type: 'online',
      rating: 4.6,
      students: '120K+',
      duration: '8 months',
      price: 'Free (cert ₹999)',
      level: 'beginner',
      skills: ['JavaScript', 'React', 'Node.js'],
      certificate: true,
      matchScore: 88,
    },
    {
      title: 'Data Structures and Algorithms Specialization',
      provider: 'Coursera',
      type: 'online',
      rating: 4.9,
      students: '300K+',
      duration: '5 months',
      price: '₹3,999/month',
      level: 'intermediate',
      skills: ['Algorithms', 'Problem Solving', 'Python'],
      certificate: true,
      matchScore: 95,
    },
    {
      title: 'UX Design Professional Certificate',
      provider: 'Google',
      type: 'online',
      rating: 4.8,
      students: '200K+',
      duration: '6 months',
      price: '₹3,199/month',
      level: 'beginner',
      skills: ['UX Design', 'Figma', 'User Research'],
      certificate: true,
      matchScore: 85,
    },
    {
      title: 'Professional Data Science Bootcamp',
      provider: 'upGrad',
      type: 'hybrid',
      rating: 4.7,
      students: '15K+',
      duration: '3 months',
      price: '₹1,25,000',
      level: 'intermediate',
      skills: ['Python', 'Machine Learning', 'Statistics'],
      certificate: true,
      matchScore: 94,
    },
    {
      title: 'Advanced SQL for Data Analytics',
      provider: 'DataCamp',
      type: 'online',
      rating: 4.6,
      students: '90K+',
      duration: '2 months',
      price: '₹2,000/month',
      level: 'intermediate',
      skills: ['SQL', 'Database Management', 'Data Analysis'],
      certificate: true,
      matchScore: 87,
    },
    {
      title: 'Leadership and Communication Skills',
      provider: 'LinkedIn Learning',
      type: 'online',
      rating: 4.5,
      students: '150K+',
      duration: '1 month',
      price: '₹2,499/month',
      level: 'beginner',
      skills: ['Leadership', 'Communication', 'Team Management'],
      certificate: true,
      matchScore: 82,
    },
    {
      title: 'Product Management Fundamentals',
      provider: 'IIM Bangalore',
      type: 'hybrid',
      rating: 4.8,
      students: '8K+',
      duration: '4 months',
      price: '₹85,000',
      level: 'intermediate',
      skills: ['Product Management', 'Strategy', 'Agile'],
      certificate: true,
      matchScore: 90,
    },
    {
      title: 'Fashion Design Diploma',
      provider: 'NIFT Online',
      type: 'online',
      rating: 4.7,
      students: '12K+',
      duration: '12 months',
      price: '₹60,000',
      level: 'beginner',
      skills: ['Fashion Design', 'Textile', 'Pattern Making'],
      certificate: true,
      matchScore: 86,
    },
    {
      title: 'Law Entrance Preparation',
      provider: 'LawSikho',
      type: 'online',
      rating: 4.6,
      students: '25K+',
      duration: '6 months',
      price: '₹25,000',
      level: 'beginner',
      skills: ['Legal Research', 'Constitutional Law', 'Critical Thinking'],
      certificate: true,
      matchScore: 83,
    },
    {
      title: 'Clinical Psychology Certification',
      provider: 'IGNOU',
      type: 'hybrid',
      rating: 4.8,
      students: '10K+',
      duration: '8 months',
      price: '₹15,000',
      level: 'intermediate',
      skills: ['Psychology', 'Therapy', 'Counseling', 'Mental Health'],
      certificate: true,
      matchScore: 89,
    },
  ];

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesType = selectedType === 'all' || course.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const getLevelColor = (level: string) => {
    switch (level) {
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

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-600">{course.matchScore}% Match</Badge>
              {course.certificate && (
                <Badge variant="outline">
                  <Award className="w-3 h-3 mr-1" />
                  Certificate
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg mb-1">{course.title}</CardTitle>
            <CardDescription>{course.provider}</CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600 mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {course.rating}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.students}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-slate-900">{course.price}</span>
            </div>
            <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
          </div>

          <Button className="w-full">
            Enroll Now
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Course Recommendations</h1>
        <p className="text-slate-600">
          Curated learning resources tailored to your career goals
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Matched Courses</p>
                <p className="text-2xl text-slate-900 mt-1">{courses.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Match Score</p>
                <p className="text-2xl text-slate-900 mt-1">
                  {Math.round(
                    courses.reduce((acc, c) => acc + c.matchScore, 0) / courses.length
                  )}
                  %
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">With Certificates</p>
                <p className="text-2xl text-slate-900 mt-1">
                  {courses.filter((c) => c.certificate).length}
                </p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Online Courses</p>
                <p className="text-2xl text-slate-900 mt-1">
                  {courses.filter((c) => c.type === 'online').length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search courses or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedType} onValueChange={(v: any) => setSelectedType(v)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="online">Online</TabsTrigger>
                <TabsTrigger value="offline">Offline</TabsTrigger>
                <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No courses found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}