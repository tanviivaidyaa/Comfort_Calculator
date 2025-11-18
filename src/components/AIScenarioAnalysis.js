import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AIScenarioAnalysis.css';

const AIScenarioAnalysis = ({ results, city, country, lifestyleOptions, isPremium = false }) => {
  const [scenarios, setScenarios] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const generateScenarioSet = () => {
    setAnalyzing(true);
    setSelectedScenario(null);
    setScenarios([]);

    setTimeout(() => {
      const baseIncome = results.estimatedMonthlyIncome;

      const generatedScenarios = [
        {
          id: 1,
          name: 'Budget-Conscious',
          description: 'Minimize expenses while maintaining quality of life',
          monthlyIncome: Math.round(baseIncome * 0.75),
          annualIncome: Math.round(baseIncome * 0.75 * 12),
          changes: [
            { item: 'Move to less expensive neighborhood', savings: Math.round(results.breakdown[0].amount * 0.25) },
            { item: 'Cook at home more often', savings: Math.round(results.breakdown[2].amount * 0.4) },
            { item: 'Use public transportation', savings: 200 },
            { item: 'Reduce entertainment spending', savings: 150 }
          ],
          pros: ['Higher savings rate', 'Less financial stress', 'Build emergency fund faster'],
          cons: ['Longer commute possible', 'Less dining flexibility', 'Fewer spontaneous activities']
        },
        {
          id: 2,
          name: 'Balanced Lifestyle',
          description: 'Current calculation - comfortable middle ground',
          monthlyIncome: baseIncome,
          annualIncome: results.estimatedAnnualIncome,
          changes: [
            { item: 'Maintain current lifestyle choices', savings: 0 }
          ],
          pros: ['Comfortable living', 'Good work-life balance', 'Reasonable savings'],
          cons: ['Moderate flexibility', 'Standard lifestyle']
        },
        {
          id: 3,
          name: 'Premium Comfort',
          description: 'Enhanced lifestyle with luxury amenities',
          monthlyIncome: Math.round(baseIncome * 1.35),
          annualIncome: Math.round(baseIncome * 1.35 * 12),
          changes: [
            { item: 'Upgrade to luxury apartment', cost: Math.round(results.breakdown[0].amount * 0.4) },
            { item: 'Premium gym membership', cost: 150 },
            { item: 'Frequent fine dining', cost: 400 },
            { item: 'Luxury car lease', cost: 800 },
            { item: 'Premium travel budget', cost: 500 }
          ],
          pros: ['High quality of life', 'Best amenities', 'Maximum comfort', 'Impressive lifestyle'],
          cons: ['Higher income required', 'Less savings flexibility', 'More financial pressure']
        },
        {
          id: 4,
          name: 'FIRE (Financial Independence)',
          description: 'Aggressive savings for early retirement',
          monthlyIncome: Math.round(baseIncome * 0.85),
          annualIncome: Math.round(baseIncome * 0.85 * 12),
          changes: [
            { item: 'Maximize savings rate (50%+)', savings: Math.round(baseIncome * 0.5) },
            { item: 'Minimal discretionary spending', savings: 300 },
            { item: 'House hack or roommates', savings: 500 },
            { item: 'Optimize all expenses', savings: 200 }
          ],
          pros: ['Retire 10-15 years early', 'Financial freedom', 'Investment growth', 'Peace of mind'],
          cons: ['Very frugal lifestyle', 'Limited luxuries', 'Requires discipline', 'Social trade-offs']
        },
        {
          id: 5,
          name: 'Family-Focused',
          description: 'Optimized for family with children',
          monthlyIncome: Math.round(baseIncome * 1.5 + (lifestyleOptions.children * 1200)),
          annualIncome: Math.round((baseIncome * 1.5 + (lifestyleOptions.children * 1200)) * 12),
          changes: [
            { item: 'Larger family home', cost: 1200 },
            { item: 'Childcare/education', cost: lifestyleOptions.children * 1200 },
            { item: 'Family activities', cost: 400 },
            { item: 'Larger vehicle', cost: 300 },
            { item: 'Higher grocery budget', cost: 400 }
          ],
          pros: ['Comfortable family life', 'Good schools', 'Family activities', 'Space for growth'],
          cons: ['Significantly higher costs', 'Less flexibility', 'More planning needed']
        },
        {
          id: 6,
          name: 'Remote Work Nomad',
          description: 'Location-independent lifestyle',
          monthlyIncome: Math.round(baseIncome * 0.7),
          annualIncome: Math.round(baseIncome * 0.7 * 12),
          changes: [
            { item: 'No permanent housing (Airbnb)', savings: Math.round(results.breakdown[0].amount * 0.3) },
            { item: 'Minimal possessions', savings: 200 },
            { item: 'Co-working spaces', cost: 200 },
            { item: 'Travel as lifestyle', cost: 800 }
          ],
          pros: ['Ultimate flexibility', 'See the world', 'Unique experiences', 'Lower fixed costs'],
          cons: ['Less stability', 'No permanent home', 'Visa challenges', 'Healthcare complexity']
        }
      ];

      setScenarios(generatedScenarios);
      setAnalyzing(false);
    }, 2000);
  };

  const generateScenarios = () => {
    if (!results) return;
    generateScenarioSet();
  };

  const handleRegenerate = () => {
    if (!results || analyzing) return;
    generateScenarioSet();
  };

  return (
    <div className="ai-scenario-analysis">
      <div className="scenario-header">
        <h3>🤖 AI-Powered Scenario Analysis</h3>
        <p>Explore different lifestyle scenarios and their financial implications</p>
      </div>

      {scenarios.length === 0 ? (
        <div className="generate-section">
          <button 
            className="generate-button"
            onClick={generateScenarios}
            disabled={analyzing}
          >
            {analyzing ? (
              <>
                <span className="spinner"></span>
                Analyzing Scenarios...
              </>
            ) : (
              <>
                <span className="ai-icon">✨</span>
                Generate AI Scenarios
              </>
            )}
          </button>
          <p className="generate-hint">
            Our AI will analyze your location and lifestyle to suggest 6 different scenarios
          </p>
        </div>
      ) : (
        <div className="scenarios-container">
          <div className="scenarios-grid">
            {scenarios.map((scenario) => (
              <div 
                key={scenario.id}
                className={`scenario-card ${selectedScenario?.id === scenario.id ? 'selected' : ''}`}
                onClick={() => setSelectedScenario(scenario)}
              >
                <div className="scenario-header-card">
                  <h4>{scenario.name}</h4>
                  {scenario.id === 2 && <span className="current-badge">Current</span>}
                </div>
                <p className="scenario-description">{scenario.description}</p>
                
                <div className="scenario-income">
                  <div className="income-amount">
                    <span className="label">Monthly</span>
                    <span className="value">${scenario.monthlyIncome.toLocaleString()}</span>
                  </div>
                  <div className="income-amount">
                    <span className="label">Annual</span>
                    <span className="value">${scenario.annualIncome.toLocaleString()}</span>
                  </div>
                </div>

                {scenario.id !== 2 && (
                  <div className="scenario-diff">
                    {scenario.monthlyIncome < results.estimatedMonthlyIncome ? (
                      <span className="savings">
                        💰 Save ${(results.estimatedMonthlyIncome - scenario.monthlyIncome).toLocaleString()}/mo
                      </span>
                    ) : (
                      <span className="additional">
                        💸 +${(scenario.monthlyIncome - results.estimatedMonthlyIncome).toLocaleString()}/mo needed
                      </span>
                    )}
                  </div>
                )}

                <button className="view-details-btn">
                  {selectedScenario?.id === scenario.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>
            ))}
          </div>

          {selectedScenario && (
            <div className="scenario-details">
              <div className="details-header">
                <h4>{selectedScenario.name} - Detailed Analysis</h4>
                <button className="close-btn" onClick={() => setSelectedScenario(null)}>✕</button>
              </div>

              <div className="details-content">
                <div className="details-section">
                  <h5>💡 Key Changes</h5>
                  <ul className="changes-list">
                    {selectedScenario.changes.map((change, idx) => (
                      <li key={idx}>
                        {change.item}
                        {change.savings && <span className="change-impact positive">-${change.savings}/mo</span>}
                        {change.cost && <span className="change-impact negative">+${change.cost}/mo</span>}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="details-grid">
                  <div className="details-section">
                    <h5>✅ Advantages</h5>
                    <ul className="pros-list">
                      {selectedScenario.pros.map((pro, idx) => (
                        <li key={idx}>{pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="details-section">
                    <h5>⚠️ Considerations</h5>
                    <ul className="cons-list">
                      {selectedScenario.cons.map((con, idx) => (
                        <li key={idx}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="details-actions">
                  <button className="action-btn primary">
                    📊 Export This Scenario
                  </button>
                  <button className="action-btn secondary">
                    🔄 Compare with Current
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="scenario-actions">
            <button 
              className="regenerate-btn"
              onClick={handleRegenerate}
              disabled={analyzing}
            >
              {analyzing ? 'Analyzing...' : '🔄 Regenerate Scenarios'}
            </button>
            {isPremium ? (
              <button className="export-all-btn">
                📥 Export All Scenarios
              </button>
            ) : (
              <Link className="export-locked-btn" to="/premium">
                🔒 Unlock Scenario Exports
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIScenarioAnalysis;
