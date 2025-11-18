import React from 'react';
import './LifestyleOptions.css';

const LifestyleOptions = ({ options, setOptions }) => {
  const handleToggle = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleNumberChange = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
  };

  return (
    <div className="lifestyle-options">
      <h3>🎯 Customize Your Lifestyle</h3>
      <p className="lifestyle-subtitle">Adjust these options to get a personalized calculation</p>
      
      <div className="options-grid">
        {/* Pets Section */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">🐾</span>
            <label>Pets</label>
          </div>
          <div className="option-controls">
            <div className="number-input-group">
              <label>Dogs</label>
              <input
                type="number"
                min="0"
                max="5"
                value={options.dogs}
                onChange={(e) => handleNumberChange('dogs', e.target.value)}
              />
            </div>
            <div className="number-input-group">
              <label>Cats</label>
              <input
                type="number"
                min="0"
                max="5"
                value={options.cats}
                onChange={(e) => handleNumberChange('cats', e.target.value)}
              />
            </div>
          </div>
          <span className="option-cost">+${(options.dogs * 150 + options.cats * 80).toFixed(0)}/mo</span>
        </div>

        {/* Gym Membership */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">💪</span>
            <label>Gym Membership</label>
          </div>
          <div className="option-controls">
            <select 
              value={options.gymMembership}
              onChange={(e) => handleToggle('gymMembership', e.target.value)}
            >
              <option value="none">None</option>
              <option value="basic">Basic ($30/mo)</option>
              <option value="premium">Premium ($80/mo)</option>
              <option value="luxury">Luxury ($150/mo)</option>
            </select>
          </div>
          <span className="option-cost">
            +${options.gymMembership === 'none' ? 0 : 
               options.gymMembership === 'basic' ? 30 :
               options.gymMembership === 'premium' ? 80 : 150}/mo
          </span>
        </div>

        {/* Car Ownership */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">🚗</span>
            <label>Car Ownership</label>
          </div>
          <div className="option-controls">
            <select 
              value={options.carOwnership}
              onChange={(e) => handleToggle('carOwnership', e.target.value)}
            >
              <option value="none">Public Transit Only</option>
              <option value="used">Used Car</option>
              <option value="new">New Car</option>
              <option value="luxury">Luxury Car</option>
            </select>
          </div>
          <span className="option-cost">
            +${options.carOwnership === 'none' ? 0 : 
               options.carOwnership === 'used' ? 350 :
               options.carOwnership === 'new' ? 600 : 1200}/mo
          </span>
        </div>

        {/* Dining Frequency */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">🍽️</span>
            <label>Dining Out</label>
          </div>
          <div className="option-controls">
            <select 
              value={options.diningFrequency}
              onChange={(e) => handleToggle('diningFrequency', e.target.value)}
            >
              <option value="minimal">Minimal (1-2x/week)</option>
              <option value="moderate">Moderate (3-4x/week)</option>
              <option value="frequent">Frequent (5-7x/week)</option>
              <option value="daily">Daily Multiple Meals</option>
            </select>
          </div>
          <span className="option-cost">
            ${options.diningFrequency === 'minimal' ? 200 : 
              options.diningFrequency === 'moderate' ? 400 :
              options.diningFrequency === 'frequent' ? 700 : 1200}/mo
          </span>
        </div>

        {/* Streaming Services */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">📺</span>
            <label>Streaming Services</label>
          </div>
          <div className="option-controls">
            <div className="number-input-group">
              <label>Subscriptions</label>
              <input
                type="number"
                min="0"
                max="15"
                value={options.streamingServices}
                onChange={(e) => handleNumberChange('streamingServices', e.target.value)}
              />
            </div>
          </div>
          <span className="option-cost">+${(options.streamingServices * 15).toFixed(0)}/mo</span>
        </div>

        {/* Coffee Habit */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">☕</span>
            <label>Coffee/Drinks</label>
          </div>
          <div className="option-controls">
            <select 
              value={options.coffeeHabit}
              onChange={(e) => handleToggle('coffeeHabit', e.target.value)}
            >
              <option value="none">Home Brew Only</option>
              <option value="occasional">Occasional (2-3x/week)</option>
              <option value="regular">Regular (Daily)</option>
              <option value="multiple">Multiple Daily</option>
            </select>
          </div>
          <span className="option-cost">
            +${options.coffeeHabit === 'none' ? 0 : 
               options.coffeeHabit === 'occasional' ? 50 :
               options.coffeeHabit === 'regular' ? 120 : 250}/mo
          </span>
        </div>

        {/* Travel */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">✈️</span>
            <label>Annual Travel Budget</label>
          </div>
          <div className="option-controls">
            <select 
              value={options.travelBudget}
              onChange={(e) => handleToggle('travelBudget', e.target.value)}
            >
              <option value="minimal">Minimal ($1-2k/year)</option>
              <option value="moderate">Moderate ($3-5k/year)</option>
              <option value="frequent">Frequent ($6-10k/year)</option>
              <option value="luxury">Luxury ($15k+/year)</option>
            </select>
          </div>
          <span className="option-cost">
            +${options.travelBudget === 'minimal' ? 125 : 
               options.travelBudget === 'moderate' ? 333 :
               options.travelBudget === 'frequent' ? 667 : 1250}/mo
          </span>
        </div>

        {/* Shopping */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">🛍️</span>
            <label>Shopping & Clothing</label>
          </div>
          <div className="option-controls">
            <select 
              value={options.shopping}
              onChange={(e) => handleToggle('shopping', e.target.value)}
            >
              <option value="minimal">Minimal</option>
              <option value="moderate">Moderate</option>
              <option value="fashionable">Fashionable</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <span className="option-cost">
            +${options.shopping === 'minimal' ? 100 : 
               options.shopping === 'moderate' ? 300 :
               options.shopping === 'fashionable' ? 600 : 1200}/mo
          </span>
        </div>

        {/* Hobbies */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">🎨</span>
            <label>Hobbies & Activities</label>
          </div>
          <div className="option-controls">
            <select 
              value={options.hobbies}
              onChange={(e) => handleToggle('hobbies', e.target.value)}
            >
              <option value="minimal">Minimal</option>
              <option value="moderate">Moderate</option>
              <option value="active">Very Active</option>
              <option value="expensive">Expensive Hobbies</option>
            </select>
          </div>
          <span className="option-cost">
            +${options.hobbies === 'minimal' ? 50 : 
               options.hobbies === 'moderate' ? 200 :
               options.hobbies === 'active' ? 400 : 800}/mo
          </span>
        </div>

        {/* Childcare */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">👶</span>
            <label>Children</label>
          </div>
          <div className="option-controls">
            <div className="number-input-group">
              <label>Number of Kids</label>
              <input
                type="number"
                min="0"
                max="10"
                value={options.children}
                onChange={(e) => handleNumberChange('children', e.target.value)}
              />
            </div>
          </div>
          <span className="option-cost">+${(options.children * 1200).toFixed(0)}/mo</span>
        </div>

        {/* Student Loans */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">🎓</span>
            <label>Student Loan Payment</label>
          </div>
          <div className="option-controls">
            <input
              type="number"
              min="0"
              step="50"
              placeholder="$/month"
              value={options.studentLoans}
              onChange={(e) => handleNumberChange('studentLoans', e.target.value)}
            />
          </div>
          <span className="option-cost">+${options.studentLoans}/mo</span>
        </div>

        {/* Savings Rate */}
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">💰</span>
            <label>Savings Goal</label>
          </div>
          <div className="option-controls">
            <select 
              value={options.savingsRate}
              onChange={(e) => handleToggle('savingsRate', e.target.value)}
            >
              <option value="minimal">Minimal (5%)</option>
              <option value="moderate">Moderate (15%)</option>
              <option value="aggressive">Aggressive (25%)</option>
              <option value="fire">FIRE (50%+)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="lifestyle-summary">
        <p>💡 <strong>Tip:</strong> These customizations help us calculate a more accurate income estimate tailored to your lifestyle!</p>
      </div>
    </div>
  );
};

export default LifestyleOptions;
