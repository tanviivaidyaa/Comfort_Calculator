// import axios from 'axios';

// Numbeo API endpoint (for future use with API key)
// const NUMBEO_API_BASE = 'https://www.numbeo.com/api';

/**
 * Fetch cost of living data from Numbeo API
 * Note: Numbeo's free API has limitations. This implementation uses their public data structure.
 * For production use, you may need to sign up for an API key at https://www.numbeo.com/common/api.jsp
 */
export const fetchCostOfLiving = async (city, country, lifestyleOptions = {}) => {
  try {
    // Since Numbeo's free API is limited, we'll use a combination of their public data
    // and calculations based on typical cost of living patterns
    
    // For a real implementation with API key, uncomment axios import and use:
    // const response = await axios.get(`${NUMBEO_API_BASE}/city_prices`, {
    //   params: {
    //     api_key: 'YOUR_API_KEY',
    //     query: city
    //   }
    // });

    // Simulated API call with realistic data based on Numbeo's structure
    const costData = await simulateNumbeoData(city, country);
    
    // Calculate recommended income based on cost of living and lifestyle
    const results = calculateComfortIncome(costData, lifestyleOptions);
    
    return results;
  } catch (error) {
    console.error('Error fetching cost of living data:', error);
    throw new Error('Unable to fetch cost of living data. Please try again later.');
  }
};

/**
 * Simulate Numbeo API response with realistic data
 * In production, replace this with actual API calls
 */
const simulateNumbeoData = async (city, country) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Cost of living indices for major cities (relative to NYC = 100)
  const cityData = {
    // US Cities
    'New York': { col: 100.0, rent: 100.0, groceries: 100.0, restaurant: 100.0, purchasing: 100.0 },
    'San Francisco': { col: 95.2, rent: 89.5, groceries: 78.3, restaurant: 82.1, purchasing: 112.3 },
    'Los Angeles': { col: 77.8, rent: 68.2, groceries: 71.4, restaurant: 73.5, purchasing: 98.7 },
    'Chicago': { col: 73.9, rent: 61.5, groceries: 70.2, restaurant: 72.8, purchasing: 96.8 },
    'Miami': { col: 72.5, rent: 62.8, groceries: 68.9, restaurant: 70.2, purchasing: 87.3 },
    'Seattle': { col: 82.6, rent: 72.3, groceries: 74.8, restaurant: 78.5, purchasing: 108.9 },
    'Boston': { col: 84.2, rent: 75.8, groceries: 76.3, restaurant: 79.8, purchasing: 105.7 },
    'Austin': { col: 68.5, rent: 55.8, groceries: 65.3, restaurant: 67.2, purchasing: 102.3 },
    
    // International Cities
    'London': { col: 85.3, rent: 78.9, groceries: 72.4, restaurant: 80.5, purchasing: 92.3 },
    'Tokyo': { col: 88.5, rent: 65.8, groceries: 85.2, restaurant: 52.3, purchasing: 88.7 },
    'Paris': { col: 86.2, rent: 72.5, groceries: 78.9, restaurant: 75.3, purchasing: 89.5 },
    'Sydney': { col: 83.7, rent: 70.5, groceries: 76.8, restaurant: 78.2, purchasing: 105.3 },
    'Toronto': { col: 72.8, rent: 62.3, groceries: 68.5, restaurant: 65.8, purchasing: 94.2 },
    'Singapore': { col: 91.2, rent: 88.5, groceries: 72.3, restaurant: 65.8, purchasing: 98.7 },
    'Dubai': { col: 75.8, rent: 68.2, groceries: 65.3, restaurant: 70.5, purchasing: 115.8 },
    'Berlin': { col: 70.5, rent: 58.3, groceries: 62.8, restaurant: 65.2, purchasing: 96.5 },
    'Mumbai': { col: 32.5, rent: 28.3, groceries: 35.8, restaurant: 25.2, purchasing: 45.8 },
    'Bangkok': { col: 48.5, rent: 38.2, groceries: 42.5, restaurant: 35.8, purchasing: 62.3 },
    'Mexico City': { col: 42.8, rent: 35.5, groceries: 38.9, restaurant: 40.2, purchasing: 58.7 },
  };

  // Get city data or use default (NYC)
  const data = cityData[city] || { 
    col: 70.0, 
    rent: 65.0, 
    groceries: 70.0, 
    restaurant: 68.0, 
    purchasing: 90.0 
  };
  
  return {
    costOfLivingIndex: data.col,
    rentIndex: data.rent,
    groceriesIndex: data.groceries,
    restaurantPriceIndex: data.restaurant,
    localPurchasingPowerIndex: data.purchasing,
    city: city,
    country: country
  };
};

/**
 * Calculate comfortable income based on cost of living data and lifestyle options
 */
const calculateComfortIncome = (costData, lifestyleOptions = {}) => {
  const { costOfLivingIndex, rentIndex, groceriesIndex, restaurantPriceIndex } = costData;

  // Base monthly costs in NYC (used as reference point)
  const nycBaseCosts = {
    rent: 3500,           // 1-bedroom apartment in city center
    groceries: 600,       // Monthly groceries
    utilities: 200,       // Electricity, heating, water, garbage
    transportation: 150,  // Public transport pass
    dining: 500,          // Restaurants and takeout
    entertainment: 300,   // Movies, gym, activities
    healthcare: 250,      // Health insurance and medical expenses
    miscellaneous: 400,   // Miscellaneous expenses
    savings: 800          // Savings
  };

  // Adjust costs based on indexes
  const adjustedCosts = {
    rent: Math.round((nycBaseCosts.rent * rentIndex) / 100),
    groceries: Math.round((nycBaseCosts.groceries * groceriesIndex) / 100),
    utilities: Math.round((nycBaseCosts.utilities * costOfLivingIndex) / 100),
    transportation: Math.round((nycBaseCosts.transportation * costOfLivingIndex) / 100),
    dining: Math.round((nycBaseCosts.dining * restaurantPriceIndex) / 100),
    entertainment: Math.round((nycBaseCosts.entertainment * costOfLivingIndex) / 100),
    healthcare: Math.round((nycBaseCosts.healthcare * costOfLivingIndex) / 100),
    miscellaneous: Math.round((nycBaseCosts.miscellaneous * costOfLivingIndex) / 100),
    savings: Math.round((nycBaseCosts.savings * costOfLivingIndex) / 100)
  };

  // Calculate lifestyle adjustments
  const lifestyleAdjustments = calculateLifestyleAdjustments(lifestyleOptions, costOfLivingIndex);

  // Calculate total monthly cost including lifestyle
  const baseMonthlyCost = Object.values(adjustedCosts).reduce((sum, cost) => sum + cost, 0);
  const totalMonthlyCost = baseMonthlyCost + lifestyleAdjustments.totalAdjustment;

  // Adjust tax buffer based on savings rate
  const taxBuffer = getSavingsMultiplier(lifestyleOptions.savingsRate || 'moderate');
  const monthlyIncomeNeeded = Math.round(totalMonthlyCost * taxBuffer);
  const annualIncomeNeeded = monthlyIncomeNeeded * 12;

  // Prepare breakdown for display
  const breakdown = [
    { category: 'Housing', amount: adjustedCosts.rent, icon: '🏠' },
    { category: 'Groceries', amount: adjustedCosts.groceries, icon: '🥕' },
    { category: 'Dining Out', amount: adjustedCosts.dining, icon: '🍽️' },
    { category: 'Transportation', amount: adjustedCosts.transportation, icon: '🚗' },
    { category: 'Utilities', amount: adjustedCosts.utilities, icon: '💡' },
    { category: 'Entertainment', amount: adjustedCosts.entertainment, icon: '🎉' },
    { category: 'Healthcare', amount: adjustedCosts.healthcare, icon: '💊' },
    { category: 'Savings', amount: adjustedCosts.savings, icon: '💰' },
    { category: 'Other', amount: adjustedCosts.miscellaneous, icon: '📦' }
  ];

  // Add lifestyle adjustments to breakdown if any
  if (lifestyleAdjustments.details.length > 0) {
    lifestyleAdjustments.details.forEach(adjustment => {
      breakdown.push({
        category: adjustment.category,
        amount: adjustment.amount,
        icon: adjustment.icon,
        isLifestyle: true
      });
    });
  }

  return {
    ...costData,
    estimatedMonthlyIncome: monthlyIncomeNeeded,
    estimatedAnnualIncome: annualIncomeNeeded,
    breakdown,
    lifestyleAdjustments: lifestyleAdjustments.details,
    baseMonthlyCost,
    totalMonthlyCost,
    taxBuffer
  };
};

/**
 * Calculate lifestyle adjustments based on user preferences
 */
function calculateLifestyleAdjustments(options, colIndex) {
  const adjustments = {
    totalAdjustment: 0,
    details: []
  };

  // Pet adjustments
  if (options.dogs > 0) {
    const dogCost = Math.round((options.dogs * 100) * (colIndex / 100));
    adjustments.totalAdjustment += dogCost;
    adjustments.details.push({
      category: `Pets (${options.dogs} dog${options.dogs > 1 ? 's' : ''})`,
      amount: dogCost,
      icon: '🐕',
      description: `Monthly cost for ${options.dogs} dog${options.dogs > 1 ? 's' : ''}`
    });
  }

  if (options.cats > 0) {
    const catCost = Math.round((options.cats * 50) * (colIndex / 100));
    adjustments.totalAdjustment += catCost;
    adjustments.details.push({
      category: `Pets (${options.cats} cat${options.cats > 1 ? 's' : ''})`,
      amount: catCost,
      icon: '🐈',
      description: `Monthly cost for ${options.cats} cat${options.cats > 1 ? 's' : ''}`
    });
  }

  // Gym membership
  let gymCost = 0;
  switch (options.gymMembership) {
    case 'premium':
      gymCost = 100;
      break;
    case 'standard':
      gymCost = 50;
      break;
    case 'none':
    default:
      gymCost = 0;
  }
  if (gymCost > 0) {
    gymCost = Math.round(gymCost * (colIndex / 100));
    adjustments.totalAdjustment += gymCost;
    adjustments.details.push({
      category: 'Gym Membership',
      amount: gymCost,
      icon: '💪',
      description: `${options.gymMembership} gym membership`
    });
  }

  // Car ownership
  let carCost = 0;
  switch (options.carOwnership) {
    case 'luxury':
      carCost = 800;
      break;
    case 'standard':
      carCost = 500;
      break;
    case 'economy':
      carCost = 300;
      break;
    case 'none':
    default:
      carCost = 0;
  }
  if (carCost > 0) {
    carCost = Math.round(carCost * (colIndex / 100));
    adjustments.totalAdjustment += carCost;
    adjustments.details.push({
      category: 'Car Ownership',
      amount: carCost,
      icon: '🚗',
      description: `${options.carOwnership} car payment and insurance`
    });
  }

  // Children
  if (options.children > 0) {
    const childCost = Math.round((options.children * 1000) * (colIndex / 100));
    adjustments.totalAdjustment += childCost;
    adjustments.details.push({
      category: `Children (${options.children})`,
      amount: childCost,
      icon: '👶',
      description: `Monthly cost for ${options.children} child${options.children > 1 ? 'ren' : ''}`
    });
  }

  // Student loans
  if (options.studentLoans > 0) {
    adjustments.totalAdjustment += options.studentLoans;
    adjustments.details.push({
      category: 'Student Loans',
      amount: options.studentLoans,
      icon: '🎓',
      description: 'Monthly student loan payment'
    });
  }

  // Dining frequency
  let diningMultiplier = 1.0;
  switch (options.diningFrequency) {
    case 'frequent':
      diningMultiplier = 1.5;
      break;
    case 'moderate':
      diningMultiplier = 1.0;
      break;
    case 'rare':
      diningMultiplier = 0.5;
      break;
    default:
      diningMultiplier = 1.0;
  }
  const diningAdjustment = Math.round((diningMultiplier - 1) * 300 * (colIndex / 100));
  if (diningAdjustment !== 0) {
    adjustments.totalAdjustment += diningAdjustment;
    adjustments.details.push({
      category: 'Dining Adjustment',
      amount: diningAdjustment,
      icon: '🍽️',
      description: `${options.diningFrequency} dining out frequency`
    });
  }

  // Streaming services
  if (options.streamingServices > 0) {
    const streamingCost = Math.round((options.streamingServices * 15) * (colIndex / 100));
    adjustments.totalAdjustment += streamingCost;
    adjustments.details.push({
      category: 'Streaming Services',
      amount: streamingCost,
      icon: '📺',
      description: `${options.streamingServices} streaming service${options.streamingServices > 1 ? 's' : ''}`
    });
  }

  // Coffee habit
  let coffeeCost = 0;
  switch (options.coffeeHabit) {
    case 'daily':
      coffeeCost = 100;
      break;
    case 'occasional':
      coffeeCost = 30;
      break;
    case 'none':
    default:
      coffeeCost = 0;
  }
  if (coffeeCost > 0) {
    coffeeCost = Math.round(coffeeCost * (colIndex / 100));
    adjustments.totalAdjustment += coffeeCost;
    adjustments.details.push({
      category: 'Coffee Habit',
      amount: coffeeCost,
      icon: '☕',
      description: `${options.coffeeHabit} coffee consumption`
    });
  }

  // Travel budget
  let travelCost = 0;
  switch (options.travelBudget) {
    case 'luxury':
      travelCost = 500;
      break;
    case 'moderate':
      travelCost = 250;
      break;
    case 'budget':
      travelCost = 100;
      break;
    case 'none':
    default:
      travelCost = 0;
  }
  if (travelCost > 0) {
    travelCost = Math.round(travelCost * (colIndex / 100));
    adjustments.totalAdjustment += travelCost;
    adjustments.details.push({
      category: 'Travel Budget',
      amount: travelCost,
      icon: '✈️',
      description: `${options.travelBudget} travel budget`
    });
  }

  // Shopping
  let shoppingCost = 0;
  switch (options.shopping) {
    case 'frequent':
      shoppingCost = 400;
      break;
    case 'moderate':
      shoppingCost = 200;
      break;
    case 'minimal':
      shoppingCost = 50;
      break;
    default:
      shoppingCost = 0;
  }
  if (shoppingCost > 0) {
    shoppingCost = Math.round(shoppingCost * (colIndex / 100));
    adjustments.totalAdjustment += shoppingCost;
    adjustments.details.push({
      category: 'Shopping',
      amount: shoppingCost,
      icon: '🛍️',
      description: `${options.shopping} shopping habits`
    });
  }

  // Hobbies
  let hobbyCost = 0;
  switch (options.hobbies) {
    case 'expensive':
      hobbyCost = 300;
      break;
    case 'active':
      hobbyCost = 200;
      break;
    case 'moderate':
      hobbyCost = 100;
      break;
    default:
      hobbyCost = 0;
  }
  if (hobbyCost > 0) {
    hobbyCost = Math.round(hobbyCost * (colIndex / 100));
    adjustments.totalAdjustment += hobbyCost;
    adjustments.details.push({
      category: 'Hobbies',
      amount: hobbyCost,
      icon: '🎨',
      description: `${options.hobbies} hobby expenses`
    });
  }

  return adjustments;
}

/**
 * Get savings multiplier based on savings rate preference
 */
function getSavingsMultiplier(savingsRate) {
  // Higher savings rate requires higher income to maintain the same lifestyle
  switch (savingsRate) {
    case 'aggressive':
      return 1.5; // 50% of income goes to savings
    case 'moderate':
      return 1.3; // 30% of income goes to savings
    case 'minimal':
      return 1.15; // 15% of income goes to savings
    case 'none':
    default:
      return 1.0; // No savings
  }
}
