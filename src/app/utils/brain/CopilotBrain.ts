import services from '../../data/scenarios/services.json';
import commerce from '../../data/scenarios/commerce.json';
import utility from '../../data/scenarios/utility.json';
import transit from '../../data/scenarios/transit.json';
import planning from '../../data/scenarios/planning.json';
import places from '../../data/scenarios/places.json';
import events from '../../data/scenarios/events.json';
import intel from '../../data/scenarios/intel.json';
import social from '../../data/scenarios/social.json';
import health from '../../data/scenarios/health.json';
import work from '../../data/scenarios/work.json';
import outdoor from '../../data/scenarios/outdoor.json';
import family from '../../data/scenarios/family.json';
import pets from '../../data/scenarios/pets.json';
import culture from '../../data/scenarios/culture.json';
import misc from '../../data/scenarios/misc.json';

import home from '../../data/scenarios/home.json';
import education from '../../data/scenarios/education.json';
import beauty from '../../data/scenarios/beauty.json';
import wellness from '../../data/scenarios/wellness.json';
import myActivity from '../../data/scenarios/my_activity.json';

// Combine all scenarios
const allScenarios = [
  ...services,
  ...commerce,
  ...utility,
  ...transit,
  ...planning,
  ...places,
  ...events,
  ...intel,
  ...social,
  ...health,
  ...work,
  ...outdoor,
  ...family,
  ...pets,
  ...culture,
  ...misc,
  ...home,
  ...education,
  ...beauty,
  ...wellness,
  ...myActivity
];

export interface BrainResponse {
  content: string;
  mode: 'suggest' | 'propose' | 'execute';
  artifacts?: any[];
}

export class CopilotBrain {
  
  static process(input: string): BrainResponse | null {
    const lowerInput = input.toLowerCase();

    // 1. Exact/Fuzzy Keyword Matching from JSON scenarios
    let bestMatch = null;
    let bestMatchScore = 0;

    for (const scenario of allScenarios) {
      for (const keyword of scenario.keywords) {
        if (lowerInput.includes(keyword)) {
          // Prioritize longer, more specific keywords
          // e.g. "car repair" > "car"
          if (keyword.length > bestMatchScore) {
            bestMatchScore = keyword.length;
            bestMatch = scenario;
          }
        }
      }
    }

    if (bestMatch) {
      return {
        content: bestMatch.response,
        mode: (bestMatch.artifact.type === 'form-group' || bestMatch.artifact.type === 'service-menu') ? 'propose' : 'suggest',
        artifacts: [
          bestMatch.artifact,
          { type: 'selection-chips', data: { question: 'Next Step', options: bestMatch.chips } }
        ]
      };
    }

    return null; // No match found in data files
  }
}
