import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Users,
  TrendingUp,
  BookOpen,
  Award,
  Target,
  BarChart3,
  PieChart,
  AlertCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function InstitutionalDashboard() {
  // Mock data for institutional analytics
  const studentStats = {
    total: 1247,
    activeUsers: 892,
    assessmentsCompleted: 645,
    avgMatchScore: 87,
  };

  const careerTrends = [
    { month: 'Jan', datascience: 45, software: 62, product: 28, design: 35 },
    { month: 'Feb', datascience: 52, software: 68, product: 31, design: 38 },
    { month: 'Mar', datascience: 58, software: 75, product: 35, design: 42 },
    { month: 'Apr', datascience: 65, software: 82, product: 40, design: 45 },
    { month: 'May', datascience: 72, software: 88, product: 45, design: 48 },
    { month: 'Jun', datascience: 78, software: 95, product: 50, design: 52 },
  ];

  const skillsGapData = [
    { skill: 'Machine Learning', demand: 95, supply: 42, gap: 53 },
    { skill: 'Cloud Computing', demand: 88, supply: 35, gap: 53 },
    { skill: 'Data Analysis', demand: 92, supply: 58, gap: 34 },
    { skill: 'UX Design', demand: 75, supply: 48, gap: 27 },
    { skill: 'Product Management', demand: 82, supply: 38, gap: 44 },
    { skill: 'System Design', demand: 85, supply: 45, gap: 40 },
  ];

  const departmentDistribution = [
    { name: 'Computer Science', value: 420, color: '#3b82f6' },
    { name: 'Engineering', value: 315, color: '#8b5cf6' },
    { name: 'Business', value: 245, color: '#10b981' },
    { name: 'Design', value: 180, color: '#f59e0b' },
    { name: 'Other', value: 87, color: '#6b7280' },
  ];

  const topCareerPaths = [
    { role: 'Software Engineer', students: 285, growth: '+12%' },
    { role: 'Data Scientist', students: 198, growth: '+24%' },
    { role: 'Product Manager', students: 156, growth: '+18%' },
    { role: 'UX Designer', students: 142, growth: '+15%' },
    { role: 'DevOps Engineer', students: 118, growth: '+20%' },
  ];

  const curriculumRecommendations = [
    {
      category: 'High Demand Skills',
      recommendations: [
        'Introduce Advanced Machine Learning course',
        'Add Cloud Architecture certification program',
        'Expand Data Science curriculum',
      ],
    },
    {
      category: 'Industry Alignment',
      recommendations: [
        'Partner with tech companies for internships',
        'Update software development practices',
        'Include more hands-on project work',
      ],
    },
    {
      category: 'Emerging Trends',
      recommendations: [
        'Add AI Ethics and Responsible AI module',
        'Introduce Web3 and Blockchain fundamentals',
        'Expand Cybersecurity offerings',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Students</p>
                <p className="text-2xl text-slate-900 mt-1">{studentStats.total.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+8% this month</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Users</p>
                <p className="text-2xl text-slate-900 mt-1">{studentStats.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-slate-600 mt-1">
                  {Math.round((studentStats.activeUsers / studentStats.total) * 100)}% engagement
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
                <p className="text-sm text-slate-600">Assessments Done</p>
                <p className="text-2xl text-slate-900 mt-1">{studentStats.assessmentsCompleted.toLocaleString()}</p>
                <p className="text-sm text-slate-600 mt-1">
                  {Math.round((studentStats.assessmentsCompleted / studentStats.activeUsers) * 100)}% completion
                </p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Match Score</p>
                <p className="text-2xl text-slate-900 mt-1">{studentStats.avgMatchScore}%</p>
                <p className="text-sm text-green-600 mt-1">+3% improvement</p>
              </div>
              <Target className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="trends">Career Trends</TabsTrigger>
          <TabsTrigger value="skills">Skills Gap</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Interest Trends Over Time</CardTitle>
              <CardDescription>
                Student interest in different career paths by month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={careerTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="software"
                    stroke="#3b82f6"
                    name="Software Engineering"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="datascience"
                    stroke="#8b5cf6"
                    name="Data Science"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="product"
                    stroke="#10b981"
                    name="Product Management"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="design"
                    stroke="#f59e0b"
                    name="UX Design"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Career Paths</CardTitle>
              <CardDescription>Most popular career choices among students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCareerPaths.map((career, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-slate-900">{career.role}</p>
                        <p className="text-sm text-slate-600">{career.students} students</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600">{career.growth}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Gap Analysis</CardTitle>
              <CardDescription>
                Industry demand vs. student proficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={skillsGapData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="demand" fill="#3b82f6" name="Industry Demand %" />
                  <Bar dataKey="supply" fill="#10b981" name="Student Proficiency %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <CardTitle>Critical Skills Gaps</CardTitle>
              </div>
              <CardDescription>Skills requiring immediate curriculum attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {skillsGapData
                  .sort((a, b) => b.gap - a.gap)
                  .slice(0, 3)
                  .map((skill, index) => (
                    <div
                      key={index}
                      className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-slate-900">{skill.skill}</p>
                        <Badge className="bg-orange-600">{skill.gap}% gap</Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-slate-600">
                        <span>Demand: {skill.demand}%</span>
                        <span>Supply: {skill.supply}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Student enrollment by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={departmentDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Details</CardTitle>
                <CardDescription>Breakdown by student count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentDistribution.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-900">{dept.name}</span>
                        <span className="text-slate-600">
                          {dept.value} students (
                          {Math.round(
                            (dept.value / departmentDistribution.reduce((a, b) => a + b.value, 0)) *
                              100
                          )}
                          %)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${
                              (dept.value /
                                departmentDistribution.reduce((a, b) => a + b.value, 0)) *
                              100
                            }%`,
                            backgroundColor: dept.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <CardTitle>AI-Powered Curriculum Recommendations</CardTitle>
              </div>
              <CardDescription>
                Data-driven suggestions to align curriculum with industry needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {curriculumRecommendations.map((section, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue-600">{section.category}</Badge>
                    </div>
                    <div className="space-y-2">
                      {section.recommendations.map((rec, recIndex) => (
                        <div
                          key={recIndex}
                          className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-white">{recIndex + 1}</span>
                          </div>
                          <p className="text-slate-900 flex-1">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementation Priority</CardTitle>
              <CardDescription>Recommended action items by urgency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-red-600">High Priority</Badge>
                    <span className="text-sm text-slate-600">Within 1 semester</span>
                  </div>
                  <p className="text-slate-900">
                    Launch Machine Learning and Cloud Computing courses
                  </p>
                </div>

                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-600">Medium Priority</Badge>
                    <span className="text-sm text-slate-600">Within 2 semesters</span>
                  </div>
                  <p className="text-slate-900">
                    Establish industry partnerships and update curriculum
                  </p>
                </div>

                <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-600">Low Priority</Badge>
                    <span className="text-sm text-slate-600">Within 1 year</span>
                  </div>
                  <p className="text-slate-900">
                    Explore emerging technologies like Web3 and AI Ethics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
