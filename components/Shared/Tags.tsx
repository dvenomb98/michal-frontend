import React from 'react';

interface TagsProps {
  tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <ul className="flex gap-2 items-center">
      {tags?.map((tag) => (
        <li className="bg-primary-blue p-2 text-white rounded-sm text-small lg:text-sm" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
