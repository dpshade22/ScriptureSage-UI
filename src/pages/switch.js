// Switch.js
import React from 'react';

const Switch = ({ isOn, handleToggle, onLabel, offLabel }) => {
    return (
        <div className="relative inline-block w-24 align-middle select-none">
            <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked={isOn}
                onChange={handleToggle}
            />
            <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
            <span className="toggle-text absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-gray-300 select-none">
                {offLabel}
            </span>
            <span className="toggle-text absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-gray-300 select-none">
                {onLabel}
            </span>
        </div>
    );
};

export default Switch;
