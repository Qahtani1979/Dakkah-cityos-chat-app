import beauty from './scenarios/beauty.json';
import commerce from './scenarios/commerce.json';
import culture from './scenarios/culture.json';
import education from './scenarios/education.json';
import events from './scenarios/events.json';
import family from './scenarios/family.json';
import health from './scenarios/health.json';
import home from './scenarios/home.json';
import intel from './scenarios/intel.json';
import misc from './scenarios/misc.json';
import my_activity from './scenarios/my_activity.json';
import outdoor from './scenarios/outdoor.json';
import pets from './scenarios/pets.json';
import places from './scenarios/places.json';
import planning from './scenarios/planning.json';
import services from './scenarios/services.json';
import social from './scenarios/social.json';
import transit from './scenarios/transit.json';
import utility from './scenarios/utility.json';
import wellness from './scenarios/wellness.json';
import work from './scenarios/work.json';

export interface RegistryItem {
  vertical: string;
  scenario: string;
  chips: string[];
  category: string;
  artifact_type?: string;
}

const formatIdToVertical = (id: string): string => {
  return id
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const mapToRegistry = (items: any[], defaultCategory: string): RegistryItem[] => {
  return items.map((item: any) => {
    let category = defaultCategory;
    
    // Granular overrides based on IDs
    if (['conferences', 'coworking', 'meeting_rooms', 'networking'].includes(item.id)) category = 'Work';
    if (['festivals', 'museums', 'theatre', 'cinema', 'bookstore', 'library', 'sports_events'].includes(item.id)) category = 'Culture';
    if (['rooftops_nightlife', 'live_music', 'speakeasy'].includes(item.id)) category = 'Nightlife';
    
    // Places overrides (places.json is mixed)
    if (defaultCategory === 'Food & Drink') {
       if (['rooftops_nightlife', 'live_music', 'speakeasy'].includes(item.id)) category = 'Nightlife';
    }

    return {
      vertical: formatIdToVertical(item.id),
      scenario: item.id,
      chips: item.chips || [],
      category,
      artifact_type: item.artifact?.type
    };
  });
};

export const MASTER_REGISTRY: RegistryItem[] = [
  ...mapToRegistry(beauty, 'Beauty'),
  ...mapToRegistry(commerce, 'Shopping'),
  ...mapToRegistry(culture, 'Culture'),
  ...mapToRegistry(education, 'Education'),
  ...mapToRegistry(events, 'Events'), // Will be overridden by mapToRegistry logic for known IDs
  ...mapToRegistry(family, 'Family'),
  ...mapToRegistry(health, 'Health'),
  ...mapToRegistry(home, 'Home'),
  ...mapToRegistry(intel, 'Intel'),
  ...mapToRegistry(misc, 'Services'),
  ...mapToRegistry(my_activity, 'My Activity'),
  ...mapToRegistry(outdoor, 'Outdoor'),
  ...mapToRegistry(pets, 'Services'),
  ...mapToRegistry(places, 'Food & Drink'), // Default to Food & Drink, overrides handle Nightlife
  ...mapToRegistry(planning, 'Planning'),
  ...mapToRegistry(services, 'Services'),
  ...mapToRegistry(social, 'Social'),
  ...mapToRegistry(transit, 'Transit'),
  ...mapToRegistry(utility, 'Utility'),
  ...mapToRegistry(wellness, 'Wellness'),
  ...mapToRegistry(work, 'Work')
].sort((a, b) => a.category.localeCompare(b.category));
