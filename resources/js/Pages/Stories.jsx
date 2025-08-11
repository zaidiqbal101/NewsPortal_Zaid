import React from 'react';

const StoryCard = ({ story }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
      <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-400 font-semibold text-lg select-none">
        {story.image_text || 'Image'}
      </div>

      <div className="p-6 flex flex-col h-full">
        <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
          {story.category}
        </span>

        <h3 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight">
          {story.title}
        </h3>

        <p className="text-gray-700 flex-grow">{story.excerpt}</p>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 font-medium">
          <span>By <span className="text-gray-900">{story.author}</span></span>
          <span>
            {story.time} &nbsp;|&nbsp; {story.views_count} views
          </span>
        </div>
      </div>
    </div>
  );
};


const Stories = ({ featuredStories }) => {
  if (!featuredStories || featuredStories.length === 0) {
    return <div>No featured stories available.</div>;
  }  

  return (
    <section id="stories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-center text-gray-800 mb-16">
          Featured Stories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStories.map((story, index) => (
            <StoryCard key={story.id || index} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;
