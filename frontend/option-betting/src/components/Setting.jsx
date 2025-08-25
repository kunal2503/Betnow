import React, { useState, useEffect } from "react";
import { MdDarkMode, MdNotifications, MdSave } from "react-icons/md";
import toast from "react-hot-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true
  });
  const [loading, setLoading] = useState(false);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      // Apply dark mode
      if (settings.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error('Settings save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Settings
        </h2>

        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <MdDarkMode className="text-xl text-gray-600" />
            <div>
              <span className="font-medium text-gray-900">Dark Mode</span>
              <p className="text-sm text-gray-500">Toggle dark theme</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-200"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-200 peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* Notifications Toggle */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <MdNotifications className="text-xl text-gray-600" />
            <div>
              <span className="font-medium text-gray-900">Notifications</span>
              <p className="text-sm text-gray-500">Enable push notifications</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 transition-all duration-200"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-200 peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
          ) : (
            <>
              <MdSave className="text-xl" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Settings;