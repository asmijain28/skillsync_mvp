import { GraduationCap, TrendingUp, BookOpen, FolderKanban, Users, Gamepad2, Building2 } from 'lucide-react';

type NavigationProps = {
  currentPage: string;
  onNavigate: (page: any) => void;
  onToggleView: () => void;
  studentName: string;
};

export function Navigation({ currentPage, onNavigate, onToggleView, studentName }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: GraduationCap },
    { id: 'skills', label: 'Skill Pathways', icon: TrendingUp },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'portfolio', label: 'Portfolio', icon: FolderKanban },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'simulator', label: 'Career Simulator', icon: Gamepad2 },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-900">SkillSync</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleView}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Institution View</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                {studentName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-slate-700 hidden sm:inline">{studentName}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
