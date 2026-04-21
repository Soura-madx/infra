import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, X, Upload, User, Heart, Landmark, 
  FileText, Image as ImageIcon, CheckCircle 
} from 'lucide-react';

const EditProfile = () => {
  const navigate = useNavigate();

  // Recommended Editable Fields based on standard forms
  const [formData, setFormData] = useState({
    fatherName: "Suresh Kumar",
    maritalStatus: "Married",
    nationality: "Indian",
    mobile: "+91 98765 43210",
    email: "rajesh.k@gmail.com",
    address: "42, Green Avenue, Behind City Mall, Sector 4, Jaipur, Rajasthan",
    nomineeName: "Sunita Kumar",
    nomineeRelation: "Spouse",
    nomineeDob: "1988-11-22",
    bankName: "HDFC Bank",
    branch: "Vaishali Nagar",
    accountNo: "50100234567890",
    ifsc: "HDFC0001234"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8" style={{ fontFamily: "'Varela Round', sans-serif" }}>
      {/* Top Action Bar */}
      

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN: FORM DATA */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          
          {/* PERSONAL DETAILS CARD */}
          <FormCard title="Personal Details" icon={<User size={18} className="text-[#005596]" />}>
            <div className="grid grid-cols-2 gap-6">
              <InputField label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleInputChange} />
              <SelectField 
                label="Marital Status" 
                name="maritalStatus" 
                value={formData.maritalStatus} 
                options={['Single', 'Married', 'Divorced']} 
                onChange={handleInputChange} 
              />
              <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} />
              <InputField label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleInputChange} />
              <div className="col-span-2">
                <InputField label="Email Address" name="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="col-span-2">
                <TextAreaField label="Current Address" name="address" value={formData.address} onChange={handleInputChange} />
              </div>
            </div>
          </FormCard>

          {/* FAMILY DETAILS CARD */}
          <FormCard title="Family / Nominee Details" icon={<Heart size={18} className="text-red-500" />}>
            <div className="grid grid-cols-2 gap-6">
              <InputField label="Nominee Name" name="nomineeName" value={formData.nomineeName} onChange={handleInputChange} />
              <InputField label="Relation" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleInputChange} />
              <div className="col-span-2">
                <InputField label="Nominee Date of Birth" name="nomineeDob" type="date" value={formData.nomineeDob} onChange={handleInputChange} />
              </div>
            </div>
          </FormCard>

          {/* BANKING DETAILS CARD */}
          <FormCard title="Banking Information" icon={<Landmark size={18} className="text-[#005596]" />}>
            <div className="grid grid-cols-2 gap-6">
              <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleInputChange} />
              <InputField label="Branch Name" name="branch" value={formData.branch} onChange={handleInputChange} />
              <InputField label="Account Number" name="accountNo" value={formData.accountNo} onChange={handleInputChange} />
              <InputField label="IFSC Code" name="ifsc" value={formData.ifsc} onChange={handleInputChange} />
            </div>
          </FormCard>
        </div>

        {/* RIGHT COLUMN: DOCUMENT UPLOADS */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
            <FileText size={18} className="text-[#f58025]" /> Document Uploads
          </h3>
          
          {/* Documents in 2-column grid */}
          <div className="grid grid-cols-2 gap-4">
           
            <UploadCard label="PAN Card (Front)" />
            <UploadCard label="PAN Card (Back)" /> {/* Added Pan Back */}
            <UploadCard label="Aadhar (Front)" />
            <UploadCard label="Aadhar (Back)" />
            
          </div>

          <div className="bg-blue-50 p-4 rounded-[8px] border border-blue-100">
            <p className="text-[10px] text-blue-700 font-bold leading-relaxed">
              * Max file size: 2MB. Supported formats: JPG, PNG, PDF. 
              Non-editable fields like Name and Leader Code must be changed via Admin support.
            </p>
          </div>
        </div>
      </div>


      <div className="flex justify-between items-center bg-white p-4 rounded-[8px] border border-gray-100 shadow-sm  z-20">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Update Profile Information</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ensure all details match your legal documents</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/advisor/profile')}
            className="px-6 py-2 rounded-[8px] text-xs font-bold text-gray-500 hover:bg-gray-100 transition-all flex items-center gap-2"
          >
            <X size={14} /> CANCEL
          </button>
          <button className="bg-[#f58025] hover:bg-orange-600 text-white px-8 py-2 rounded-[8px] text-xs font-bold flex items-center gap-2 shadow-lg shadow-orange-200 transition-all">
            <Save size={14} /> SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- UI HELPER COMPONENTS --- */

const FormCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-[8px] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
    <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
      {icon}
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">{title}</h3>
    </div>
    <div className="p-8">{children}</div>
  </div>
);

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{label}</label>
    <input 
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-50 border border-gray-200 p-2.5 rounded-[8px] text-sm text-gray-700 focus:ring-2 focus:ring-[#005596]/10 focus:border-[#005596] outline-none transition-all"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{label}</label>
    <textarea 
      name={name}
      value={value}
      onChange={onChange}
      rows="3"
      className="bg-gray-50 border border-gray-200 p-2.5 rounded-[8px] text-sm text-gray-700 focus:ring-2 focus:ring-[#005596]/10 focus:border-[#005596] outline-none transition-all resize-none"
    />
  </div>
);

const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{label}</label>
    <select 
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-50 border border-gray-200 p-2.5 rounded-[8px] text-sm text-gray-700 focus:border-[#005596] outline-none"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const UploadCard = ({ label }) => (
  <div className="group bg-white border-2 border-dashed border-gray-200 rounded-[8px] p-4 flex flex-col items-center justify-center gap-3 hover:border-[#f58025] hover:bg-orange-50/30 transition-all cursor-pointer relative overflow-hidden h-32 text-center">
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#f58025] group-hover:text-white transition-colors">
      <Upload size={14} />
    </div>
    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter group-hover:text-[#f58025]">{label}</p>
    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
  </div>
);

export default EditProfile;