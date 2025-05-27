export const Card = ({ children, className = '', ...props }) => (
  <div 
    className={`bg-white rounded-2xl shadow-lg p-4 ${className}`} 
    {...props} // Spread props so onClick and others get passed
  >
    {children}
  </div>
);
