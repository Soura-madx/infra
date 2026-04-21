import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ShieldCheck, Search, RotateCcw, X } from 'lucide-react';

const ProjectList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ possession: '', status: '', type: '', city: '' });

  const projects = [
   { id: 1, name: "Shivangan Valley", city: "Indore", status: "Ongoing", type: "Residential", possession: "Under Construction", price: "₹45L - ₹85L" },
    { id: 2, name: "Mangal Murti", city: "Dewas", status: "Ready to Move", type: "Residential", possession: "Ready to Move", price: "₹35L - ₹60L" },
    { id: 3, name: "RK Nivash", city: "Ujjain", status: "Upcoming", type: "Commercial", possession: "Under Construction", price: "₹90L - ₹2Cr" },
    { id: 4, name: "Green Heights", city: "Indore", status: "Ongoing", type: "Residential", possession: "Under Construction", price: "₹50L - ₹90L" },
    { id: 5, name: "Skyline Hub", city: "Indore", status: "Upcoming", type: "Commercial", possession: "Under Construction", price: "₹1.5Cr+" },
  ];

  // 2. Handle Filter Changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ possession: '', status: '', type: '', city: '' });
    setSearchQuery('');
  };

  // 3. Filtered Logic
 const filteredProjects = useMemo(() => {
    return projects.filter(proj => {
      // Search logic: Check name or city
      const matchesSearch = searchQuery === '' || 
        proj.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        proj.city.toLowerCase().includes(searchQuery.toLowerCase());

      // Dropdown logic
      const matchesPossession = !filters.possession || proj.possession === filters.possession;
      const matchesStatus = !filters.status || proj.status === filters.status;
      const matchesType = !filters.type || proj.type === filters.type;
      const matchesCity = !filters.city || proj.city === filters.city;

      return matchesSearch && matchesPossession && matchesStatus && matchesType && matchesCity;
    });
  }, [searchQuery, filters]);

  // Check if any filter is active to show "Clear" button
  const isFilterActive = searchQuery || Object.values(filters).some(v => v !== '');
  return (
    <div className="max-w-6xl mx-auto space-y-6" style={{ fontFamily: "'Varela Round', sans-serif" }}>
      <header className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Projects ({filteredProjects.length})</h2>
        {/* SEARCH BAR */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
         <input 
            type="text"
            placeholder="Search name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </header>

      {/* FILTER STRIP */}
      <div className="bg-white p-3 rounded-[8px] border border-gray-100 flex flex-wrap items-center gap-3 shadow-sm">
        <FilterSelect 
          label="Possession" 
          name="possession"
          value={filters.possession}
          options={['Ready to Move', 'Under Construction']} 
          onChange={handleFilterChange}
        />
        <FilterSelect 
          label="Status" 
          name="status"
          value={filters.status}
          options={['Ongoing', 'Upcoming', 'Completed']} 
          onChange={handleFilterChange}
        />
        <FilterSelect 
          label="Type" 
          name="type"
          value={filters.type}
          options={['Commercial', 'Residential']} 
          onChange={handleFilterChange}
        />
        <FilterSelect 
          label="City" 
          name="city"
          value={filters.city}
          options={['Indore', 'Dewas', 'Ujjain']} 
          onChange={handleFilterChange}
        />

        {isFilterActive && (
          <button 
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-black text-red-500 hover:bg-red-50 rounded-[6px] transition-colors uppercase tracking-widest"
          >
            <RotateCcw size={14} /> Clear All
          </button>
        )}
      </div>

      {/* PROJECT CARDS */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(proj => (
          <div key={proj.id} className="bg-white rounded-[8px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="h-44 bg-gray-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
               <div className="absolute top-3 right-3 bg-white/95 px-2 py-1 rounded-[4px] flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={12} className="text-green-600" />
                  <span className="text-[9px] font-bold text-gray-700 uppercase">RERA Approved</span>
               </div>
               <div className="absolute bottom-3 left-3">
                  <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                    {proj.status}
                  </span>
               </div>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 text-base group-hover:text-blue-600 transition-colors">{proj.name}</h3>
                <p className="text-[10px] text-gray-400 flex items-center gap-1 font-bold uppercase tracking-widest mt-1">
                  <MapPin size={10} /> {proj.city}
                </p>
              </div>

              <div className="flex justify-between items-center bg-gray-50 p-2 rounded-[6px]">
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter text-left">Property Type</p>
                  <p className="text-[11px] font-bold text-gray-700">{proj.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Budget Starting</p>
                  <p className="text-[11px] font-bold text-[#f58025]">{proj.price}</p>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/advisor/project/${proj.id}`)}
                className="w-full bg-[#005596] text-white py-2.5 rounded-[8px] text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
              >
                VIEW DETAILS
              </button>
            </div>
          </div>
        ))}
      </div>
{filteredProjects.length === 0 && (
        <div className="py-20 text-center bg-white rounded-[8px] border-2 border-dashed border-gray-100">
          <p className="text-gray-400 font-bold text-sm">No projects found matching your criteria.</p>
          <button onClick={clearFilters} className="mt-2 text-blue-500 text-xs font-bold underline">Reset Search</button>
        </div>
      )}
    </div>
  );
};

const FilterSelect = ({ label, name, value, options, onChange }) => (
  <select 
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
    className={`bg-gray-50 border px-3 py-2 rounded-[8px] text-xs font-bold outline-none min-w-[140px] transition-all
      ${value ? 'border-blue-500 text-blue-600 bg-blue-50/30' : 'border-gray-200 text-gray-600'}
    `}
  >
    <option value="">{label}</option>
    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
  </select>
);

export default ProjectList;