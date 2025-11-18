import React from 'react';
import { Link } from 'react-router-dom';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import './ExcelExport.css';

const ExcelExport = ({ results, city, country, lifestyleOptions, isPremium = false }) => {
  const exportToExcel = async () => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    
    // Helper function to add a worksheet with data
    const addWorksheet = (name, data) => {
      const worksheet = workbook.addWorksheet(name);
      
      // Add data to worksheet
      data.forEach(row => {
        worksheet.addRow(row);
      });
      
      // Auto-fit columns
      worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
          const columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = Math.min(Math.max(maxLength + 2, 10), 50);
      });
      
      return worksheet;
    };

    // Sheet 1: Summary
    const summaryData = [
      ['Comfort Calculator - Income Analysis'],
      [''],
      ['Location', `${city}, ${country}`],
      ['Generated On', new Date().toLocaleDateString()],
      [''],
      ['INCOME RECOMMENDATION'],
      ['Monthly Income Needed', `$${results.estimatedMonthlyIncome.toLocaleString()}`],
      ['Annual Income Needed', `$${results.estimatedAnnualIncome.toLocaleString()}`],
      [''],
      ['COST OF LIVING INDICES (NYC = 100)'],
      ['Overall Cost of Living', results.costOfLivingIndex],
      ['Rent Index', results.rentIndex],
      ['Groceries Index', results.groceriesIndex],
      ['Restaurant Price Index', results.restaurantPriceIndex],
      ['Local Purchasing Power', results.localPurchasingPowerIndex]
    ];
    addWorksheet('Summary', summaryData);

    // Sheet 2: Monthly Breakdown
    const breakdownData = [
      ['Category', 'Monthly Cost', 'Annual Cost', 'Percentage'],
      ...results.breakdown.map(item => [
        item.category,
        `$${item.amount.toLocaleString()}`,
        `$${(item.amount * 12).toLocaleString()}`,
        `${((item.amount / results.estimatedMonthlyIncome) * 100).toFixed(1)}%`
      ]),
      [''],
      ['TOTAL', `$${results.estimatedMonthlyIncome.toLocaleString()}`, `$${results.estimatedAnnualIncome.toLocaleString()}`, '100%']
    ];
    addWorksheet('Monthly Breakdown', breakdownData);

    // Sheet 3: Lifestyle Options
    const lifestyleData = [
      ['Lifestyle Customizations'],
      [''],
      ['Category', 'Selection', 'Monthly Impact'],
      ['Pets - Dogs', lifestyleOptions.dogs, `$${lifestyleOptions.dogs * 150}`],
      ['Pets - Cats', lifestyleOptions.cats, `$${lifestyleOptions.cats * 80}`],
      ['Gym Membership', lifestyleOptions.gymMembership, getGymCost(lifestyleOptions.gymMembership)],
      ['Car Ownership', lifestyleOptions.carOwnership, getCarCost(lifestyleOptions.carOwnership)],
      ['Dining Frequency', lifestyleOptions.diningFrequency, getDiningCost(lifestyleOptions.diningFrequency)],
      ['Streaming Services', lifestyleOptions.streamingServices, `$${lifestyleOptions.streamingServices * 15}`],
      ['Coffee Habit', lifestyleOptions.coffeeHabit, getCoffeeCost(lifestyleOptions.coffeeHabit)],
      ['Travel Budget', lifestyleOptions.travelBudget, getTravelCost(lifestyleOptions.travelBudget)],
      ['Shopping', lifestyleOptions.shopping, getShoppingCost(lifestyleOptions.shopping)],
      ['Hobbies', lifestyleOptions.hobbies, getHobbiesCost(lifestyleOptions.hobbies)],
      ['Children', lifestyleOptions.children, `$${lifestyleOptions.children * 1200}`],
      ['Student Loans', lifestyleOptions.studentLoans, `$${lifestyleOptions.studentLoans}`],
      ['Savings Rate', lifestyleOptions.savingsRate, '-']
    ];
    addWorksheet('Lifestyle Options', lifestyleData);

    // Sheet 4: Comparison Table (for future scenarios)
    const comparisonData = [
      ['Scenario Comparison'],
      [''],
      ['This sheet can be used to compare different scenarios'],
      ['Add your own data or use the AI Scenario Analysis feature']
    ];
    addWorksheet('Scenario Comparison', comparisonData);

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `Comfort_Calculator_${city.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    saveAs(blob, fileName);
  };

  // Helper functions for cost calculations
  const getGymCost = (type) => {
    const costs = { none: '$0', basic: '$30', premium: '$80', luxury: '$150' };
    return costs[type] || '$0';
  };

  const getCarCost = (type) => {
    const costs = { none: '$0', used: '$350', new: '$600', luxury: '$1200' };
    return costs[type] || '$0';
  };

  const getDiningCost = (freq) => {
    const costs = { minimal: '$200', moderate: '$400', frequent: '$700', daily: '$1200' };
    return costs[freq] || '$400';
  };

  const getCoffeeCost = (habit) => {
    const costs = { none: '$0', occasional: '$50', regular: '$120', multiple: '$250' };
    return costs[habit] || '$0';
  };

  const getTravelCost = (budget) => {
    const costs = { minimal: '$125', moderate: '$333', frequent: '$667', luxury: '$1250' };
    return costs[budget] || '$333';
  };

  const getShoppingCost = (level) => {
    const costs = { minimal: '$100', moderate: '$300', fashionable: '$600', luxury: '$1200' };
    return costs[level] || '$300';
  };

  const getHobbiesCost = (level) => {
    const costs = { minimal: '$50', moderate: '$200', active: '$400', expensive: '$800' };
    return costs[level] || '$200';
  };

  return (
    <div className="excel-export">
      {isPremium ? (
        <button className="export-button premium" onClick={exportToExcel}>
          <span className="button-icon">📊</span>
          Export to Excel
          <span className="premium-badge">PREMIUM</span>
        </button>
      ) : (
        <div className="export-locked">
          <button className="export-button locked" disabled>
            <span className="button-icon">🔒</span>
            Export to Excel
            <span className="premium-badge">PREMIUM</span>
          </button>
          <p className="unlock-message">
            Unlock Excel export for detailed analysis and scenario planning
          </p>
          <Link className="upgrade-button" to="/premium">
            Upgrade to Premium - $4.99/month
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExcelExport;
