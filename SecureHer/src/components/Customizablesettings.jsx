import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { emergencyContAPI, addemergencyContAPI, editemergencyContAPI, deleteemergencyContAPI } from "../services/contactServices";

const Customizablesettings = () => {
  const queryClient = useQueryClient();
  
  const [settings, setSettings] = useState({ notifications: true, privacyMode: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { data: fetchedContacts = [], isLoading, isError, error: contactError } = useQuery({
    queryKey: ["emergencyContacts"],
    queryFn: emergencyContAPI,
    initialData: [],
  });

  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [policeStation, setPoliceStation] = useState("Fetching nearest police station...");

  const saveMutation = useMutation({
    mutationFn: addemergencyContAPI,
    mutationKey: ["addEmergencyContacts"],
    onSuccess: (updatedContacts) => {
      queryClient.setQueryData(["emergencyContacts"], updatedContacts);
      alert("✅ Settings updated successfully!");
    },
  });

  const editMutation = useMutation({
    mutationFn: editemergencyContAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["emergencyContacts"]);
      alert("✅ Contact updated successfully!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteemergencyContAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["emergencyContacts"]);
      alert("🗑️ Contact deleted successfully!");
    },
  });

  useEffect(() => {
    setEmergencyContacts(fetchedContacts);
  }, [fetchedContacts]);

  useEffect(() => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.example.com/nearest-police?lat=${latitude}&lng=${longitude}`
            );
            const data = await response.json();
            setPoliceStation(data.name || "Police station not found");
          } catch (err) {
            setError("Unable to fetch police station");
            setPoliceStation("Unable to fetch police station");
          }
          setLoading(false);
        },
        () => {
          setError("Failed to retrieve location. Please enable GPS.");
          setPoliceStation("Location access denied");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setPoliceStation("Geolocation not supported");
      setLoading(false);
    }
  }, []);

  const handleContactChange = (index, value) => {
    setEmergencyContacts((prev) => {
      const updatedContacts = [...prev];
      updatedContacts[index] = value;
      return updatedContacts;
    });
  };

  const addContactField = () => {
    setEmergencyContacts([...emergencyContacts, ""]);
  };

  const removeContactField = (id) => {
    if (id) {
      deleteMutation.mutate(id);
    }
    setEmergencyContacts((prev) => prev.filter((_, i) => i !== id));
  };

  const handleEditContact = (id, value) => {
    editMutation.mutate({ id, contact: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContacts = emergencyContacts.filter(contact => 
      !fetchedContacts.includes(contact)
    );
    if (newContacts.length > 0) {
      saveMutation.mutate({ emergencyContacts: newContacts });
    } else {
      alert("No new contacts to save.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-25">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">📞 Emergency Contacts</h3>
          {isLoading ? (
            <p className="text-blue-500 text-center">Loading contacts...</p>
          ) : isError ? (
            <p className="text-red-500 text-center">{contactError.message}</p>
          ) : (
            emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center space-x-3 mb-4">
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => handleContactChange(index, e.target.value)}
                  placeholder={`Emergency Contact ${index + 1}`}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleEditContact(index, contact)}
                  className="p-2 bg-white-500 text-white rounded-lg hover:bg-green-700"
                >
                  ✔
                </button>
                <button
                  type="button"
                  onClick={() => removeContactField(index+1)}
                  className="p-2 bg-white-500 text-white rounded-lg hover:bg-red-700"
                >
                  ❌
                </button>
              </div>
            ))
          )}
          <button
            type="button"
            onClick={addContactField}
            className="w-full py-2 bg-green-600 text-white font-medium rounded-lg shadow-lg hover:bg-green-700 transition duration-300 cursor-pointer"
          >
            ➕ Add Contact
          </button>
        </div>
        <div className="mb-8 border-t pt-4">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">🚓 Nearest Police Station</h3>
          <div className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-700">
            {loading ? "Fetching police station..." : error ? error : policeStation}
          </div>
        </div>
        <div className="space-y-4">
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer">Save Settings</button>
          <Link to="/userprofile" className="block text-center w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer">View Profile</Link>
        </div>
      </form>
    </div>
  );
};

export default Customizablesettings;
