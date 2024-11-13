import React from 'react';

interface InputFieldProps {
  type: string;          
  id: string;            
  name: string;          
  label: string;         
  value: string;         
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  required?: boolean;    
}

const InputField: React.FC<InputFieldProps> = ({type,id,name,label,value,onChange,required,}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}:
      </label>
      <input type={type} id={id} name={name} value={value} onChange={onChange} required={required} className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
    </div>
  );
};

export default InputField;
