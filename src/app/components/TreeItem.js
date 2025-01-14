import { useState } from 'react';
import Link from 'next/link';

const TreeItem = ({ item, isOpenSidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="ml-4">
      <div
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 cursor-pointer"
      >
        {hasChildren && (
          <span>
            {isExpanded ? '▼' : '►'}
          </span>
        )}
        {item.path ? (
          <Link
            href={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isOpenSidebar ? 'opacity-100' : 'opacity-0'} `}
          >
            {item.title}
          </Link>
        ) : (
          <span className="px-3 py-2">{item.title}</span>
        )}
      </div>
      {isExpanded && hasChildren && (
        <div className="ml-4">
          {item.children.map((child, index) => (
            <TreeItem key={index} item={child} isOpenSidebar={isOpenSidebar} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeItem;
