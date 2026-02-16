// Central export file for all data
export { images } from './images';
export { tools } from './tools';
export { projects } from './projects';
export { certificates } from './certificates';
export { experience } from './experience';
export * from './constants';

// Helper function to get localized text
export const getLocalizedText = (textObj, language) => {
  if (typeof textObj === 'string') return textObj;
  return textObj[language] || textObj.id || textObj.en || textObj;
};

// Legacy exports for backward compatibility (will be removed in future)
export { images as default } from './images';
export { tools as listTools } from './tools';
export { projects as listProyek } from './projects';
export { certificates as listSertifikat } from './certificates';
export { experience as listPengalaman } from './experience';
