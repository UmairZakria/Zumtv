"use client"
import React, { useState, useEffect } from 'react';
import { Plus,LoaderCircle, Edit, Trash2, Download, Eye } from 'lucide-react';


export default function DownloadsTab() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDownload, setEditingDownload] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    downloadUrl: '',
    version: '',
    platform: 'windows',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const response = await fetch('/api/admin/downloads');
      const data = await response.json();
      if (data.status === 'success') {
        setDownloads(data.data);
      }
    } catch (error) {
      console.error('Error fetching downloads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingDownload 
        ? `/api/admin/downloads/${editingDownload._id}`
        : '/api/admin/downloads';
      
      const method = editingDownload ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        closeModal();
        setEditingDownload(null);
        setFormData({
          title: '',
          description: '',
          downloadUrl: '',
          version: '',
          platform: 'windows',
          isActive: true
        });
        fetchDownloads();
      }
    } catch (error) {
      console.error('Error saving download:', error);
    }
  };

  const handleEdit = (download) => {
    setEditingDownload(download);
    setFormData({
      title: download.title,
      description: download.description,
      downloadUrl: download.downloadUrl,
      version: download.version,
      platform: download.platform,
      order: download.order || 0,
      isActive: download.isActive
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this download?')) return;
    
    try {
      const response = await fetch(`/api/admin/downloads/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        fetchDownloads();
      }
    } catch (error) {
      console.error('Error deleting download:', error);
    }
  };

  const openModal = () => {
    setEditingDownload(null);
    setFormData({
      title: '',
      description: '',
      downloadUrl: '',
      version: '',
      platform: 'windows',
      order: 0,
      isActive: true
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDownload(null);
    setFormData({
      title: '',
      description: '',
      downloadUrl: '',
      version: '',
      platform: 'windows',
      order: 0,
      isActive: true
    });
  };

  if (loading) {
    return <div className="text-center py-8">

          <LoaderCircle className="animate-spin transition-all duration-300 ease-in " />

    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Downloads Links Management</h2>
        <button
          onClick={openModal}
          className="flex items-center space-x-2 px-4 py-2 bg-prime text-white rounded-md hover:bg-prime/90"
        >
          <Plus className="h-4 w-4" />
          <span>Add Download</span>
        </button>
      </div>

      {/* Downloads List */}
      <div className="bg-white shadow-md border border-gray-300  rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Version
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Order
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Status
                 </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {downloads.map((download) => (
                <tr key={download._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{download.title}</div>
                      {download.description && (
                        <div className="text-sm text-gray-500">{download.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {download.platform}
                    </span>
                  </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     {download.version || 'N/A'}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     {download.order || 0}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                       download.isActive 
                         ? 'bg-green-100 text-green-800' 
                         : 'bg-red-100 text-red-800'
                     }`}>
                       {download.isActive ? 'Active' : 'Inactive'}
                     </span>
                   </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(download)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(download._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">

              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingDownload ? 'Edit Download' : 'Add Download'}
              </h3>


              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Download URL</label>
                  <input
                    type="url"
                    required
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700">Version</label>
                     <input
                       type="text"
                       value={formData.version}
                       onChange={(e) => setFormData({...formData, version: e.target.value})}
                       className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700">Platform</label>
                     <select
                       value={formData.platform}
                       onChange={(e) => setFormData({...formData, platform: e.target.value})}
                       className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     >
                       <option value="windows">Windows</option>
                       <option value="mac">Mac</option>
                       <option value="linux">Linux</option>
                       <option value="android">Android</option>
                       <option value="ios">iOS</option>
                       <option value="web">Web</option>
                     </select>
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700">Order</label>
                   <input
                     type="number"
                     value={formData.order}
                     onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                     className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="Display order (lower numbers appear first)"
                   />
                 </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-prime text-white rounded-md text-sm font-medium hover:bg-prime/90"
                  >
                    {editingDownload ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
