import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Transition } from '@headlessui/react';
// import { ChevronRightIcon } from '@heroicons/react/24/solid'; // Removed unused import

interface ScopeSubMenuProps {
  scopes: string[];
  basePath: string;
  parentToolId: string; // To construct unique keys or for other logic if needed
  isOpen: boolean; // 新增 isOpen prop 来控制 Transition
  // No need for isOpen prop if we control visibility purely by conditional rendering in parent
}

const baseScopeLinkClasses = "block px-3 py-1.5 text-xs rounded-md hover:bg-slate-700 transition-colors duration-150";
const activeScopeLinkClasses = "text-sky-300 font-medium bg-slate-700/50";
const inactiveScopeLinkClasses = "text-slate-400 hover:text-slate-200";

const ScopeSubMenu: React.FC<ScopeSubMenuProps> = ({ scopes, basePath, parentToolId, isOpen }) => {
  if (!scopes || scopes.length === 0) {
    return null;
  }

  return (
    <Transition
      as={Fragment} 
      show={isOpen}
      enter="transition-[opacity,max-height] ease-out duration-300"
      enterFrom="opacity-0 max-h-0"
      enterTo="opacity-100 max-h-96"
      leave="transition-[opacity,max-height] ease-in duration-200"
      leaveFrom="opacity-100 max-h-96"
      leaveTo="opacity-0 max-h-0"
    >
      <ul className="mt-1 mb-2 space-y-0.5 pl-5 border-l border-slate-700 ml-3 mr-1 overflow-hidden">
        {/* 移除了 animate-accordion-down，交由 Transition 控制 */}
        {scopes.map(scope => (
          <li key={`${parentToolId}-scope-${scope}`}>
            <NavLink 
              to={`${basePath}?scope=${encodeURIComponent(scope)}`} 
              // `end` prop helps with more precise active state matching if basePath itself is a link
              end 
              className={({isActive}) => 
                  `${baseScopeLinkClasses} ${isActive ? activeScopeLinkClasses : inactiveScopeLinkClasses}`
              }
            >
              {/* Optional: could add a small icon like ChevronRightIcon before scope name */}
              {/* <ChevronRightIcon className="w-3 h-3 mr-1 inline-block" /> */}
              {scope}
            </NavLink>
          </li>
        ))}
      </ul>
    </Transition>
  );
};

export default ScopeSubMenu; 