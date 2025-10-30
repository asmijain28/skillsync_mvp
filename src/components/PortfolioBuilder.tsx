import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import {
  FolderKanban,
  Plus,
  CheckCircle2,
  Clock,
  Target,
  Lightbulb,
  Code,
  Palette,
  Database,
} from 'lucide-react';
import type { StudentProfile } from '../App';

type PortfolioBuilderProps = {
  profile: StudentProfile;
};

type ProjectTemplate = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  skills: string[];
  category: string;
  icon: any;
  steps: string[];
  completed: boolean;
};

export function PortfolioBuilder({ profile }: PortfolioBuilderProps) {
  const [projects, setProjects] = useState<ProjectTemplate[]>([
    {
      id: '1',
      title: 'Predictive Analytics Dashboard',
      description: 'Build an interactive dashboard that visualizes and predicts business metrics using historical data',
      difficulty: 'intermediate',
      duration: '4-6 weeks',
      skills: ['Python', 'Data Visualization', 'Machine Learning'],
      category: 'Data Science',
      icon: Database,
      steps: [
        'Collect and clean dataset',
        'Perform exploratory data analysis',
        'Build predictive models',
        'Create interactive visualizations',
        'Deploy dashboard',
      ],
      completed: false,
    },
    {
      id: '2',
      title: 'E-commerce Recommendation System',
      description: 'Develop a machine learning model that recommends products based on user behavior and preferences',
      difficulty: 'advanced',
      duration: '6-8 weeks',
      skills: ['Machine Learning', 'Python', 'Data Analysis'],
      category: 'Machine Learning',
      icon: Lightbulb,
      steps: [
        'Design system architecture',
        'Implement collaborative filtering',
        'Build content-based filtering',
        'Create hybrid model',
        'Evaluate and optimize',
      ],
      completed: false,
    },
    {
      id: '3',
      title: 'Personal Portfolio Website',
      description: 'Create a responsive portfolio website to showcase your projects and achievements',
      difficulty: 'beginner',
      duration: '2-3 weeks',
      skills: ['HTML', 'CSS', 'JavaScript'],
      category: 'Web Development',
      icon: Code,
      steps: [
        'Design wireframes',
        'Set up project structure',
        'Build responsive layouts',
        'Add interactive features',
        'Deploy to hosting',
      ],
      completed: false,
    },
    {
      id: '4',
      title: 'Mobile App UI/UX Design',
      description: 'Design a complete mobile app interface with user flows and interactive prototypes',
      difficulty: 'intermediate',
      duration: '3-4 weeks',
      skills: ['UI/UX Design', 'Figma', 'User Research'],
      category: 'Design',
      icon: Palette,
      steps: [
        'Conduct user research',
        'Create user personas',
        'Design user flows',
        'Build wireframes',
        'Create high-fidelity mockups',
      ],
      completed: false,
    },
    {
      id: '5',
      title: 'Automated Data Pipeline',
      description: 'Build an ETL pipeline that automates data collection, transformation, and loading',
      difficulty: 'advanced',
      duration: '5-7 weeks',
      skills: ['Python', 'SQL', 'Cloud Computing'],
      category: 'Data Engineering',
      icon: Database,
      steps: [
        'Design pipeline architecture',
        'Set up data sources',
        'Build transformation logic',
        'Implement error handling',
        'Deploy and monitor',
      ],
      completed: false,
    },
    {
      id: '6',
      title: 'Sentiment Analysis Tool',
      description: 'Create a tool that analyzes sentiment from social media or customer reviews',
      difficulty: 'intermediate',
      duration: '4-5 weeks',
      skills: ['Python', 'NLP', 'Machine Learning'],
      category: 'Natural Language Processing',
      icon: Lightbulb,
      steps: [
        'Gather text data',
        'Preprocess and clean data',
        'Train sentiment model',
        'Build API interface',
        'Create visualization dashboard',
      ],
      completed: false,
    },
  ]);

  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p))
    );
  };

  const completedCount = projects.filter((p) => p.completed).length;
  const completionPercentage = (completedCount / projects.length) * 100;

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

  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Portfolio Builder</h1>
        <p className="text-slate-600">
          Build a project-based portfolio that showcases your skills
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Portfolio Progress</CardTitle>
              <CardDescription>
                {completedCount} of {projects.length} projects completed
              </CardDescription>
            </div>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <span className="text-2xl text-purple-600">
                {Math.round(completionPercentage)}%
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-3" />
        </CardContent>
      </Card>

      {/* Recommended Project Roadmap */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <CardTitle>Your Personalized Project Roadmap</CardTitle>
          </div>
          <CardDescription>
            Follow this roadmap to build a comprehensive portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className={`border rounded-lg p-4 transition-all ${
                    selectedProject === project.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  } ${project.completed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            project.completed
                              ? 'bg-green-600'
                              : 'bg-slate-200'
                          }`}
                        >
                          {project.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-sm text-slate-600">{index + 1}</span>
                          )}
                        </div>
                        {index < projects.length - 1 && (
                          <div className="w-0.5 h-16 bg-slate-200 mt-2" />
                        )}
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        project.completed ? 'bg-slate-200' : 'bg-gradient-to-br from-blue-100 to-purple-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${project.completed ? 'text-slate-500' : 'text-blue-600'}`} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`text-slate-900 mb-1 ${project.completed ? 'line-through' : ''}`}>
                            {project.title}
                          </h3>
                          <p className="text-sm text-slate-600 mb-2">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getDifficultyColor(project.difficulty)}>
                          {project.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {project.duration}
                        </Badge>
                        <Badge variant="outline">{project.category}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="bg-blue-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={selectedProject === project.id ? 'default' : 'outline'}
                          onClick={() =>
                            setSelectedProject(
                              selectedProject === project.id ? null : project.id
                            )
                          }
                        >
                          {selectedProject === project.id ? 'Hide Steps' : 'View Steps'}
                        </Button>
                        <Button
                          size="sm"
                          variant={project.completed ? 'outline' : 'default'}
                          onClick={() => toggleProject(project.id)}
                        >
                          {project.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </Button>
                      </div>

                      {selectedProject === project.id && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
                          <p className="text-sm text-slate-900 mb-3">
                            Project Steps:
                          </p>
                          <div className="space-y-2">
                            {project.steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="flex items-center gap-2">
                                <Checkbox id={`step-${stepIndex}`} />
                                <label
                                  htmlFor={`step-${stepIndex}`}
                                  className="text-sm text-slate-700 cursor-pointer"
                                >
                                  {step}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Your Existing Projects */}
      {profile.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Existing Projects</CardTitle>
            <CardDescription>
              Projects you've already completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.projects.map((project, index) => (
                <div
                  key={index}
                  className="p-4 border border-green-200 bg-green-50 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="text-slate-900 mb-1">{project.title}</p>
                      <p className="text-sm text-slate-600">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
