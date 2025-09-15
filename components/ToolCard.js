import Link from 'next/link'

export default function ToolCard({ tool }) {
  const Icon = tool.icon
  
  return (
    <Link 
      href={tool.href}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden hover:border-gray-300 transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`${tool.color} rounded-lg p-3 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
              {tool.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {tool.description}
            </p>
            <div className="mt-3">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {tool.category}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-red-600 text-sm font-medium group-hover:text-red-700">
          <span>Get started</span>
          <svg 
            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}