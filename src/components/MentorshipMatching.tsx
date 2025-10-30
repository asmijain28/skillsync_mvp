import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Users,
  Briefcase,
  MapPin,
  Star,
  MessageCircle,
  Calendar,
  TrendingUp,
  Award,
  CheckCircle2,
} from 'lucide-react';
import type { StudentProfile } from '../App';

type MentorshipMatchingProps = {
  profile: StudentProfile;
};

type Mentor = {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  experience: string;
  rating: number;
  sessions: number;
  expertise: string[];
  availability: string;
  matchScore: number;
  bio: string;
  isConnected: boolean;
};

export function MentorshipMatching({ profile }: MentorshipMatchingProps) {
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'Senior Data Scientist',
      company: 'Flipkart',
      location: 'Bangalore, Karnataka',
      experience: '8 years',
      rating: 4.9,
      sessions: 120,
      expertise: ['Machine Learning', 'Python', 'Data Analysis', 'Career Growth'],
      availability: 'Weekends',
      matchScore: 96,
      bio: 'Passionate about helping aspiring data scientists break into the field. Former mentor at IIT Bangalore and startup incubators.',
      isConnected: false,
    },
    {
      id: '2',
      name: 'Arjun Mehta',
      role: 'Product Manager',
      company: 'Razorpay',
      location: 'Bangalore, Karnataka',
      experience: '6 years',
      rating: 4.8,
      sessions: 95,
      expertise: ['Product Strategy', 'Leadership', 'Agile', 'User Research'],
      availability: 'Evenings',
      matchScore: 92,
      bio: 'Helping students transition from technical roles to product management. Led fintech products serving 5M+ merchants.',
      isConnected: false,
    },
    {
      id: '3',
      name: 'Ananya Singh',
      role: 'UX Design Lead',
      company: 'Swiggy',
      location: 'Hyderabad, Telangana',
      experience: '7 years',
      rating: 4.9,
      sessions: 110,
      expertise: ['UX Design', 'Design Systems', 'User Research', 'Figma'],
      availability: 'Flexible',
      matchScore: 88,
      bio: 'Award-winning designer passionate about mentoring the next generation of UX professionals in Indian tech.',
      isConnected: false,
    },
    {
      id: '4',
      name: 'Rahul Kumar',
      role: 'Engineering Manager',
      company: 'Paytm',
      location: 'Noida, UP',
      experience: '10 years',
      rating: 4.7,
      sessions: 140,
      expertise: ['Software Engineering', 'System Design', 'Team Leadership', 'Cloud'],
      availability: 'Weekdays',
      matchScore: 90,
      bio: 'Leading teams of 20+ engineers. Focused on helping junior developers advance their careers in Indian tech ecosystem.',
      isConnected: false,
    },
    {
      id: '5',
      name: 'Sneha Patel',
      role: 'Data Analytics Manager',
      company: 'Zomato',
      location: 'Gurugram, Haryana',
      experience: '9 years',
      rating: 4.8,
      sessions: 105,
      expertise: ['Data Analytics', 'SQL', 'Business Intelligence', 'Mentoring'],
      availability: 'Weekends',
      matchScore: 94,
      bio: 'Specializing in helping students build data portfolios and land their first analytics role in Indian startups.',
      isConnected: false,
    },
    {
      id: '6',
      name: 'Vikram Reddy',
      role: 'ML Engineer',
      company: 'PhonePe',
      location: 'Bangalore, Karnataka',
      experience: '5 years',
      rating: 4.9,
      sessions: 80,
      expertise: ['Machine Learning', 'Deep Learning', 'Python', 'AI Research'],
      availability: 'Evenings',
      matchScore: 93,
      bio: 'Working on cutting-edge AI in payments. Passionate about making ML accessible to everyone in India.',
      isConnected: false,
    },
    {
      id: '7',
      name: 'Kavya Iyer',
      role: 'Fashion Designer',
      company: 'Fabindia',
      location: 'Mumbai, Maharashtra',
      experience: '6 years',
      rating: 4.8,
      sessions: 75,
      expertise: ['Fashion Design', 'Textile Design', 'Brand Strategy', 'Sustainability'],
      availability: 'Weekends',
      matchScore: 91,
      bio: 'Championing sustainable fashion in India. Mentoring aspiring designers on building ethical fashion brands.',
      isConnected: false,
    },
    {
      id: '8',
      name: 'Aditya Kapoor',
      role: 'Senior Advocate',
      company: 'Supreme Court of India',
      location: 'New Delhi',
      experience: '12 years',
      rating: 4.9,
      sessions: 65,
      expertise: ['Corporate Law', 'Constitutional Law', 'Legal Research', 'Court Practice'],
      availability: 'Weekdays',
      matchScore: 89,
      bio: 'Practicing law at the highest court. Guiding law students through career paths in litigation and corporate law.',
      isConnected: false,
    },
    {
      id: '9',
      name: 'Dr. Meera Nair',
      role: 'Clinical Psychologist',
      company: 'NIMHANS',
      location: 'Bangalore, Karnataka',
      experience: '11 years',
      rating: 4.9,
      sessions: 90,
      expertise: ['Clinical Psychology', 'Therapy', 'Mental Health', 'Research'],
      availability: 'Flexible',
      matchScore: 95,
      bio: 'Leading mental health professional. Helping psychology students navigate clinical practice and research careers.',
      isConnected: false,
    },
    {
      id: '10',
      name: 'Prof. Rajesh Gupta',
      role: 'Professor of Sociology',
      company: 'JNU',
      location: 'New Delhi',
      experience: '15 years',
      rating: 4.8,
      sessions: 85,
      expertise: ['Social Research', 'Academia', 'Policy Analysis', 'Publishing'],
      availability: 'Weekends',
      matchScore: 87,
      bio: 'Published researcher and educator. Mentoring students in humanities and social sciences research careers.',
      isConnected: false,
    },
  ]);

  const [selectedTab, setSelectedTab] = useState('recommended');

  const connectWithMentor = (id: string) => {
    setMentors(
      mentors.map((m) => (m.id === id ? { ...m, isConnected: true } : m))
    );
  };

  const recommendedMentors = mentors
    .filter((m) => !m.isConnected)
    .sort((a, b) => b.matchScore - a.matchScore);

  const connectedMentors = mentors.filter((m) => m.isConnected);

  const MentorCard = ({ mentor }: { mentor: Mentor }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
              {mentor.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <CardTitle className="text-lg mb-1">{mentor.name}</CardTitle>
                <CardDescription>{mentor.role}</CardDescription>
              </div>
              <Badge className="bg-blue-600">{mentor.matchScore}% Match</Badge>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-slate-600 mt-2">
              <div className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {mentor.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {mentor.location}
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                {mentor.experience}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-slate-900">{mentor.rating}</span>
              </div>
              <div className="text-slate-600">{mentor.sessions} sessions</div>
              <div className="flex items-center gap-1 text-slate-600">
                <Calendar className="w-3 h-3" />
                {mentor.availability}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-slate-600 mb-4">{mentor.bio}</p>

        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-2">Expertise:</p>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {mentor.isConnected ? (
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Session
            </Button>
          </div>
        ) : (
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
            onClick={() => connectWithMentor(mentor.id)}
          >
            <Users className="w-4 h-4 mr-2" />
            Connect with {mentor.name.split(' ')[0]}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Mentorship Matching</h1>
        <p className="text-slate-600">
          Connect with industry professionals in your target career path
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Available Mentors</p>
                <p className="text-2xl text-slate-900 mt-1">{recommendedMentors.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Connections</p>
                <p className="text-2xl text-slate-900 mt-1">{connectedMentors.length}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Match</p>
                <p className="text-2xl text-slate-900 mt-1">
                  {Math.round(
                    recommendedMentors.reduce((acc, m) => acc + m.matchScore, 0) /
                      recommendedMentors.length
                  )}
                  %
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Top Match</p>
                <p className="text-2xl text-slate-900 mt-1">
                  {recommendedMentors[0]?.matchScore || 0}%
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mentors Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="recommended">
            Recommended ({recommendedMentors.length})
          </TabsTrigger>
          <TabsTrigger value="connected">
            Connected ({connectedMentors.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="mt-6">
          {recommendedMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No recommended mentors at this time</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="connected" className="mt-6">
          {connectedMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {connectedMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 mb-4">
                  You haven't connected with any mentors yet
                </p>
                <Button onClick={() => setSelectedTab('recommended')}>
                  Browse Recommended Mentors
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Mentorship Matching Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg text-blue-600">1</span>
              </div>
              <p className="text-slate-900 mb-2">AI Matching</p>
              <p className="text-sm text-slate-600">
                Our AI analyzes your profile and matches you with mentors in your target field
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg text-purple-600">2</span>
              </div>
              <p className="text-slate-900 mb-2">Connect</p>
              <p className="text-sm text-slate-600">
                Send connection requests to mentors and schedule 1-on-1 sessions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg text-green-600">3</span>
              </div>
              <p className="text-slate-900 mb-2">Grow</p>
              <p className="text-sm text-slate-600">
                Get personalized guidance, career advice, and industry insights
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}