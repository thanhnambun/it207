import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface cho Contact
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

// Interface cho Context
interface PhoneBookContextType {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, "id">) => void;
  updateContact: (id: string, contact: Omit<Contact, "id">) => void;
  deleteContact: (id: string) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  editingContact: Contact | null;
  setEditingContact: (contact: Contact | null) => void;
}

// Tạo Context
const PhoneBookContext = createContext<PhoneBookContextType | undefined>(
  undefined
);

// Provider Component
export const PhoneBookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Key cho AsyncStorage
  const STORAGE_KEY = "phonebook_contacts";

  // Load dữ liệu từ AsyncStorage khi component mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Lưu dữ liệu vào AsyncStorage mỗi khi contacts thay đổi
  useEffect(() => {
    saveContacts();
  }, [contacts]);

  // Load contacts từ AsyncStorage
  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  // Save contacts vào AsyncStorage
  const saveContacts = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch (error) {
      console.error("Error saving contacts:", error);
    }
  };

  // Thêm contact mới
  const addContact = (contactData: Omit<Contact, "id">) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(), // Tạo ID đơn giản
    };
    setContacts((prev) => [...prev, newContact]);
    setShowForm(false);
  };

  // Cập nhật contact
  const updateContact = (id: string, contactData: Omit<Contact, "id">) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contactData, id } : contact
      )
    );
    setEditingContact(null);
    setShowForm(false);
  };

  // Xóa contact
  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const value: PhoneBookContextType = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    showForm,
    setShowForm,
    editingContact,
    setEditingContact,
  };

  return (
    <PhoneBookContext.Provider value={value}>
      {children}
    </PhoneBookContext.Provider>
  );
};

// Hook để sử dụng Context
export const usePhoneBook = () => {
  const context = useContext(PhoneBookContext);
  if (context === undefined) {
    throw new Error("usePhoneBook must be used within a PhoneBookProvider");
  }
  return context;
};
