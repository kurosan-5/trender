import { createContext, useContext, useState, ReactNode } from "react";

type AlertType = "success"|"error"|"info"|"warning"|"welcome"

interface AlertContextType {
  message:string,
  type:AlertType,
  showAlert:(message:string, type:AlertType) => void,
  clearAlert:()=>void,
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<AlertType>("success");
  
    const showAlert = (msg: string, alertType: AlertType) => {
      setMessage(msg);
      setType(alertType);
    };
  
    const clearAlert = () => {
      setMessage("");
      setType("success");
    };
  
    return (
      <AlertContext.Provider value={{ message, type, showAlert, clearAlert }}>
        {children}
      </AlertContext.Provider>
    );
  };