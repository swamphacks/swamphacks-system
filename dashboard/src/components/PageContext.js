import React from 'react';

const PageContext = React.createContext(null);

class PageC {
  constructor() {
    this.checklistItems = [
      'Any hacking gear you need (laptop, phone, hardware, chargers, batteries, etc.)',
      'Comfortable clothes',
      'Headphones/earphones/AirPods/earbuds',
      "Power strip (Don't worry - we have outlets. But you may want extra!)",
      'Toiletries (toothpaste, toothbrush, deodorant, etc.)',
      'A photo ID for registration',
      'A government ID to rent hardware',
      'Decorations for your station',
      'A pillow and blanky',
      'A sleeping bag',
      'A stuffed animal (gator preferred) for emotional support',
      'A comfortable, warm sweater',
      'Water bottle (#sustainable)',
      'Reusable utensils (#sustainable)',
      'Ambition',
      'Motivation',
      'Caffeine',
      'Yourself!'
    ];
    this.checklistState = [this.checklistItems.map(() => false)];
  }

  getChecklistState = () => {
    return this.checklistState;
  };

  getChecklistItems = () => {
    return this.checklistItems;
  };

  updateChecklistState = (val, index) => {
    let p = this.checklistState;
    p[index] = val;
    this.checklistState = p;
  };
}

const withPageContext = Component => props => (
  <PageContext.Consumer>
    {pageC => <Component {...props} pageC={pageC} />}
  </PageContext.Consumer>
);

export default PageC;

export {PageContext, withPageContext};
