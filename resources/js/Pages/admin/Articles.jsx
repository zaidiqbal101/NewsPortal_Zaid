import React, { useEffect, useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import axios from 'axios';

const categories = ['politics', 'world', 'economy', 'science'];

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    fromDate: '',
    toDate: '',
    keywords: ''
  });
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    summary: '',
    date: '',
    source: '',
    image: null,
    publish: false,
  });

  // Fetch articles when category changes
  useEffect(() => {
    if (selectedCategory) {
      axios.get(`/admin/articles/fetch/${selectedCategory}`).then((res) => {
        setArticles(res.data);
        setFilteredArticles(res.data);
      });
    }
  }, [selectedCategory]);

  // Filter articles when search criteria changes
  useEffect(() => {
    let filtered = [...articles];

    // Filter by date range
    if (searchFilters.fromDate) {
      filtered = filtered.filter(article => article.date >= searchFilters.fromDate);
    }
    if (searchFilters.toDate) {
      filtered = filtered.filter(article => article.date <= searchFilters.toDate);
    }

    // Filter by keywords
    if (searchFilters.keywords) {
      const keywords = searchFilters.keywords.toLowerCase().split(' ').filter(k => k.length > 0);
      filtered = filtered.filter(article => {
        const searchText = `${article.title} ${article.summary || ''} ${article.source || ''}`.toLowerCase();
        return keywords.some(keyword => searchText.includes(keyword));
      });
    }

    setFilteredArticles(filtered);
  }, [articles, searchFilters]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const clearFilters = () => {
    setSearchFilters({
      fromDate: '',
      toDate: '',
      keywords: ''
    });
  };

  const openModal = (article = null) => {
    if (article) {
      setIsEdit(true);
      setFormData({
        id: article.id,
        title: article.title,
        summary: article.summary || '',
        date: article.date,
        source: article.source || '',
        image: null,
        publish: (article.publish === 1 || article.publish === '1' || article.publish === 'Yes' || article.publish === true),
      });
    } else {
      setIsEdit(false);
      setFormData({
        id: null,
        title: '',
        summary: '',
        date: '',
        source: '',
        image: null,
        publish: false,
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'image' && value === null) return;
      if (key === 'publish') {
        data.append(key, value ? '1' : '0');
      } else {
        data.append(key, value);
      }
    });

    const url = isEdit
      ? `/admin/articles/update/${selectedCategory}/${formData.id}`
      : `/admin/articles/store/${selectedCategory}`;

    await axios.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setModalOpen(false);
    setFormData({});
    const res = await axios.get(`/admin/articles/fetch/${selectedCategory}`);
    setArticles(res.data);
  };

    const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete this article?')) return;
    await axios.delete(`/admin/articles/delete/${selectedCategory}/${id}`);
    const res = await axios.get(`/admin/articles/fetch/${selectedCategory}`);
    setArticles(res.data);
  };

  const togglePublish = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    
    await axios.post(`/admin/articles/toggle-publish/${selectedCategory}/${id}`, {
      publish: newStatus ? 1 : 0
    });
    
    const res = await axios.get(`/admin/articles/fetch/${selectedCategory}`);
    setArticles(res.data);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Articles Management</h1>

       <select
  className="border border-gray-300 px-4 py-2 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700 w-full mb-4"
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat} value={cat}>
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
    </option>
  ))}
</select>

        {selectedCategory && (
          <>
            {/* Search Filters */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Search & Filter</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={searchFilters.fromDate}
                    onChange={handleSearchChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    value={searchFilters.toDate}
                    onChange={handleSearchChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Keywords</label>
                  <input
                    type="text"
                    name="keywords"
                    value={searchFilters.keywords}
                    onChange={handleSearchChange}
                    placeholder="Search by title, summary, source..."
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                Showing {filteredArticles.length} of {articles.length} articles
              </div>
            </div>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition-colors"
              onClick={() => openModal()}
            >
              + Add Article
            </button>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-200">Title</th>
                    <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-200">Date</th>
                    <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-200">Source</th>
                    <th className="p-3 text-center font-semibold text-gray-700 border-b border-gray-200">Status</th>
                    <th className="p-3 text-center font-semibold text-gray-700 border-b border-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article, index) => (
                    <tr key={article.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-200`}>
                      <td className="p-3 border-b border-gray-100">
                        <div className="font-medium text-gray-900 truncate max-w-xs" title={article.title}>
                          {article.title}
                        </div>
                      </td>
                      <td className="p-3 border-b border-gray-100 text-gray-600">
                        {new Date(article.date).toLocaleDateString()}
                      </td>
                      <td className="p-3 border-b border-gray-100 text-gray-600">
                        {article.source || '-'}
                      </td>
                      <td className="p-3 border-b border-gray-100 text-center">
                        <div
                          onClick={() => togglePublish(article.id, article.publish === 1 || article.publish === '1' || article.publish === 'Yes' || article.publish === true)}
                          className={`relative inline-block w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 shadow-inner ${
                            (article.publish === 1 || article.publish === '1' || article.publish === 'Yes' || article.publish === true)
                              ? 'bg-green-500' 
                              : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                              (article.publish === 1 || article.publish === '1' || article.publish === 'Yes' || article.publish === true)
                                ? 'transform translate-x-6' 
                                : 'transform translate-x-0.5'
                            }`}
                          />
                        </div>
                        <div className="text-xs mt-1 text-gray-500">
                          {(article.publish === 1 || article.publish === '1' || article.publish === 'Yes' || article.publish === true) ? 'Published' : 'Draft'}
                        </div>
                      </td>
                      <td className="p-3 border-b border-gray-100">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="group flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
                            onClick={() => openModal(article)}
                          >
                            <svg className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            className="group flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200"
                            onClick={() => handleDelete(article.id)}
                          >
                            <svg className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredArticles.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center">
                        <div className="flex flex-col items-center text-gray-500">
                          <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-lg font-medium">No articles found</p>
                          <p className="text-sm">Try adjusting your search criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Enhanced Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Backdrop */}
              <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={closeModal}></div>
              
              {/* Modal */}
              <div className="relative inline-block w-full max-w-2xl p-6 my-8 text-left transition-all transform bg-white rounded-xl shadow-2xl sm:align-middle">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${isEdit ? 'bg-blue-100' : 'bg-green-100'}`}>
                      {isEdit ? (
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {isEdit ? 'Edit Article' : 'Create New Article'}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {isEdit ? 'Update the article information below' : 'Fill in the details to create a new article'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Article Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Enter article title"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Publication Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Source
                        </label>
                        <input
                          type="text"
                          name="source"
                          value={formData.source}
                          onChange={handleInputChange}
                          placeholder="Enter source (optional)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Article Image
                        </label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleInputChange}
                          accept="image/*"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Article Summary
                    </label>
                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      placeholder="Enter a brief summary of the article..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Publishing Options */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Publishing Options</h3>
                    <div className="flex items-center">
                      <label className="relative flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="publish"
                          checked={formData.publish}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                          formData.publish ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                            formData.publish ? 'transform translate-x-6' : 'transform translate-x-0.5'
                          }`} />
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          {formData.publish ? 'Publish immediately' : 'Save as draft'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end pt-6 border-t space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`px-6 py-3 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                        isEdit 
                          ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
                          : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                      }`}
                    >
                      {isEdit ? 'Update Article' : 'Create Article'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Articles;