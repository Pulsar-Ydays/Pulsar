
interface AuthButtonProps {
    isActive: boolean;
    onClick: () => void;
    label: string;
  }
  
  const AuthButton: React.FC<AuthButtonProps> = ({ isActive, onClick, label }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 border rounded ${isActive ? "bg-white text-black" : "text-white"}`}
      >
        {label}
      </button>
    );
  };
  
  export default AuthButton;