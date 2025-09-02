"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Download, 
  Palette, 
  LoaderCircle,
  FileText, 
  MessageSquare, 
  LogOut, 
  Users, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Menu
} from 'lucide-react';
import DownloadsTab from './DownloadsTab';
import ThemesTab from './ThemesTab';
import ContentTab from './ContentTab';
import ContactsTab from './ContactsTab';
import ImagesTab from './ImagesTab';

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    contacts: 0,
    downloads: 0,
    themes: 0,
    content: 0
  });
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem('adminData');
    if (!admin) {
      router.push('/admin');
      return;
    }
    setAdminData(JSON.parse(admin));
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const [contactsRes, downloadsRes, themesRes, contentRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/admin/downloads'),
        fetch('/api/admin/themes'),
        fetch('/api/admin/content')
      ]);

      const contacts = await contactsRes.json();
      const downloads = await downloadsRes.json();
      const themes = await themesRes.json();
      const content = await contentRes.json();

      setStats({
        contacts: contacts.data?.length || 0,
        downloads: downloads.data?.length || 0,
        themes: themes.data?.length || 0,
        content: content.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminData');
    router.push('/admin');
  };

  if (!adminData) {
    return <div>
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in " />

    </div>;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'themes', label: 'Themes', icon: Palette },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare },
    { id: 'images', label: 'Images', icon: Plus },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];


  return (
    <div className="min-h-screen font-roboto bg-gray-50">
      {/* Header */}
      <header className="bg-prime text-white shadow-md   sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center">
              {/* Hamburger for mobile */}
              <button className="lg:hidden mr-3" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6 text-gay-900" />
              </button>
              <h1 className="text-2xl font-bold tracking-widest uppercase ">Zumtv Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* <span className="text-sm text-gray-700">Welcome, {adminData.name}</span> */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-gray-100 hover:text-gray-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar for desktop, Drawer for mobile */}
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Mobile Drawer */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 flex lg:hidden">
              <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)}></div>
              <aside className="relative w-64 bg-white h-full shadow-lg z-50 p-6">
                <button className="absolute top-4 right-4" onClick={() => setSidebarOpen(false)}>
                  <span className="text-2xl">&times;</span>
                </button>
                <nav className="space-y-2 mt-8">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === tab.id
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </aside>
            </div>
          )}
          {/* Sidebar for desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-4 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full px-2 md:px-0 mt-8 lg:mt-0">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-400">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.contacts}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-400">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Download className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Download Links</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.downloads}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-400">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Palette className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Themes</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.themes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-400">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Content Items</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.content}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-400">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveTab('downloads')}
                      className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Download</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('themes')}
                      className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Theme</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('content')}
                      className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Content</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

                         {activeTab === 'downloads' && <DownloadsTab />}
             {activeTab === 'themes' && <ThemesTab />}
             {activeTab === 'content' && <ContentTab />}
             {activeTab === 'contacts' && <ContactsTab />}
             {activeTab === 'images' && <ImagesTab />}
             {activeTab === 'settings' && <SettingsTab />}
           </main>
         </div>
       </div>
     </div>
   );
 }
 
 // Settings Tab Component
 function SettingsTab() {
   const [form, setForm] = React.useState({
     email: '',
     phone: '',
     socials: {
       facebook: '',
       twitter: '',
       instagram: '',
       youtube: '',
       linkedin: ''
     },
     adminEmail: '',
     adminPassword: '',
     adminName: ''
   });
   const [loading, setLoading] = React.useState(false);
   const [loading2, setLoading2] = React.useState(true);

   const [success, setSuccess] = React.useState('');
   const [error, setError] = React.useState('');

   React.useEffect(() => {
     fetch('/api/admin/settings')
       .then(res => res.json())
       .then(data => {
         if (data.status === 'success' && data.data) {
           setLoading2(false);

           setForm(f => ({
             ...f,
             email: data.data.siteEmail || '',
             phone: data.data.sitePhone || '',
             socials: {
               ...f.socials,
               ...data.data.socials
             }
           }));
         }
       });
     // Fetch admin info
     fetch('/api/admin/login')
       .then(res => res.json())
       .then(data => {
         if (data.admin) {
           setForm(f => ({
             ...f,
             adminEmail: data.admin.email,
             adminName: data.admin.name
           }));
         }
       });
   }, []);

   const handleChange = e => {
     const { name, value } = e.target;
     if (name.startsWith('socials.')) {
       const key = name.split('.')[1];
       setForm(f => ({ ...f, socials: { ...f.socials, [key]: value } }));
     } else {
       setForm(f => ({ ...f, [name]: value }));
     }
   };

   const handleSubmit = async e => {
     e.preventDefault();
     setLoading(true);
     setSuccess('');
     setError('');
     try {
       // Update site settings
       const res1 = await fetch('/api/admin/settings', {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           siteEmail: form.email,
           sitePhone: form.phone,
           socials: form.socials
         })
       });
       const data1 = await res1.json();
       if (data1.status !== 'success') throw new Error(data1.message);
       // Update admin info
       const res2 = await fetch('/api/admin/login', {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           email: form.adminEmail,
           password: form.adminPassword,
           name: form.adminName
         })
       });
       const data2 = await res2.json();
       if (data2.status !== 'success') throw new Error(data2.message);
       setSuccess('Settings updated successfully!');
     } catch (err) {
       setError(err.message || 'Failed to update settings');
     }
     setLoading(false);
   };

   if (loading2) {
    return <div className="text-center py-8">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in " />

    </div>;
  }

   return (
     <div className="space-y-6 ">
       <h2 className="text-2xl font-bold font-poppins text-gray-900">Settings</h2>
       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300  mx-auto space-y-8 max-w-2xl">
         <h3 className="text-lg font-semibold text-black mb-2">Site Contact Info</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700">Email</label>
             <input type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700">Phone</label>
             <input type="text" name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
           </div>
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700">Social Links</label>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <input type="text" name="socials.facebook" value={form.socials.facebook} onChange={handleChange} placeholder="Facebook" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
             <input type="text" name="socials.twitter" value={form.socials.twitter} onChange={handleChange} placeholder="Twitter" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
             <input type="text" name="socials.instagram" value={form.socials.instagram} onChange={handleChange} placeholder="Instagram" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
             <input type="text" name="socials.youtube" value={form.socials.youtube} onChange={handleChange} placeholder="YouTube" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
             <input type="text" name="socials.linkedin" value={form.socials.linkedin} onChange={handleChange} placeholder="LinkedIn" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
           </div>
         </div>
         <h3 className="text-lg font-semibold text-black mt-6 mb-2">Admin Login Info</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700">Admin Name</label>
             <input type="text" name="adminName" value={form.adminName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700">Admin Email</label>
             <input type="email" name="adminEmail" value={form.adminEmail} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
           </div>
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700">New Password</label>
           <input type="password" name="adminPassword" value={form.adminPassword} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Leave blank to keep current password" />
         </div>
         {success && <div className="text-green-600 font-medium">{success}</div>}
         {error && <div className="text-red-600 font-medium">{error}</div>}
         <button type="submit" className="px-6 py-2 bg-prime text-white rounded-md font-medium" disabled={loading}>
           {loading ? 'Saving...' : 'Save Settings'}
         </button>
       </form>
     </div>
   );
 }
