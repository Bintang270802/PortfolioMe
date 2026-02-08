import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const ProjectFilter = ({ projects, onFilteredProjects, className = "" }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach(project => {
      // Assuming projects have a technologies array or similar
      if (project.technologies) {
        project.technologies.forEach(tech => techSet.add(tech));
      }
      // Also check if there's a tech field in the project description
      if (project.tech) {
        project.tech.forEach(tech => techSet.add(tech));
      }
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter projects based on search term and selected technology
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project => {
        const title = typeof project.title === 'object' 
          ? Object.values(project.title).join(' ') 
          : project.title || '';
        const subtitle = typeof project.subtitle === 'object' 
          ? Object.values(project.subtitle).join(' ') 
          : project.subtitle || '';
        const description = typeof project.fullDescription === 'object' 
          ? Object.values(project.fullDescription).join(' ') 
          : project.fullDescription || '';

        return (
          title.toLowerCase().includes(searchLower) ||
          subtitle.toLowerCase().includes(searchLower) ||
          description.toLowerCase().includes(searchLower)
        );
      });
    }

    // Filter by technology
    if (selectedTech) {
      filtered = filtered.filter(project => {
        const technologies = project.technologies || project.tech || [];
        return technologies.some(tech => 
          tech.toLowerCase().includes(selectedTech.toLowerCase())
        );
      });
    }

    return filtered;
  }, [projects, searchTerm, selectedTech]);

  // Update parent component when filtered projects change
  useEffect(() => {
    onFilteredProjects(filteredProjects);
  }, [filteredProjects, onFilteredProjects]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTech('');
  };

  const hasActiveFilters = searchTerm.trim() || selectedTech;

  return (
    <div className={`project-filter ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 text-sm">
            Search
          </div>
          <input
            type="text"
            placeholder={t('projects.search.placeholder') || 'Search projects...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-800/50 border border-zinc-600/50 rounded-xl pl-20 pr-4 py-3 text-white placeholder-zinc-400 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 text-sm"
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 text-sm font-medium ${
            isFilterOpen || selectedTech
              ? 'bg-violet-600/20 border-violet-500/50 text-violet-300'
              : 'bg-zinc-800/50 border-zinc-600/50 text-zinc-300 hover:border-zinc-500/50'
          }`}
        >
          <span>Filter</span>
          {selectedTech && (
            <span className="bg-violet-500/20 text-violet-300 px-2 py-1 rounded-md text-xs">
              1
            </span>
          )}
        </button>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-600/20 border border-red-500/50 text-red-300 hover:bg-red-600/30 transition-all duration-300 text-sm font-medium"
          >
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      {isFilterOpen && (
        <div className="mt-4 p-4 bg-zinc-800/50 border border-zinc-600/50 rounded-xl backdrop-blur-md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Technology
              </label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full bg-zinc-700/50 border border-zinc-600/50 rounded-lg px-3 py-2 text-white focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 text-sm"
              >
                <option value="">All Technologies</option>
                {allTechnologies.map(tech => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Filter Tags */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Quick Filters
              </label>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'JavaScript', 'Vue.js', 'Express.js'].map(tech => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(selectedTech === tech ? '' : tech)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedTech === tech
                        ? 'bg-violet-600/30 text-violet-300 border border-violet-500/50'
                        : 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/50 hover:bg-zinc-600/50 hover:text-zinc-300'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
        <span>
          {filteredProjects.length} of {projects.length} projects
          {hasActiveFilters && ' (filtered)'}
        </span>
        
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span>Active filters:</span>
            {searchTerm && (
              <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-xs">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedTech && (
              <span className="bg-violet-500/20 text-violet-300 px-2 py-1 rounded-md text-xs">
                Tech: {selectedTech}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFilter;